import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { h } from 'vue'
import Portal from './Portal.vue'
import Reading from './Reading.vue'
import Story from './Story.vue'
import './style.css'
import './portal.css'

const layouts = { portal: Portal, reading: Reading, story: Story }

export default {
  extends: DefaultTheme,
  Layout() {
    const { frontmatter } = useData()
    return h(layouts[frontmatter.value.layout] || DefaultTheme.Layout)
  },
}
