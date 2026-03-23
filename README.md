# TCwenzhou 个人作品集网站

一个具有未来感的深色个人作品集网站，使用 Next.js + TypeScript + Tailwind CSS 构建。

## 🎨 设计特点

- **深色主题**: 黑蓝/深灰背景，青蓝色霓虹点缀
- **未来感设计**: 克制霓虹效果，适度动效
- **响应式布局**: 完美适配桌面端和移动端
- **高级质感**: 玻璃态效果、渐变背景、平滑动画

## 🚀 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Lucide React** - 图标库
- **Framer Motion** - 动画库

## 📁 项目结构

```
d:/MYweb/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── Navbar.tsx         # 导航栏
│   ├── Hero.tsx           # 首屏区域
│   ├── AboutMe.tsx        # 关于我
│   ├── Projects.tsx       # 项目展示
│   ├── Skills.tsx         # 技能栈
│   ├── Growth.tsx         # 成长方向
│   ├── Gallery.tsx        # 作品展示
│   ├── Contact.tsx        # 联系表单
│   └── Footer.tsx         # 页脚
├── lib/                   # 工具函数
│   └── utils.ts           # 通用工具
└── public/               # 静态资源
```

## 🎯 功能特性

### 1. 导航栏
- 响应式设计，移动端汉堡菜单
- 滚动时透明背景切换
- 平滑滚动导航

### 2. Hero 首屏
- 视差滚动效果
- 渐变色标题动画
- 数据统计卡片
- 滚动提示

### 3. 关于我
- 个人介绍卡片
- 个人标签展示
- 技能进度条
- 学习重点时间线

### 4. 项目展示
- 项目卡片网格
- 技术标签展示
- GitHub 和演示链接
- 悬停动画效果

### 5. 技能栈
- 分类技能展示
- 进度条动画
- 技能特点总结
- 学习资源推荐

### 6. 成长方向
- 成长卡片展示
- 时间线路径
- 特性标签
- 悬停效果

### 7. 作品展示
- 图片网格布局
- 模态框详情查看
- 分类标签
- 悬停遮罩效果

### 8. 联系表单
- 表单验证
- 提交状态反馈
- 联系信息展示
- 响应时间说明

## 🎨 设计系统

### 颜色方案
- 背景: `hsl(222 47% 11%)`
- 前景: `hsl(210 40% 98%)`
- 主色: `hsl(217 91% 60%)` (青蓝色)
- 强调色: `hsl(262 83% 58%)` (蓝紫色)
- 边框: `hsl(216 34% 17%)`

### 动画效果
- `neon-pulse`: 霓虹脉冲效果
- `float`: 浮动动画
- `glow`: 光晕效果
- `slide-up`: 上滑出现
- `gradient`: 渐变动画

### 组件样式
- `glass-effect`: 玻璃态效果
- `neon-text`: 霓虹文字
- `neon-border`: 霓虹边框
- `gradient-bg`: 渐变背景

## 📱 响应式断点

- `sm`: 640px (移动端)
- `md`: 768px (平板)
- `lg`: 1024px (桌面端)
- `xl`: 1280px (大桌面)
- `2xl`: 1536px (超大桌面)

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 启动生产服务器
```bash
npm start
```

## 🔧 自定义配置

### 修改个人信息
1. 更新 `components/AboutMe.tsx` 中的个人介绍
2. 修改 `components/Hero.tsx` 中的标题和副标题
3. 更新 `components/Contact.tsx` 中的联系信息

### 添加项目
在 `components/Projects.tsx` 的 `projects` 数组中添加新项目：
```typescript
{
  title: '项目名称',
  description: '项目描述',
  icon: IconComponent,
  tags: ['技术栈'],
  links: {
    github: 'GitHub链接',
    demo: '演示链接',
  },
  color: '渐变颜色类',
}
```

### 修改技能
在 `components/Skills.tsx` 的 `skillCategories` 数组中更新技能数据。

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 📞 联系

- 邮箱: hello@tcwenzhou.site
- GitHub: [@TCwenzhou1](https://github.com/TCwenzhou1)
- 网站: [https://www.tcwenzhou.site](https://www.tcwenzhou.site)