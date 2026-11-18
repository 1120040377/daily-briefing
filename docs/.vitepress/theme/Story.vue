<script setup>
import { useData, useRoute, withBase } from 'vitepress'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { channels } from '../stories.js'

const { page } = useData()
const route = useRoute()
const story = computed(() => page.value.params)
const selected = ref('latest')
const valid = new Set(['latest', ...channels.map(([id]) => id)])
const back = computed(() => withBase('/#' + selected.value + '/' + story.value.id))
function readChannel() {
  const channel = window.location.hash.slice(1)
  selected.value = valid.has(channel) ? channel : 'latest'
}
onMounted(() => {
  readChannel()
  window.addEventListener('hashchange', readChannel)
})
onUnmounted(() => window.removeEventListener('hashchange', readChannel))
</script>

<template>
  <header class="portal-header">
    <div class="portal-wrap portal-bar">
      <a class="portal-brand" :href="withBase('/')">每日简报</a>
      <a class="portal-accent" :href="back">返回资讯</a>
    </div>
  </header>
  <main class="portal-wrap portal-reading">
    <article :key="route.path">
      <time class="portal-muted" :datetime="story.date">{{ story.date }}</time>
      <h1>{{ story.title }}</h1>
      <p>{{ story.description }}</p>
      <p class="portal-judgment"><strong>判断</strong> {{ story.judgment }}</p>
      <ul class="story-sources">
        <li v-for="link in story.links" :key="link.href">
          <a class="portal-accent" :href="link.href">{{ link.label }} ↗</a>
        </li>
      </ul>
    </article>
  </main>
</template>
