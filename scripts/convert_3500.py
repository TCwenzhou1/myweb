"""
将提取的 3500 考研词 JSON 转换为网站 VocabEntry 格式的 TypeScript
"""
import json
import re
import os

def parse_word(sfld):
    """从 sfld 解析出 kana 和 word(汉字)
    格式: あい【愛】 or あいさつ【挨拶】 or われる【割れる】
    """
    m = re.match(r'^(.+?)【(.+?)】$', sfld)
    if m:
        return m.group(2), m.group(1)  # word, kana
    # 可能没有汉字，纯假名
    return sfld, sfld

def parse_detail(field_text):
    """从 fields[1] 提取结构化信息
    格式: ①［名·自动3］爱情；友爱...例 開会の挨拶をする。/致开幕词。题 ...
    """
    result = {
        'pos': '',       # 词性
        'tone': '',      # 音调
        'meaningZh': '', # 中文释义
        'example': '',   # 例句
        'exampleMeaning': '',
        'exam': '',      # 历年真题
        'examMeaning': '',
    }
    
    # 提取音调（①②③④⑤）
    tone_match = re.search(r'([①②③④⑤⑥⑦⑧⑨⑩])', field_text)
    if tone_match:
        result['tone'] = tone_match.group(1)
    
    # 提取词性
    pos_match = re.search(r'［(.+?)］', field_text)
    if pos_match:
        result['pos'] = pos_match.group(1)
    
    # 提取例句 (例 ... 。/...翻译)
    ex_match = re.search(r'例\s+(.+?)。/([^题]*?)(?=题|近|$)', field_text)
    if ex_match:
        result['example'] = ex_match.group(1).strip() + '。'
        result['exampleMeaning'] = ex_match.group(2).strip()
    
    # 提取历年真题 (题 ... 。/...翻译)
    exam_match = re.search(r'题\s+(.+?)(?:\（\d+年|$)', field_text)
    if exam_match:
        exam_text = exam_match.group(1).strip()
        # 提取日文和中文翻译
        exam_parts = exam_text.rsplit('/', 1)
        if len(exam_parts) == 2:
            result['exam'] = exam_parts[0].strip()
            result['examMeaning'] = exam_parts[1].strip()
        else:
            result['exam'] = exam_text
    
    # 提取中文释义 - 在词性标记之后、例句之前
    meaning_match = re.search(r'］([^例]*?)(?=例|$)', field_text)
    if meaning_match:
        result['meaningZh'] = meaning_match.group(1).strip()
    
    return result, ''

def star_to_frequency(stars):
    """将星级转为频率"""
    if not stars:
        return '低'
    count = stars.count('★')
    if count >= 4:
        return '高'
    elif count >= 2:
        return '中'
    return '低'

def convert(data_path, output_path, start_id=5000):
    """主转换函数"""
    with open(data_path, 'r', encoding='utf-8') as f:
        entries = json.load(f)
    
    results = []
    seen_words = set()  # 去重
    skipped = 0
    
    for i, entry in enumerate(entries):
        sfld = entry['sfld']
        fields = entry['fields']
        
        if len(fields) < 2:
            skipped += 1
            continue
        
        word, kana = parse_word(sfld)
        
        # 去重
        if word in seen_words:
            skipped += 1
            continue
        seen_words.add(word)
        
        detail, _ = parse_detail(fields[1])
        
        # 星级在 fields[2]
        stars = fields[2] if len(fields) > 2 else ''
        freq = star_to_frequency(stars)
        
        # 组装 detailZh
        detail_parts = []
        if detail['tone']:
            detail_parts.append(detail['tone'])
        if detail['pos']:
            detail_parts.append(f"[{detail['pos']}]")
        if detail['meaningZh']:
            detail_parts.append(detail['meaningZh'])
        
        vocab_entry = {
            'id': f"v-{start_id + i:04d}",
            'word': word,
            'kana': kana,
            'level': '考研',
            'meaningZh': detail['meaningZh'] or fields[1][:50].replace('\n', ' '),
            'meaningEn': '',  # 这个词库没有英文
            'detailZh': f"（{kana}）{detail['tone']}{'[' + detail['pos'] + ']' if detail['pos'] else ''}{detail['meaningZh']}",
            'source': '考研日语3500词 Anki Deck',
            'track': 'kaoyan3500',
            # 额外字段（如果扩展接口的话）
            '_pos': detail['pos'],
            '_tone': detail['tone'],
            '_frequency': freq,
            '_stars': stars,
            '_example': detail['example'],
            '_exampleMeaning': detail['exampleMeaning'],
            '_exam': detail['exam'],
            '_examMeaning': detail['examMeaning'],
        }
        
        results.append(vocab_entry)
    
    print(f"成功转换: {len(results)} 条, 跳过: {skipped} 条")
    
    # 统计
    high_freq = sum(1 for r in results if r['_frequency'] == '高')
    mid_freq = sum(1 for r in results if r['_frequency'] == '中')
    low_freq = sum(1 for r in results if r['_frequency'] == '低')
    has_example = sum(1 for r in results if r['_example'])
    has_exam = sum(1 for r in results if r['_exam'])
    
    print(f"  高频: {high_freq}, 中频: {mid_freq}, 低频: {low_freq}")
    print(f"  有例句: {has_example}, 有真题: {has_exam}")
    
    # 写入 TypeScript
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("// @ts-nocheck\n")
        f.write("// 考研日语3500词 - 从 Anki apkg 提取转换\n")
        f.write("// 数据来源: 考研日语3500词 Anki Deck\n")
        f.write(f"// 总计: {len(results)} 条\n")
        f.write("// 提取时间: 2026-04-01\n\n")
        f.write("import { VocabEntry } from './vocabularyBank';\n\n")
        f.write("export const kaoyan3500Entries: VocabEntry[] = [\n")
        
        for entry in results:
            # 清理字段用于输出
            out_entry = {
                'id': entry['id'],
                'word': entry['word'],
                'kana': entry['kana'],
                'level': entry['level'],
                'meaningZh': entry['meaningZh'],
                'meaningEn': entry['meaningEn'],
                'detailZh': entry['detailZh'],
                'source': entry['source'],
                'track': entry['track'],
            }
            f.write("  " + json.dumps(out_entry, ensure_ascii=False) + ",\n")
        
        f.write("];\n\n")
        f.write(f"export const kaoyan3500Stats = {{\n")
        f.write(f"  total: {len(results)},\n")
        f.write(f"  highFreq: {high_freq},\n")
        f.write(f"  midFreq: {mid_freq},\n")
        f.write(f"  lowFreq: {low_freq},\n")
        f.write(f"  hasExample: {has_example},\n")
        f.write(f"  hasExam: {has_exam},\n")
        f.write(f"}};\n")
    
    print(f"已写入: {output_path}")
    return results


if __name__ == '__main__':
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    
    convert(
        os.path.join(project_root, 'scripts', '_extract_3500.json'),
        os.path.join(project_root, 'lib', 'kaoyan3500Bank.ts'),
        start_id=5000
    )
