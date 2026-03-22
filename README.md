# Daily Briefing · 每日日报

基于 [VitePress](https://vitepress.dev/) 构建的每日新闻日报网站，包含 AI 资讯、前端资讯和天气预报，通过 GitHub Actions 自动部署到 GitHub Pages。1

- [预览](https://1120040377.github.io/daily-briefing/)

## 项目结构

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自动部署
├── docs/
│   ├── .vitepress/
│   │   ├── config.js           # VitePress 配置
│   │   ├── posts.data.js       # 日报数据加载器
│   │   └── theme/
│   │       ├── index.js        # 自定义主题入口
│   │       ├── PostList.vue    # 首页日报列表组件
│   │       └── style.css       # 全局样式
│   ├── posts/
│   │   └── YYYY-MM-DD.md       # 每日日报文件
│   ├── index.md                # 首页
│   └── archive.md              # 归档页
├── scripts/
│   └── create-post.js          # 生成日报的脚本
├── .gitignore
└── package.json
```

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建
npm run build

# 预览构建产物
npm run preview
```

## 创建日报

```bash
# 创建今日日报（空模板）
node scripts/create-post.js

# 指定日期
node scripts/create-post.js --date 2026-03-22

# 从 stdin 传入正文内容（供定时任务调用）
echo "正文内容" | node scripts/create-post.js --stdin

# 覆盖已有文件
node scripts/create-post.js --force
```

## 日报格式

每篇日报放在 `docs/posts/YYYY-MM-DD.md`，frontmatter 如下：

```yaml
---
title: 2026-03-21 日报
date: 2026-03-21
weather: ⛅ 多云 12°C
summary: 一句话摘要，显示在首页列表
---
```

正文分三个板块：
- `## 🤖 AI 资讯`
- `## 🖥️ 前端资讯`
- `## 🌤️ 天气预报`

## 部署到 GitHub Pages

1. 在 GitHub 仓库 **Settings → Pages → Source** 选择 **GitHub Actions**
2. 如果仓库名不是 `<username>.github.io`，在 `docs/.vitepress/config.js` 中取消注释并修改 `base` 字段：
   ```js
   base: '/your-repo-name/',
   ```
3. Push 到 `main` 分支即可触发自动部署
