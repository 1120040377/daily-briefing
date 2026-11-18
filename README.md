# Daily Briefing · 每日日报

基于 [VitePress](https://vitepress.dev/) 的静态新闻站。推荐页按期展示日报，近期报道可按频道浏览。GitHub Actions 将构建产物发布到 GitHub Pages。

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
│   │       ├── Portal.vue      # 日报目录和频道资讯
│   │       └── style.css       # 全局样式
│   ├── posts/
│   │   └── YYYY-MM-DD.md       # 每日日报文件
│   ├── news/                  # 生成单条报道详情页
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

每天新增或更新一份 `docs/posts/YYYY-MM-DD.md`。AI 可以直接写文件，也可以把完整 Markdown 交给 `node scripts/create-post.js --date YYYY-MM-DD --stdin`。当天补稿时给脚本加 `--force`，已有报道尽量保留原有顺序，详情页地址按日期和报道顺序生成。

```markdown
---
title: "AI 五分钟日报 · 2026年11月18日"
date: 2026-11-18
summary: "当天最重要的新闻，显示在推荐页日报入口"
---

## 今日最值得知道

以新闻稿导语概括当天要闻。

### 单条新闻标题

<!-- news: models -->

首句交代核心事实，后续补充适用条件与细节。

**判断**：首句给出结论，后续补充理由或限制条件。

发布机构 · 发布日期 · [原文](https://example.com/)
```

按需重复三级标题、分类、正文和来源。分类可选 `models`（模型）、`agents`（Agent）、`tools`（开发工具）、`research`（研究）和 `industry`（行业）。省略分类时，构建会按标题和来源推断。列表使用描述和判断的首句，详情保留完整文本和来源链接。日报阅读区保留描述和判断，构建时将来源链接集中到正文后的折叠区，并移除标题锚点和更新附记，方便浏览器朗读。

推荐页和归档保留全部日报。资讯频道覆盖以最新一期为基准的近 30 个日历日，较早的 Markdown 仍可通过日报和归档阅读。旧版日报继续可读，符合上述条目格式的报道才会进入资讯索引。

构建会为日报和可识别报道生成静态 HTML。文件数量增长会增加构建和部署耗时，近期资讯范围限制的是首页加载的数据量。
