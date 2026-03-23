# 项目工作流程技能使用策略和技术经验库

## 🎯 核心目标
确保每次做项目时都能充分利用所有可用技能，提高效率和质量。

---

## 🐛 常见问题修复经验

### Next.js 项目常见错误

#### 1. ESLint 错误: react/no-unescaped-entities
**症状**: JSX 中的特殊字符（双引号等）导致构建失败
```
Error: react/no-unescaped-entities
./components/AboutMe.tsx:79:39
```

**根本原因**: JSX 文本中的英文字符需要转义或替换

**解决方案**:
- 使用中文括号 `「」` 替换英文双引号 `""`
- 或使用 HTML 实体 `&quot;`
- 或用花括号包装 `{'}'}`

**示例修复**:
```jsx
// ❌ 错误
<span>"把想法做成系统"</span>

// ✅ 正确
<span>「把想法做成系统」</span>
```

**适用场景**: 中文内容中需要引用符号

---

#### 2. ESLint 错误: react/jsx-no-comment-textnodes
**症状**: JSX 子节点中的 `//` 被识别为注释
```
Error: react/jsx-no-comment-textnodes
./components/Hero.tsx:107:10
```

**根本原因**: JSX 中直接写 `//` 会被识别为 JavaScript 注释

**解决方案**:
- 用花括号包装文本 `{'// 内容'}`
- 这样 JavaScript 解析器会正确处理它为字符串

**示例修复**:
```jsx
// ❌ 错误 - // 被识别为注释
<div>// 持续构建中...</div>

// ✅ 正确 - 显式的 JavaScript 表达式
<div>{'// 持续构建中...'}</div>
```

**适用场景**: 需要在 JSX 中显示代码片段或注释符号

---

#### 3. Vercel 构建失败: Module not found
**症状**: Vercel 构建时找不到依赖模块
```
Type error: Cannot find module 'clsx' or its corresponding type declarations.
./lib/utils.ts:1:39
```

**根本原因**: 
- 代码中导入了依赖包
- 但 `package.json` 的 `dependencies` 中未声明
- 本地可能已安装 (node_modules)，但 Vercel 构建时无法找到

**解决方案**:
1. 检查代码中导入了哪些包
2. 在 `package.json` 的 `dependencies` 中明确添加
3. 注意区分 `dependencies`(生产) vs `devDependencies`(开发)

**示例修复**:
```json
// 在 package.json 中补充缺失的包
"dependencies": {
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.2.0"
}
```

**适用场景**: 任何本地能运行但 Vercel 构建失败的项目

---

### 修复最佳实践

1. **最小化改动**: 只改必要的部分，保持整体设计
2. **遵循规则**: 完全遵守 ESLint 和 React 最佳实践
3. **版本管理**: 使用 semver 版本号，确保兼容性
4. **文档记录**: 详细记录修复过程，便于日后参考
5. **分阶段验证**: 本地验证→Git 提交→Vercel 验证

---

## 📋 可用技能分类

### 基础技能（Always Available）
1. **Agent Browser** - 浏览器自动化，用于网页交互、截图、数据提取
2. **Find Skills** - 技能发现和安装，扩展能力
3. **Github** - GitHub 操作（issues、PRs、CI/CD）
4. **Gog** - Google Workspace 集成（Gmail、Calendar、Drive）
5. **iMessage** - iOS 消息处理
6. **MCP管理器** - MCP 服务器管理
7. **Ontology** - 知识图谱和结构化记忆
8. **Proactive Agent** - 主动规划和改进
9. **Self-Improving** - 自我反思和学习
10. **Skill Vetter** - 技能安全检查
11. **Summarize** - 内容摘要
12. **智能体邮箱** - 邮件处理
13. **自动安装IM渠道** - IM 渠道自动化设置

