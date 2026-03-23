import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '每日日报',
  description: '每日 AI 资讯、前端资讯与天气预报',
  lang: 'zh-CN',

  // GitHub Pages 部署时如果仓库名不是用户名，需要设置 base
  base: '/daily-briefing/',

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
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
  },
})
