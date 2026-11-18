import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig } from 'vitepress'
import { extractReadingSources, readingMarkdown } from './stories.js'

export default defineConfig({
  title: '每日日报',
  description: 'AI 五分钟日报与分类资讯',
  lang: 'zh-CN',

  // GitHub Pages 部署时如果仓库名不是用户名，需要设置 base
  base: '/daily-briefing/',

  async transformPageData(page, { siteConfig }) {
    if (page.relativePath.startsWith('posts/')) {
      page.frontmatter.layout = 'reading'
      const file = await readFile(resolve(siteConfig.srcDir, page.filePath), 'utf8')
      page.frontmatter.readingSources = extractReadingSources(file)
    }
    if (page.frontmatter.layout === 'story' && page.params?.title) page.title = page.params.title
  },

  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: '每日日报',

    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/archive' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/1120040377/daily-briefing' },
    ],

    footer: {
      message: '每日更新 · AI 资讯 · 前端资讯 · 天气预报',
    },

    outline: {
      label: '本文目录',
      level: [2, 3],
    },
  },

  markdown: {
    config(md) {
      md.core.ruler.before('block', 'reading-copy', state => {
        if (state.env.relativePath?.startsWith('posts/')) state.src = readingMarkdown(state.src)
      })
      md.core.ruler.after('anchor', 'reading-headings', state => {
        if (!state.env.relativePath?.startsWith('posts/')) return
        for (const [index, token] of state.tokens.entries()) {
          if (!token.children) continue
          const previous = state.tokens[index - 1]
          if (previous?.type === 'paragraph_open' && token.content.startsWith('**判断**：')) {
            previous.attrJoin('class', 'portal-judgment')
          }
          const start = token.children.findIndex(child => child.attrGet('class') === 'header-anchor')
          if (start < 0) continue
          const end = token.children.findIndex((child, index) => index > start && child.type === 'link_close')
          if (end > start) token.children.splice(start, end - start + 1)
        }
      })
    },
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
})
