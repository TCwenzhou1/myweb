# 🚀 项目技能使用工作流执行器

## 📋 工作流概述
这是一个完整的、可执行的技能使用工作流，确保在项目的每个阶段都能自动调用合适的技能。

## 🔄 完整工作流

### 阶段 1: 项目初始化 (0-5分钟)

#### 步骤 1.1: 项目实体创建
```javascript
// 自动执行
use_skill("ontology");
// 创建项目实体，定义关系
```

#### 步骤 1.2: 主动规划
```javascript
// 自动执行
use_skill("proactive-agent");
// 制定项目策略和主动监控计划
```

#### 步骤 1.3: 技能搜索
```javascript
// 自动执行
use_skill("find-skills");
// 搜索项目相关技能
// 关键词: [项目类型] + [技术栈]
```

#### 步骤 1.4: 安全检查
```javascript
// 如果需要安装新技能
use_skill("skill-vetter");
// 安全审查新技能
```

### 阶段 2: 需求分析 (5-30分钟)

#### 步骤 2.1: UI/UX 分析
```javascript
// 检测到设计需求时自动执行
if (需求包含["设计", "ui", "ux", "界面"]) {
  use_skill("ui-ux-pro-max");
}
```

#### 步骤 2.2: 技术架构评估
```javascript
// 检测到Web开发需求时自动执行
if (需求包含["web", "前端", "react", "nextjs"]) {
  use_skill("modern-web-app");
}
```

#### 步骤 2.3: 竞品分析
```javascript
// 检测到调研需求时自动执行
if (需求包含["调研", "竞品", "分析", "市场"]) {
  use_skill("agent-browser");
}
```

### 阶段 3: 开发实施 (持续)

#### 步骤 3.1: 前端开发
```javascript
// 检测到前端任务时自动执行
if (任务包含["组件", "页面", "样式", "交互"]) {
  use_skill("modern-web-app");
  use_skill("lucide-icons"); // 如果需要图标
}
```

#### 步骤 3.2: 后端开发
```javascript
// 检测到后端任务时自动执行
if (任务包含["api", "数据库", "服务器", "逻辑"]) {
  // 使用通用开发技能
  // 可考虑搜索相关后端技能
}
```

#### 步骤 3.3: 代码管理
```javascript
// 检测到代码管理任务时自动执行
if (任务包含["git", "提交", "分支", "合并"]) {
  use_skill("github");
}
```

### 阶段 4: 测试验证 (开发完成后)

#### 步骤 4.1: 功能测试
```javascript
// 自动执行
use_skill("browser-automation");
use_skill("playwright-cli");
```

#### 步骤 4.2: 性能测试
```javascript
// 检测到性能需求时自动执行
if (需求包含["性能", "优化", "速度", "加载"]) {
  use_skill("agent-browser"); // 性能测试
}
```

#### 步骤 4.3: 兼容性测试
```javascript
// 自动执行
use_skill("playwright-cli"); // 多浏览器测试
```

### 阶段 5: 文档和部署

#### 步骤 5.1: 文档生成
```javascript
// 检测到文档需求时自动执行
if (需求包含["文档", "报告", "说明", "readme"]) {
  if (文件类型 === "ppt") use_skill("pptx");
  if (文件类型 === "pdf") use_skill("pdf");
  if (文件类型 === "word") use_skill("docx");
  use_skill("summarize"); // 内容摘要
}
```

#### 步骤 5.2: 部署
```javascript
// 检测到部署需求时自动执行
if (需求包含["部署", "发布", "上线", "CI/CD"]) {
  use_skill("github"); // GitHub Actions
}
```

#### 步骤 5.3: 渠道集成
```javascript
// 检测到IM渠道需求时自动执行
if (需求包含["飞书", "QQ", "微信", "渠道"]) {
  use_skill("自动安装IM渠道");
}
```

### 阶段 6: 沟通和协作

#### 步骤 6.1: 邮件沟通
```javascript
// 检测到邮件需求时自动执行
if (需求包含["邮件", "发送", "通知", "联系"]) {
  use_skill("智能体邮箱");
}
```

#### 步骤 6.2: 日程安排
```javascript
// 检测到日程需求时自动执行
if (需求包含["会议", "日程", "日历", "安排"]) {
  use_skill("gog"); // Google Calendar
}
```

#### 步骤 6.3: 即时消息
```javascript
// 检测到消息需求时自动执行
if (需求包含["消息", "聊天", "通知", "im"]) {
  use_skill("imessage");
}
```

### 阶段 7: 维护和改进 (项目结束后)

#### 步骤 7.1: 经验总结
```javascript
// 自动执行
use_skill("self-improving");
// 分析项目经验，学习改进
```

#### 步骤 7.2: 知识更新
```javascript
// 自动执行
use_skill("ontology");
// 更新项目知识图谱
```

#### 步骤 7.3: 策略优化
```javascript
// 自动执行
use_skill("proactive-agent");
// 优化未来项目策略
```

## 🎯 智能决策树

