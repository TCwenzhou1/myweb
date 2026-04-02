#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JMDict + JLPT 全词库同步工具
=============================
从多个数据源获取日语词汇，转换为 VocabEntry 格式的 TypeScript。

支持的数据源：
  1. jmdict-simplified JSON (英文释义 + 完整词条)
  2. JLPT API (N1~N5 分级)
  3. Anki .apkg (已有 extract_apkg.py)
  4. CSV/TSV (自定义格式)

输出：
  - lib/jmdictBank.ts (VocabEntry[])

使用方法：
  python scripts/sync_jmdict.py                # 完整同步
  python scripts/sync_jmdict.py --source jlpt   # 只同步 JLPT API
  python scripts/sync_jmdict.py --source jmdict # 只同步 jmdict-simplified
  python scripts/sync_jmdict.py --validate      # 只验证现有词库
"""

import argparse
import io
import json
import os
import sys
import time
import urllib.request
import csv
import re
import ssl
from pathlib import Path
from typing import Optional

# Fix Windows console encoding
if sys.platform == "win32":
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

# ============ 配置 ============

PROJECT_ROOT = Path(__file__).resolve().parent.parent
CACHE_DIR = PROJECT_ROOT / "scripts" / "_jmdict_cache"
DATA_DIR = CACHE_DIR / "data"
OUTPUT_FILE = PROJECT_ROOT / "lib" / "jmdictBank.ts"

os.makedirs(DATA_DIR, exist_ok=True)

# JLPT 等级 → 中文名称映射
JLPT_LEVELS = {1: "N1", 2: "N2", 3: "N3", 4: "N4", 5: "N5"}

# VocabEntry 类型定义 (TypeScript)
VOCAB_TYPE = """export type VocabLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1' | '考研';

