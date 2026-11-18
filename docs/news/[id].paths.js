import { readdir, readFile } from 'node:fs/promises'
import { extractStories } from '../.vitepress/stories.js'

const directory = new URL('../posts/', import.meta.url)

export default {
  watch: ['../posts/*.md'],
  async paths() {
    const files = (await readdir(directory)).filter(name => /^\d{4}-\d{2}-\d{2}\.md$/.test(name))
    const posts = await Promise.all(files.map(async name => {
      const source = await readFile(new URL(name, directory), 'utf8')
      return extractStories(source, name.slice(0, 10))
    }))
    return posts.flat().map(story => ({ params: { ...story } }))
  },
}