### 决策树 1: 选择设计技能
```
用户提到"设计" →
  是UI设计? → use_skill("ui-ux-pro-max")
  是图标设计? → use_skill("lucide-icons")
  是整体体验? → use_skill("ui-ux-pro-max") + use_skill("lucide-icons")
```

### 决策树 2: 选择文档技能
```
用户提到"文档" →
  是PPT? → use_skill("pptx")
  是PDF? → use_skill("pdf")
  是Word? → use_skill("docx")
  是摘要? → use_skill("summarize")
  是数据表格? → use_skill("xlsx")
```

### 决策树 3: 选择测试技能
```
用户提到"测试" →
  是功能测试? → use_skill("browser-automation")
  是浏览器测试? → use_skill("playwright-cli")
  是自动化测试? → use_skill("agent-browser")
  是性能测试? → use_skill("agent-browser")
```

### 决策树 4: 选择部署技能
```
用户提到"部署" →
  是代码部署? → use_skill("github")
  是渠道部署? → use_skill("自动安装IM渠道")
  是Google部署? → use_skill("gog")
```

## 📊 技能调用统计和优化

### 统计模板
```javascript
const skillStats = {
  "ontology": { calls: 0, success: 0, timeSaved: 0 },
  "proactive-agent": { calls: 0, success: 0, timeSaved: 0 },
  "agent-browser": { calls: 0, success: 0, timeSaved: 0 },
  // ... 所有技能
};

// 每次调用后更新统计
function updateSkillStats(skillId, success, timeSavedMinutes) {
  const stat = skillStats[skillId];
  stat.calls++;
  if (success) stat.success++;
  stat.timeSaved += timeSavedMinutes;
}
```

### 优化建议生成
```javascript
function generateOptimizationSuggestions() {
  const suggestions = [];
  
  // 1. 高频低效技能
  for (const [skillId, stat] of Object.entries(skillStats)) {
    if (stat.calls > 5 && stat.success / stat.calls < 0.5) {
      suggestions.push(`技能 ${skillId} 使用频率高但成功率低，建议重新评估使用场景`);
    }
  }
  
  // 2. 未使用的重要技能
  const importantSkills = ['ontology', 'proactive-agent', 'self-improving'];
  for (const skillId of importantSkills) {
    if (skillStats[skillId]?.calls === 0) {
      suggestions.push(`重要技能 ${skillId} 未被使用，建议在下次项目中尝试`);
    }
  }
  
  // 3. 时间节省最多的技能
  const mostTimeSaving = Object.entries(skillStats)
    .sort((a, b) => b[1].timeSaved - a[1].timeSaved)[0];
  suggestions.push(`时间节省最多的技能: ${mostTimeSaving[0]} (节省${mostTimeSaving[1].timeSaved}分钟)`);
  
  return suggestions;
}
```

## 🚀 一键执行脚本

### 脚本: 项目初始化
```bash
# 项目初始化脚本
node -e "
  console.log('🚀 开始项目初始化...');
  console.log('1. 创建项目实体...');
  // 调用 ontology 技能
  console.log('2. 制定主动策略...');
  // 调用 proactive-agent 技能
  console.log('3. 搜索相关技能...');
  // 调用 find-skills 技能
  console.log('✅ 项目初始化完成！');
"
```

### 脚本: 技能监控器
```bash
# 技能监控脚本
node -e "
  const keywords = process.argv.slice(2);
  const skills = {
    '网页': 'agent-browser',
    '设计': 'ui-ux-pro-max',
    '文档': 'pptx',
    '测试': 'browser-automation',
    '部署': 'github'
  };
  
  for (const keyword of keywords) {
    for (const [key, skill] of Object.entries(skills)) {
      if (keyword.includes(key)) {
        console.log(\`检测到关键词: \${key} → 推荐技能: \${skill}\`);
      }
    }
  }
" "你的项目关键词"
```

## 📝 使用指南

### 快速开始
1. **项目开始时**: 运行阶段1的所有步骤
2. **遇到任务时**: 根据决策树选择技能
3. **定期检查**: 查看技能使用统计
4. **项目结束时**: 运行阶段7的总结步骤

### 自定义配置
```javascript
// 在项目中创建 .skills-config.js
module.exports = {
  // 项目类型特定配置
  projectType: 'web-development',
  
  // 技能偏好设置
  preferredSkills: {
    'testing': 'playwright-cli',
    'documentation': 'pptx',
    'deployment': 'github'
  },
  
  // 自动调用设置
  autoCall: {
    'project-start': ['ontology', 'proactive-agent'],
    'testing-phase': ['browser-automation', 'playwright-cli'],
    'deployment-phase': ['github', '自动安装IM渠道']
  }
};
```

### 效果评估
每次项目结束后回答：
1. 哪些技能最有帮助？
2. 哪些技能使用频率低？
3. 哪些技能需要改进？
4. 发现了哪些新技能需求？

通过这个完整的工作流，你可以确保在每次项目中都能系统性地使用所有可用技能，最大化工作效率和质量。