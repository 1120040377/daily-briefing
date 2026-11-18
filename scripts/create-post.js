#!/usr/bin/env node
/**
 * 创建每日日报文件
 *
 * 用法：
 *   node scripts/create-post.js                    # 创建今天的日报（空模板）
 *   node scripts/create-post.js --date 2026-03-22  # 指定日期
 *   node scripts/create-post.js --stdin            # 从 stdin 读取 markdown 正文
 *
 * 供定时任务调用时，可以通过 stdin 传入生成好的日报内容：
 *   echo "正文内容" | node scripts/create-post.js --stdin
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = path.join(__dirname, '../docs/posts')

// ---------- 工具函数 ----------

function getLocalDateStr(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function buildFrontmatter({ date, title, weather, summary }) {
  return [
    '---',
    `title: ${title}`,
    `date: ${date}`,
    `weather: ${weather}`,
    `summary: ${summary}`,
    '---',
    '',
  ].join('\n')
}

function buildTemplate() {
  return `## 今日最值得知道

<!-- 用一段新闻稿导语交代当天发生的主要事件。 -->

<!-- 每条报道使用以下格式，复制后填入内容。
### 新闻标题
分类标记放在标题下一行，写成 HTML 注释 news: models。
正文写事实与条件，随后用加粗的“判断”引出编辑判断。
来源机构 · 发布日期 · [原文](https://example.com/)
-->
`
}

async function readStdin() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin })
    const lines = []
    rl.on('line', (line) => lines.push(line))
    rl.on('close', () => resolve(lines.join('\n')))
  })
}

// ---------- 解析参数 ----------

const args = process.argv.slice(2)
const dateArg = (() => {
  const idx = args.indexOf('--date')
  return idx !== -1 ? args[idx + 1] : null
})()
const useStdin = args.includes('--stdin')
const forceOverwrite = args.includes('--force')

const date = dateArg || getLocalDateStr()

// 验证日期格式
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
  console.error(`错误：日期格式不正确，应为 YYYY-MM-DD，收到：${date}`)
  process.exit(1)
}

// ---------- 主流程 ----------

async function main() {
  const filePath = path.join(POSTS_DIR, `${date}.md`)

  if (fs.existsSync(filePath) && !forceOverwrite) {
    console.log(`文件已存在：${filePath}`)
    console.log('使用 --force 覆盖已有文件')
    process.exit(0)
  }

  // 确保目录存在
  fs.mkdirSync(POSTS_DIR, { recursive: true })

  let body
  if (useStdin) {
    body = await readStdin()
    if (!body.trim()) {
      console.warn('警告：stdin 内容为空，使用默认模板')
      body = buildTemplate()
    }
  } else {
    body = buildTemplate()
  }

  // 如果 body 已包含 frontmatter，直接写入；否则自动补充
  let content
  if (body.trimStart().startsWith('---')) {
    content = body
  } else {
    const frontmatter = buildFrontmatter({
      date,
      title: `${date} 日报`,
      weather: '⛅ 待更新',
      summary: '',
    })
    content = frontmatter + body
  }

  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`✅ 日报已创建：${filePath}`)
}

main().catch((err) => {
  console.error('创建日报失败：', err)
  process.exit(1)
})