export interface VocabEntry {
  id: string;
  word: string;
  kana: string;
  level: VocabLevel;
  meaningZh: string;
  meaningEn: string;
  detailZh: string;
  source: string;
  track: string;
}"""

# ============ 工具函数 ============

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE


def fetch_url(url: str, timeout: int = 60) -> bytes:
    """下载 URL 内容，带缓存。"""
    cache_key = re.sub(r'[^a-zA-Z0-9]', '_', url)[:100]
    cache_file = DATA_DIR / f"cache_{cache_key}"
    
    if cache_file.exists() and cache_file.stat().st_size > 100:
        print(f"  [缓存] {cache_file.name}")
        return cache_file.read_bytes()
    
    print(f"  [下载] {url[:80]}...")
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    })
    with urllib.request.urlopen(req, context=ssl_ctx, timeout=timeout) as r:
        data = r.read()
    
    cache_file.write_bytes(data)
    print(f"  [完成] {len(data)//1024}KB")
    return data


def clean_text(text: str) -> str:
    """清理文本：去除多余空白和特殊字符。"""
    text = text.strip()
    text = re.sub(r'\s+', ' ', text)
    text = text.replace('\n', ' ').replace('\r', '')
    return text


# ============ 数据源 1: JLPT Vocabulary API ============

def fetch_jlpt_from_api() -> list[dict]:
    """
    从 jlpt-vocab-api.vercel.app 获取 N1~N5 全量词汇。
    包含：word, furigana, meaning(英文), level(N1~N5)
    """
    all_entries = []
    
    for level_num, level_name in JLPT_LEVELS.items():
        cache_file = DATA_DIR / f"jlpt_api_{level_name}.json"
        
        if cache_file.exists() and cache_file.stat().st_size > 100:
            print(f"  [缓存] JLPT {level_name}")
            with open(cache_file, "r", encoding="utf-8") as f:
                entries = json.load(f)
        else:
            # 分页获取
            entries = []
            offset = 0
            limit = 500
            while True:
                url = f"https://jlpt-vocab-api.vercel.app/api/words/all?level={level_num}&offset={offset}&limit={limit}"
                print(f"  [获取] JLPT {level_name} offset={offset}...")
                time.sleep(0.3)  # 礼貌性延迟
                
                try:
                    data = fetch_url(url)
                    batch = json.loads(data)
                except Exception as e:
                    print(f"  [错误] {e}")
                    break
                
                if not batch:
                    break
                entries.extend(batch)
                offset += limit
                
                if len(batch) < limit:
                    break
            
            with open(cache_file, "w", encoding="utf-8") as f:
                json.dump(entries, f, ensure_ascii=False, indent=2)
        
        print(f"  JLPT {level_name}: {len(entries)} 词")
        all_entries.extend(entries)
        time.sleep(0.5)
    
    return all_entries


def parse_jlpt_api_entries(raw: list[dict]) -> list[dict]:
    """将 JLPT API 数据转换为标准格式。"""
    entries = []
    seen = set()
    
    for item in raw:
        word = clean_text(item.get("word", ""))
        kana = clean_text(item.get("furigana", ""))
        meaning_en = clean_text(item.get("meaning", ""))
        level_num = item.get("level", 0)
        level = JLPT_LEVELS.get(level_num, "N2")
        
        if not word or not kana:
            continue
        
        # 去重
        key = f"{word}|{kana}"
        if key in seen:
            continue
        seen.add(key)
        
        entries.append({
            "word": word,
            "kana": kana,
            "level": level,
            "meaningEn": meaning_en,
            "meaningZh": "",  # 需要后续补充中文
            "source": "jlpt-vocab-api",
        })
    
    return entries


# ============ 数据源 2: jmdict-simplified JSON ============

def fetch_jmdict_simplified() -> list[dict]:
    """
    从 jmdict-simplified 获取完整词条（英文释义）。
    这是最大的日语词典数据源，约 18 万词条。
    """
    cache_file = DATA_DIR / "jmdict_eng.json"
    
    if cache_file.exists() and cache_file.stat().st_size > 1000:
        print(f"  [缓存] jmdict-simplified ({cache_file.stat().st_size//1024//1024}MB)")
        with open(cache_file, "r", encoding="utf-8") as f:
            return json.load(f)
    
    # 尝试从 GitHub releases 下载
    print("  [下载] jmdict-simplified (114MB, 可能需要几分钟)...")
    url = "https://github.com/scriptin/jmdict-simplified/releases/latest/download/jmdict-eng-3.6.2.json"
    
    try:
        data = fetch_url(url, timeout=300)
        entries = json.loads(data)
        with open(cache_file, "w", encoding="utf-8") as f:
            json.dump(entries, f, ensure_ascii=False)
        print(f"  [完成] {len(entries)} 词条")
        return entries
    except Exception as e:
        print(f"  [错误] 下载失败: {e}")
        print(f"  提示: 请手动下载 jmdict-simplified JSON 放到: {cache_file}")
        print(f"  下载地址: https://github.com/scriptin/jmdict-simplified/releases/latest")
        return []


def parse_jmdict_entries(raw: list[dict]) -> list[dict]:
    """将 jmdict-simplified 数据转换为标准格式。"""
    entries = []
    
    for item in raw:
        # 提取汉字
        kanji_list = item.get("kanji", [])
        kanji = kanji_list[0].get("text", "") if kanji_list else ""
        
        # 提取假名
        kana_list = item.get("kana", [])
        kana = kana_list[0].get("text", "") if kana_list else ""
        
        if not kanji and not kana:
            continue
        if not kana:
            kana = kanji
        if not kanji:
            kanji = kana
        
        # 提取英文释义
        senses = item.get("senses", [])
        meanings_en = []
        for sense in senses:
            for gloss in sense.get("glosses", []):
                if isinstance(gloss, str):
                    meanings_en.append(gloss)
                elif isinstance(gloss, dict) and gloss.get("lang") in ("eng", None):
                    meanings_en.append(gloss.get("text", ""))
        
        meaning_en = "; ".join(meanings_en[:3]) if meanings_en else ""
        
        # 提取词性
        pos_list = []
        for sense in senses:
            for pos in sense.get("pos", []):
                if pos not in pos_list:
                    pos_list.append(pos)
        
        entries.append({
            "word": kanji,
            "kana": kana,
            "level": "",  # JMdict 本身不含 JLPT 分级
            "meaningEn": meaning_en,
            "meaningZh": "",
            "pos": ", ".join(pos_list[:3]),
            "source": "jmdict-simplified",
            "entity_id": item.get("id", ""),
        })
    
    return entries


# ============ 数据源 3: jastudy.net 爬取 (中文释义) ============

def fetch_jastudy_chinese() -> list[dict]:
    """
    从 jastudy.net 爬取中文释义。
    17506 个词条，N1~N5 全覆盖。
    """
    cache_file = DATA_DIR / "jastudy_chinese.json"
    
    if cache_file.exists() and cache_file.stat().st_size > 1000:
        print(f"  [缓存] jastudy 中文 ({cache_file.stat().st_size//1024}KB)")
        with open(cache_file, "r", encoding="utf-8") as f:
            return json.load(f)
    
    print("  [爬取] jastudy.net 中文释义...")
    print("  注意: 首次运行需要爬取 17506 个词条，可能需要 30-60 分钟")
    print("  提示: 如果超时，可以手动下载放到:", cache_file)
    
    all_entries = []
    
    for level_name in ["N5", "N4", "N3", "N2", "N1"]:
        level_file = DATA_DIR / f"jastudy_{level_name}.json"
        
        if level_file.exists() and level_file.stat().st_size > 100:
            with open(level_file, "r", encoding="utf-8") as f:
                entries = json.load(f)
            all_entries.extend(entries)
            continue
        
        entries = []
        offset = 0
        limit = 100
        
        while True:
            # jastudy.net 使用 POST 请求获取数据
            # 格式: POST /ja_word_data.php with form data
            url = f"https://jastudy.net/ja_word_data.php"
            form_data = f"level={level_name}&offset={offset}&limit={limit}&search=".encode("utf-8")
            
            req = urllib.request.Request(url, data=form_data, headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Content-Type": "application/x-www-form-urlencoded",
                "Referer": "https://jastudy.net/ja_word.html",
            })
            
            try:
                with urllib.request.urlopen(req, context=ssl_ctx, timeout=30) as r:
                    data = json.loads(r.read().decode("utf-8"))
            except Exception as e:
                print(f"  [错误] {level_name} offset={offset}: {e}")
                break
            
            if not data or not isinstance(data, list):
                break
            
            entries.extend(data)
            offset += limit
            
            if len(data) < limit:
                break
            
            time.sleep(0.5)  # 礼貌性延迟
            if offset % 500 == 0:
                print(f"    {level_name}: {offset}...")
        
        print(f"  {level_name}: {len(entries)} 词")
        with open(level_file, "w", encoding="utf-8") as f:
            json.dump(entries, f, ensure_ascii=False, indent=2)
        all_entries.extend(entries)
        
        time.sleep(1)
    
    with open(cache_file, "w", encoding="utf-8") as f:
        json.dump(all_entries, f, ensure_ascii=False, indent=2)
    
    print(f"  [完成] jastudy 中文: {len(all_entries)} 词")
    return all_entries


def parse_jastudy_entries(raw: list[dict]) -> dict[str, str]:
    """将 jastudy 数据转换为 word→meaning_zh 映射。"""
    mapping = {}
    for item in raw:
        word = str(item.get("word", item.get("单词", "")))
        kana = str(item.get("kana", item.get("読み", "")))
        meaning = str(item.get("meaning", item.get("意味", item.get("中文", ""))))
        level = str(item.get("level", item.get("级别", "")))
        
        if not word:
            continue
        
        key = f"{word}|{kana}" if kana else word
        mapping[key] = meaning
        
        # 也用纯 word 做 key
        if word not in mapping:
            mapping[word] = meaning
    
    return mapping


# ============ 数据源 4: CSV/TSV 导入 ============

def import_from_csv(filepath: str, delimiter: str = ",") -> list[dict]:
    """从 CSV/TSV 文件导入词汇数据。"""
    entries = []
    
    with open(filepath, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f, delimiter=delimiter)
        
        for row in reader:
            word = row.get("word", row.get("单词", row.get("kanji", "")))
            kana = row.get("kana", row.get("読み", row.get("reading", "")))
            meaning_zh = row.get("meaning_zh", row.get("中文", row.get("meaning", "")))
            meaning_en = row.get("meaning_en", row.get("english", ""))
            level = row.get("level", row.get("级别", ""))
            
            if not word:
                continue
            
            entries.append({
                "word": clean_text(word),
                "kana": clean_text(kana),
                "level": clean_text(level),
                "meaningEn": clean_text(meaning_en),
                "meaningZh": clean_text(meaning_zh),
                "source": f"csv:{os.path.basename(filepath)}",
            })
    
    return entries


# ============ 合并与去重 ============

def merge_entries(
    jlpt_entries: list[dict],
    jmdict_entries: Optional[list[dict]] = None,
    chinese_mapping: Optional[dict[str, str]] = None,
) -> list[dict]:
    """
    合并多个数据源，去重并补全中文释义。
    优先级: jlpt API > jmdict (补充中文)
    """
    # 构建中文映射
    zh_map = chinese_mapping or {}
    
    # 第一步: 以 JLPT 词条为基础
    merged = {}
    for entry in jlpt_entries:
        word = entry["word"]
        kana = entry["kana"]
        key = f"{word}|{kana}"
        
        # 尝试匹配中文释义
        meaning_zh = entry.get("meaningZh", "")
        if not meaning_zh:
            meaning_zh = zh_map.get(key, "") or zh_map.get(word, "")
        
        merged[key] = {
            "word": word,
            "kana": kana,
            "level": entry.get("level", ""),
            "meaningEn": entry.get("meaningEn", ""),
            "meaningZh": meaning_zh,
            "source": entry.get("source", ""),
        }
    
    # 第二步: 用 JMdict 补充 (仅添加 JLPT 中没有的词条)
    if jmdict_entries:
        for entry in jmdict_entries:
            word = entry["word"]
            kana = entry["kana"]
            key = f"{word}|{kana}"
            
            if key in merged:
                # 补充英文释义
                if not merged[key]["meaningEn"] and entry.get("meaningEn"):
                    merged[key]["meaningEn"] = entry["meaningEn"]
                continue
            
            meaning_zh = zh_map.get(key, "") or zh_map.get(word, "")
            
            merged[key] = {
                "word": word,
                "kana": kana,
                "level": entry.get("level", ""),
                "meaningEn": entry.get("meaningEn", ""),
                "meaningZh": meaning_zh,
                "source": entry.get("source", ""),
            }
    
    return list(merged.values())


# ============ 生成 TypeScript ============

def generate_typescript(entries: list[dict], output_path: Path):
    """将合并后的词条生成为 TypeScript 文件。"""
    lines = []
    lines.append("// @ts-nocheck")
    lines.append(f"// JMDict + JLPT 全量词库")
    lines.append(f"// 总计: {len(entries)} 条")
    lines.append(f"// 数据源: jlpt-vocab-api + jmdict-simplified + jastudy")
    lines.append(f"// 生成时间: {time.strftime('%Y-%m-%d %H:%M')}")
    lines.append(f"// 更新命令: python scripts/sync_jmdict.py")
    lines.append("")
    
    # 导入类型 (从 vocabularyBank 导入，不重复定义)
    lines.append("import { VocabEntry } from './vocabularyBank';")
    lines.append("")
    
    # 导出
    lines.append("export const jmdictEntries: VocabEntry[] = [")
    
    for i, entry in enumerate(entries):
        word = entry["word"]
        kana = entry["kana"]
        level = entry.get("level", "N2")
        meaning_zh = entry.get("meaningZh", "")
        meaning_en = entry.get("meaningEn", "")
        source = entry.get("source", "jmdict")
        
        # 规范化 level
        if not level or level not in ("N1", "N2", "N3", "N4", "N5", "考研"):
            level = "N2"  # 默认
        
        # 生成 detailZh
        if meaning_zh and meaning_en:
            detail = f"({kana}) {meaning_zh} | {meaning_en}"
        elif meaning_zh:
            detail = f"({kana}) {meaning_zh}"
        elif meaning_en:
            detail = f"({kana}) {meaning_en}"
        else:
            detail = f"({kana})"
        
        # 确定 track
        track = "jmdict"
        if "jlpt" in source.lower():
            track = "jlpt-api"
        elif "jastudy" in source.lower():
            track = "jmdict"
        
        # 生成唯一 ID
        entry_id = f"jm-{i:05d}"
        
        # 转义特殊字符
        word = word.replace('"', '\\"').replace("'", "\\'")
        kana = kana.replace('"', '\\"').replace("'", "\\'")
        meaning_zh = meaning_zh.replace('"', '\\"').replace("'", "\\'")
        meaning_en = meaning_en.replace('"', '\\"').replace("'", "\\'")
        detail = detail.replace('"', '\\"').replace("'", "\\'")
        source = source.replace('"', '\\"')
        
        lines.append(f'  {{"id": "{entry_id}", "word": "{word}", "kana": "{kana}", "level": "{level}", "meaningZh": "{meaning_zh}", "meaningEn": "{meaning_en}", "detailZh": "{detail}", "source": "{source}", "track": "{track}"}},')
    
    lines.append("];")
    lines.append("")
    
    # 统计信息
    level_counts = {}
    for entry in entries:
        lv = entry.get("level", "unknown")
        level_counts[lv] = level_counts.get(lv, 0) + 1
    
    lines.append("// 按级别统计:")
    lines.append("export const jmdictStats = {")
    for lv in ["N5", "N4", "N3", "N2", "N1", "other"]:
        count = level_counts.get(lv, 0)
        if count > 0:
            lines.append(f'  {lv.lower() if lv != "other" else "unknown"}: {count},')
    lines.append("};")
    lines.append("")
    
    content = "\n".join(lines)
    output_path.write_text(content, encoding="utf-8")
    print(f"\n[输出] {output_path} ({len(entries)} 条, {output_path.stat().st_size//1024}KB)")


# ============ 主流程 ============

def main():
    parser = argparse.ArgumentParser(description="JMDict + JLPT 全词库同步工具")
    parser.add_argument("--source", choices=["all", "jlpt", "jmdict", "chinese", "csv"], 
                        default="all", help="数据源选择")
    parser.add_argument("--csv", type=str, help="CSV 文件路径")
    parser.add_argument("--validate", action="store_true", help="只验证现有词库")
    parser.add_argument("--output", type=str, help="输出文件路径")
    args = parser.parse_args()
    
    output_path = Path(args.output) if args.output else OUTPUT_FILE
    
    if args.validate:
        validate_existing(output_path)
        return
    
    print("=" * 60)
    print("JMDict + JLPT 全词库同步工具")
    print("=" * 60)
    
    jlpt_entries = []
    jmdict_entries = []
    chinese_map = {}
    
    # 获取 JLPT 分级词汇
    if args.source in ("all", "jlpt"):
        print("\n[1/3] 获取 JLPT N1~N5 词汇...")
        raw = fetch_jlpt_from_api()
        jlpt_entries = parse_jlpt_api_entries(raw)
        print(f"  → {len(jlpt_entries)} 条 JLPT 词汇")
    
    # 获取 JMdict 完整词条 (可选，数据量很大)
    if args.source in ("all", "jmdict"):
        print("\n[2/3] 获取 jmdict-simplified 完整词条...")
        raw = fetch_jmdict_simplified()
        if raw:
            jmdict_entries = parse_jmdict_entries(raw)
            print(f"  → {len(jmdict_entries)} 条 JMdict 词条")
    
    # 获取中文释义映射
    if args.source in ("all", "chinese"):
        print("\n[3/3] 获取中文释义...")
        raw = fetch_jastudy_chinese()
        if raw:
            chinese_map = parse_jastudy_entries(raw)
            print(f"  → {len(chinese_map)} 条中文映射")
    
    # CSV 导入
    if args.source == "csv":
        if not args.csv:
            print("错误: 请指定 CSV 文件路径 --csv <path>")
            sys.exit(1)
        print(f"\n[CSV] 导入: {args.csv}")
        jlpt_entries = import_from_csv(args.csv)
        print(f"  → {len(jlpt_entries)} 条")
    
    # 合并
    print("\n[合并] 去重并整合数据...")
    merged = merge_entries(jlpt_entries, jmdict_entries, chinese_map)
    print(f"  → {len(merged)} 条 (去重后)")
    
    # 统计
    level_counts = {}
    for entry in merged:
        lv = entry.get("level", "unknown")
        level_counts[lv] = level_counts.get(lv, 0) + 1
    
    print("\n[统计] 按级别分布:")
    for lv in ["N5", "N4", "N3", "N2", "N1"]:
        if lv in level_counts:
            print(f"  {lv}: {level_counts[lv]}")
    
    # 有中文的比例
    zh_count = sum(1 for e in merged if e.get("meaningZh"))
    print(f"  中文释义: {zh_count}/{len(merged)} ({zh_count*100//max(len(merged),1)}%)")
    
    en_count = sum(1 for e in merged if e.get("meaningEn"))
    print(f"  英文释义: {en_count}/{len(merged)} ({en_count*100//max(len(merged),1)}%)")
    
    # 生成 TypeScript
    print(f"\n[生成] TypeScript 文件...")
    generate_typescript(merged, output_path)
    
    print("\n✅ 同步完成!")
    print(f"   输出文件: {output_path}")
    print(f"   下次更新: python scripts/sync_jmdict.py")


def validate_existing(output_path: Path):
    """验证现有词库文件。"""
    if not output_path.exists():
        print(f"❌ 词库文件不存在: {output_path}")
        return
    
    # 统计现有所有词库
    banks = [
        ("vocabularyBank.ts", PROJECT_ROOT / "lib" / "vocabularyBank.ts"),
        ("jlpt10kBank.ts", PROJECT_ROOT / "lib" / "jlpt10kBank.ts"),
        ("kaoyan3500Bank.ts", PROJECT_ROOT / "lib" / "kaoyan3500Bank.ts"),
    ]
    
    if output_path.exists():
        banks.append(("jmdictBank.ts", output_path))
    
    total = 0
    for name, path in banks:
        if path.exists():
            content = path.read_text(encoding="utf-8")
            count = content.count('"id":')
            size = path.stat().st_size // 1024
            print(f"  {name}: {count} 条 ({size}KB)")
            total += count
    
    print(f"\n  总计: {total} 条")


if __name__ == "__main__":
    main()
