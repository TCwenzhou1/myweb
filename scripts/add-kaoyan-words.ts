/**
 * 将 japaneseData.ts 中的考研词汇转换为 vocabularyBank.ts 格式
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// 读取 japaneseData.ts
const japaneseDataPath = resolve(__dirname, '../lib/japaneseData.ts');
const japaneseDataContent = readFileSync(japaneseDataPath, 'utf-8');

// 提取 VOCABULARY_考研 数组
const match = japaneseDataContent.match(/export const VOCABULARY_考研: Omit<VocabularyItem, 'id'>\[\] = \[([\s\S]+?)\];/);
if (!match) {
  console.error('未找到 VOCABULARY_考研 数组');
  process.exit(1);
}

const arrayContent = match[1];

// 解析每一行
const lines = arrayContent.split('\n');
const vocabEntries: string[] = [];
let idCounter = 3364; // 从现有最大ID +1 开始

for (const line of lines) {
  const trimmed = line.trim();
  
  // 跳过空行和注释
  if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) {
    continue;
  }
  
  // 匹配单个词汇对象
  const objMatch = trimmed.match(/\{([^}]+)\}/);
  if (!objMatch) {
    continue;
  }
  
  const objContent = objMatch[1];
  
  // 提取字段
  const wordMatch = objContent.match(/word:\s*'([^']+)'/);
  const readingMatch = objContent.match(/reading:\s*'([^']+)'/);
  const meaningMatch = objContent.match(/meaning:\s*'([^']+)'/);
  const posMatch = objContent.match(/partOfSpeech:\s*'([^']+)'/);
  const romajiMatch = objContent.match(/romaji:\s*'([^']+)'/);
  const usageMatch = objContent.match(/usage:\s*'([^']+)'/);
  const examTipMatch = objContent.match(/examTip:\s*'([^']+)'/);
  const exampleMatch = objContent.match(/example:\s*'([^']+)'/);
  const exampleMeaningMatch = objContent.match(/exampleMeaning:\s*'([^']+)'/);
  
  if (!wordMatch || !readingMatch || !meaningMatch || !posMatch) {
    continue;
  }
  
  const word = wordMatch[1];
  const kana = readingMatch[1];
  const meaningZh = meaningMatch[1];
  const partOfSpeech = posMatch[1];
  const romaji = romajiMatch ? romajiMatch[1] : '';
  const usage = usageMatch ? usageMatch[1] : '';
  const examTip = examTipMatch ? examTipMatch[1] : '';
  const example = exampleMatch ? exampleMatch[1] : '';
  const exampleMeaning = exampleMeaningMatch ? exampleMeaningMatch[1] : '';
  
  // 构建 detailZh
  let detailZh = `（${kana}）`;
  if (romaji) {
    detailZh += ` ${romaji}`;
  }
  detailZh += `【${partOfSpeech}】${meaningZh}`;
  if (usage) {
    detailZh += `。${usage}`;
  }
  if (examTip) {
    detailZh += `。${examTip}`;
  }
  if (example) {
    detailZh += `。例：${example}`;
  }
  if (exampleMeaning) {
    detailZh += `（${exampleMeaning}）`;
  }
  
  // 生成 vocabularyBank.ts 格式的对象
  const id = `v-${String(idCounter).padStart(4, '0')}`;
  idCounter++;
  
  const entry = `  {
    "id": "${id}",
    "word": "${word}",
    "kana": "${kana}",
    "level": "考研",
    "meaningZh": "${meaningZh}",
    "meaningEn": "",
    "detailZh": "${detailZh.replace(/"/g, '\\"')}",
    "source": "japanese-data-考研词汇",
    "track": "kaoyan"
  }`;
  
  vocabEntries.push(entry);
}

console.log(`成功转换 ${vocabEntries.length} 条考研词汇`);

// 输出结果
const outputPath = resolve(__dirname, '../lib/kaoyan-vocab-output.txt');
writeFileSync(outputPath, vocabEntries.join(',\n') + ',\n');
console.log(`输出文件: ${outputPath}`);
