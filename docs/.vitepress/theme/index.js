import DefaultTheme from 'vitepress/theme'
import PostList from './PostList.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PostList', PostList)
  },
}
