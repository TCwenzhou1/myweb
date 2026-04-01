"""
将 egg_rollsJLPT_N1N5 提取的 JSON 转换为网站 VocabEntry 格式
字段映射:
  [0] UUID, [1] word(汉字), [2] tone, [3] POS, [4] kana(假名),
  [5] meaningZh, [6] meaningZhTW, [7] note, [8] audio,
  [10] example, [11] exampleKana, [12] exampleZh
tags 中提取 JLPT 级别
"""
import json
import re
import os
import sys

def extract_level(tags):
    """从 tags 提取 JLPT 级别"""
    m = re.search(r'(\d)-([N]\d)', tags)
    if m:
        return m.group(2)
    m2 = re.search(r'[N][1-5]', tags)
    if m2:
        return m2.group(0)
    return 'N2'

def extract_sub_tag(tags):
    """提取子标签如 'N2高频', 'N3高频'"""
    m = re.search(r'(N\d[高中低]频)', tags)
    if m:
        return m.group(1)
    return ''

def tone_to_num(tone_str):
    """将 ⓪①②③④ 转为数字"""
    mapping = {'⓪': '0', '①': '1', '②': '2', '③': '3', '④': '4',
               '⑤': '5', '⑥': '6', '⑦': '7', '⑧': '8', '⑨': '9', '⑩': '10'}
    return mapping.get(tone_str, tone_str)

def convert(data_path, output_path, start_id=9000):
    with open(data_path, 'r', encoding='utf-8') as f:
        entries = json.load(f)
    
    results = []
    seen = set()
    skipped = 0
    level_counts = {}
    
    for i, entry in enumerate(entries):
        fields = entry['fields']
        
        if len(fields) < 13:
            skipped += 1
            continue
        
        word = fields[1].strip()
        kana = fields[4].strip()
        tone = fields[2].strip()
        pos = fields[3].strip()
        meaningZh = fields[5].strip()
        example = fields[10].strip() if len(fields) > 10 else ''
        example_kana = fields[11].strip() if len(fields) > 11 else ''
        example_zh = fields[12].strip() if len(fields) > 12 else ''
        level = extract_level(entry['tags'])
        sub_tag = extract_sub_tag(entry['tags'])
        
        # 基本校验
        if not word or not kana:
            skipped += 1
            continue
        
        # 去重
        key = f"{word}__{kana}"
        if key in seen:
            skipped += 1
            continue
        seen.add(key)
        
        # 频率
        if '高频' in sub_tag:
            freq = '高'
        elif '中频' in sub_tag:
            freq = '中'
        else:
            freq = '低'
        
        # detailZh
        detail_parts = []
        detail_parts.append(f"({kana})")
        if tone:
            detail_parts.append(tone)
        if pos:
            detail_parts.append(f"[{pos}]")
        if meaningZh:
            detail_parts.append(meaningZh)
        
        vocab_entry = {
            'id': f"v-{start_id + i:04d}",
            'word': word,
            'kana': kana,
            'level': level,
            'meaningZh': meaningZh or '',
            'meaningEn': '',
            'detailZh': ''.join(detail_parts),
            'source': 'egg_rolls JLPT 10k v3',
            'track': 'jlpt10k',
        }
        
        results.append(vocab_entry)
        level_counts[level] = level_counts.get(level, 0) + 1
    
    print(f"成功转换: {len(results)} 条, 跳过: {skipped} 条")
    print(f"级别分布: {json.dumps(level_counts, ensure_ascii=False)}")
    
    # 写入 TypeScript
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("// @ts-nocheck\n")
        f.write("// JLPT N1~N4 全量词库 - egg_rolls JLPT 10k v3\n")
        f.write(f"// 总计: {len(results)} 条\n")
        f.write("// 提取时间: 2026-04-01\n\n")
        f.write("import { VocabEntry } from './vocabularyBank';\n\n")
        f.write("export const jlpt10kEntries: VocabEntry[] = [\n")
        
        for entry in results:
            out = {k: entry[k] for k in ['id','word','kana','level','meaningZh','meaningEn','detailZh','source','track']}
            f.write("  " + json.dumps(out, ensure_ascii=False) + ",\n")
        
        f.write("];\n\n")
        f.write(f"export const jlpt10kStats = {{\n")
        f.write(f"  total: {len(results)},\n")
        for lvl in sorted(level_counts.keys()):
            f.write(f"  {lvl.replace('N','n').lower()}: {level_counts[lvl]},\n")
        f.write(f"}};\n")
    
    print(f"已写入: {output_path}")
    return results

if __name__ == '__main__':
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    convert(
        os.path.join(project_root, 'scripts', '_extract_jlpt_n1n5.json'),
        os.path.join(project_root, 'lib', 'jlpt10kBank.ts'),
        start_id=9000
    )
