import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import PostList from './PostList.vue'
import PostTitle from './PostTitle.vue'
import HomeActions from './HomeActions.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(PostTitle),
    })
  },
  enhanceApp({ app }) {
    app.component('PostList', PostList)
    app.component('HomeActions', HomeActions)
  },
}
