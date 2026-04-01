"""
APKG Extractor - 从 Anki .apkg 文件提取词汇数据
输出为 JSON，供后续转换脚本使用
"""
import zipfile
import sqlite3
import json
import os
import re
import html

def extract_apkg(apkg_path, output_json):
    """解压 apkg 并读取 SQLite 数据库"""
    # 创建临时目录
    tmp_dir = apkg_path.replace('.apkg', '_tmp')
    os.makedirs(tmp_dir, exist_ok=True)
    
    # 解压
    with zipfile.ZipFile(apkg_path, 'r') as z:
        z.extractall(tmp_dir)
    
    # 找到 SQLite 数据库（优先 .anki21，然后 .anki2）
    db_path = None
    for suffix in ['.anki21', '.anki2', '.anki21b']:
        for f in os.listdir(tmp_dir):
            if f.endswith(suffix):
                db_path = os.path.join(tmp_dir, f)
                break
        if db_path:
            break
    
    if not db_path:
        print(f"ERROR: 未找到 anki 数据库文件 in {apkg_path}")
        return None
    
    # 读取数据
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    
    # 获取所有表
    cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = [row['name'] for row in cur.fetchall()]
    print(f"  表: {tables}")
    
    # 读取 notes 表结构
    cur.execute(f"PRAGMA table_info(notes)")
    note_cols = cur.fetchall()
    print(f"  notes 列: {[col['name'] for col in note_cols]}")
    
    # 读取 cards 表结构
    cur.execute(f"PRAGMA table_info(cards)")
    card_cols = cur.fetchall()
    print(f"  cards 列: {[col['name'] for col in card_cols]}")
    
    # 读取 notes 数据
    cur.execute("SELECT * FROM notes")
    notes = cur.fetchall()
    print(f"  总笔记数: {len(notes)}")
    
    # 读取 cards 数据
    cur.execute("SELECT * FROM cards")
    cards = cur.fetchall()
    print(f"  总卡片数: {len(cards)}")
    
    # 读取 decks
    try:
        cur.execute("SELECT * FROM decks")
        decks = cur.fetchall()
        print(f"  牌组数: {len(decks)}")
        for d in decks[:10]:
            deck_name = d['name'] if 'name' in d.keys() else str(dict(d))[:100]
            print(f"    - {deck_name}")
    except Exception as e:
        print(f"  读取 decks 失败: {e}")
    
    # 提取词汇数据
    words = []
    for note in notes:
        note_dict = dict(note)
        sfld = note_dict.get('sfld', '')  # sort field
        flds = note_dict.get('flds', '')  # all fields separated by \x1f
        tags = note_dict.get('tags', '')
        
        # 分割字段
        fields = flds.split('\x1f')
        
        # 清理 HTML 标签
        def clean_html(text):
            text = html.unescape(text)
            text = re.sub(r'<[^>]+>', '', text)
            text = text.replace('&nbsp;', ' ').strip()
            return text
        
        cleaned_fields = [clean_html(f) for f in fields]
        
        entry = {
            'sfld': sfld,
            'fields': cleaned_fields,
            'raw_fields': fields[:3],  # 保留前3个原始字段用于调试
            'tags': tags,
            'note_id': note_dict.get('id', '')
        }
        words.append(entry)
    
    conn.close()
    
    # 保存结果
    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(words, f, ensure_ascii=False, indent=2)
    
    print(f"  已保存 {len(words)} 条到 {output_json}")
    
    # 清理临时文件
    import shutil
    shutil.rmtree(tmp_dir)
    
    return words


if __name__ == '__main__':
    # 项目根目录 (scripts 的上级)
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    output_dir = os.path.join(project_root, 'scripts')
    
    print(f"项目根目录: {project_root}")
    
    print("=" * 60)
    print("提取 3500.apkg ...")
    print("=" * 60)
    extract_apkg(
        os.path.join(project_root, '3500.apkg'),
        os.path.join(output_dir, '_extract_3500.json')
    )
    
    print()
    print("=" * 60)
    print("提取 egg_rollsJLPT_N1N5__v3NO_ENGLISH.apkg ...")
    print("=" * 60)
    extract_apkg(
        os.path.join(project_root, 'egg_rollsJLPT_N1N5__v3NO_ENGLISH.apkg'),
        os.path.join(output_dir, '_extract_jlpt_n1n5.json')
    )
    
    print()
    print("DONE!")
