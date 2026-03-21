import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  excerpt: true,
  transform(raw) {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title || url.replace('/posts/', '').replace('.html', ''),
        url,
        date: frontmatter.date instanceof Date
          ? frontmatter.date.toISOString().split('T')[0]
          : String(frontmatter.date || ''),
        summary: frontmatter.summary || '',
        weather: frontmatter.weather || '',
        excerpt,
      }))
      .filter(post => post.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  },
})
