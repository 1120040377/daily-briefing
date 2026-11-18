import { createContentLoader } from 'vitepress'
import { extractStories } from './stories.js'

export default createContentLoader('posts/*.md', {
  includeSrc: true,
  transform(raw) {
    const issues = raw.map(({ src, url, frontmatter }) => {
      const date = url.match(/\d{4}-\d{2}-\d{2}/)?.[0]
      if (!date) return null
      const stories = extractStories(src, date)
      return { date, url, title: frontmatter.title || date, summary: frontmatter.summary || '',
        count: stories.length, stories }
    }).filter(Boolean).sort((a, b) => b.date.localeCompare(a.date))
    const latest = Date.parse(issues[0]?.date)
    const stories = issues.filter(issue => latest - Date.parse(issue.date) < 30 * 86400000)
      .flatMap(issue => issue.stories.map(({ links, ...story }) => ({
        ...story,
        description: firstSentence(story.description),
        judgment: firstSentence(story.judgment),
        link: links[0].href,
      })))
    return { issues: issues.map(({ stories, ...issue }) => issue), stories }
  },
})

function firstSentence(text) {
  return text.match(/^.*?[。！？](?:[”」』])?/)?.[0] || text
}