### 项目特定技能（按需使用）
1. **Browser Automation** - 网页自动化测试
2. **playwright-cli** - Playwright 浏览器自动化
3. **modern-web-app** - 现代 Web 应用开发
4. **ui-ux-pro-max** - UI/UX 设计智能
5. **lucide-icons** - 图标搜索和生成
6. **agent-browser** - 浏览器代理
7. **pptx** - PowerPoint 文档处理
8. **pdf** - PDF 文档处理
9. **docx** - Word 文档处理
10. **xlsx** - Excel 数据处理

## 🚀 项目工作流程

### 阶段 1：项目启动和规划
1. **使用 Ontology 技能** - 创建项目实体和关系
2. **使用 Proactive Agent** - 制定主动规划策略
3. **使用 Find Skills** - 搜索项目相关技能

### 阶段 2：需求分析和设计
1. **使用 UI/UX Pro Max** - UI/UX 设计分析和优化
2. **使用 Modern Web App** - 现代 Web 应用架构设计
3. **使用 Agent Browser** - 竞品分析和网页调研

### 阶段 3：开发实施
1. **使用 Browser Automation** - 自动化测试和验证
2. **使用 Playwright CLI** - 网页测试和交互
3. **使用 Lucide Icons** - 图标设计和集成
4. **使用 Github** - 版本控制和协作

### 阶段 4：数据处理和文档
1. **使用 pptx/pdf/docx/xlsx** - 文档和数据处理
2. **使用 Summarize** - 内容摘要和报告生成
3. **使用 Gog** - Google 文档集成

### 阶段 5：测试和部署
1. **使用 Agent Browser** - 自动化测试和截图
2. **使用 Github** - CI/CD 和部署
3. **使用 自动安装IM渠道** - 渠道集成和部署

### 阶段 6：维护和改进
1. **使用 Self-Improving** - 项目经验学习和改进
2. **使用 Ontology** - 更新项目知识图谱
3. **使用 Proactive Agent** - 制定维护策略

## 🔧 技能调用时机判断表

| 项目任务 | 推荐技能 | 使用时机 |
|---------|---------|---------|
| 网页交互/测试 | Agent Browser, Playwright | 需要进行网页操作时 |
| 数据提取 | Agent Browser, Gog | 需要从网页或Google提取数据 |
| 文档处理 | pptx/pdf/docx/xlsx | 需要处理Office文档 |
| 设计相关 | UI/UX Pro Max, Lucide Icons | 需要UI/UX设计或图标 |
| 代码管理 | Github | 版本控制、PR、Issues |
| 知识管理 | Ontology | 结构化信息存储 |
| 自动改进 | Self-Improving, Proactive | 项目结束或遇到问题时 |
| 安全审查 | Skill Vetter | 安装新技能前 |
| 内容摘要 | Summarize | 需要总结长内容 |
| 渠道部署 | 自动安装IM渠道 | 部署到飞书/QQ等平台 |

## 📝 最佳实践

### 1. 项目开始时
- 立即使用 **Ontology** 创建项目实体
- 使用 **Find Skills** 搜索项目相关技能
- 使用 **Proactive Agent** 制定项目计划

### 2. 遇到特定任务时
- 先判断任务类型（网页、文档、设计、数据等）
- 根据上表选择合适的技能
- 立即调用相应技能

### 3. 定期进行
- 使用 **Self-Improving** 反思项目经验
- 使用 **Ontology** 更新项目状态
- 使用 **Proactive Agent** 调整策略

## 🚨 重要提醒

1. **技能安全检查**：安装新技能前必须使用 **Skill Vetter** 进行安全审查
2. **适时使用**：不要过度使用技能，确保技能与任务匹配
3. **技能组合**：有些任务可能需要多个技能组合使用
4. **持续学习**：定期使用 **Find Skills** 发现新技能

## 📊 技能效果评估

每次项目结束后评估：
1. 哪些技能使用频率最高？
2. 哪些技能效果最好？
3. 哪些技能需要改进或替换？
4. 是否有新的技能需求？

## 🔄 持续优化

基于每次项目的经验：
1. 更新此策略文档
2. 优化技能调用时机
3. 发现和安装新技能
4. 改进现有技能的使用方法