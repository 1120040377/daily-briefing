<script setup>
import { withBase } from 'vitepress'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { data } from '../feed.data.js'
import { channels } from '../stories.js'

const tabs = [['issues', '推荐'], ['latest', '最新资讯'], ...channels]
const selected = ref('issues')
const items = computed(() => selected.value === 'latest'
  ? data.stories
  : data.stories.filter(item => item.channel === selected.value))

function select(id) {
  selected.value = id
  window.history.replaceState(window.history.state, '', '#' + id)
  window.scrollTo(0, 0)
}

async function restore() {
  const [id, story] = window.location.hash.slice(1).split('/')
  selected.value = tabs.some(([key]) => key === id) ? id : 'issues'
  await nextTick()
  document.getElementById('tab-' + selected.value)?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  if (story) {
    const row = document.getElementById(story)
    row?.querySelector('.story-link')?.focus({ preventScroll: true })
    row?.scrollIntoView({ block: 'center' })
  }
}

function moveTab(event, index) {
  const offset = { ArrowLeft: -1, ArrowRight: 1 }[event.key]
  if (!offset) return
  event.preventDefault()
  const id = tabs[(index + offset + tabs.length) % tabs.length][0]
  select(id)
  document.getElementById('tab-' + id)?.focus()
}

onMounted(() => {
  restore()
  window.addEventListener('hashchange', restore)
})
onUnmounted(() => window.removeEventListener('hashchange', restore))
</script>

<template>
  <header class="portal-header">
    <div class="portal-bar portal-wrap">
      <a class="portal-brand" :href="withBase('/')">每日简报</a>
      <a v-if="data.issues.length" class="portal-accent" :href="withBase(data.issues[0].url)">最新一期日报 →</a>
    </div>
    <nav class="portal-tabs portal-wrap" role="tablist" aria-label="新闻频道">
      <button v-for="([id, label], index) in tabs" :id="'tab-' + id" :key="id" type="button"
        role="tab" :aria-selected="id === selected" aria-controls="portal-channel"
        :tabindex="id === selected ? 0 : -1" @click="select(id)" @keydown="moveTab($event, index)">
        {{ label }}
      </button>
    </nav>
  </header>
  <main class="portal-wrap portal-main">
    <section id="portal-channel" role="tabpanel" :aria-labelledby="'tab-' + selected">
      <template v-if="selected === 'issues'">
        <a v-for="issue in data.issues" :key="issue.date" class="issue-row" :href="withBase(issue.url)">
          <time :datetime="issue.date">{{ issue.date.slice(5).replace('-', ' / ') }}</time>
          <span class="issue-copy">
            <strong>{{ issue.summary || issue.title }}</strong>
            <small>{{ issue.date.slice(0, 4) }} 年<span v-if="issue.count"> · {{ issue.count }} 条报道</span></small>
          </span>
          <span class="portal-accent" aria-hidden="true">→</span>
        </a>
      </template>
      <template v-else>
        <p v-if="!items.length" class="portal-muted">最近 30 天暂无这个频道的资讯。</p>
        <article v-for="item in items" :id="item.id" :key="item.id" class="portal-news">
          <a class="story-link" :href="withBase('/news/' + item.id + '.html#' + selected)">
            <h2>{{ item.title }}</h2>
            <p>{{ item.description }}</p>
            <p class="portal-judgment"><strong>判断</strong> {{ item.judgment }}</p>
          </a>
          <div class="portal-muted"><time :datetime="item.date">{{ item.date }}</time> ·
            <a class="portal-accent" :href="item.link">{{ item.source }} 原文 ↗</a>
          </div>
        </article>
      </template>
    </section>
  </main>
</template>
