<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter, page } = useData()

const isPost = computed(() => page.value.relativePath.startsWith('posts/'))

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month, day] = String(dateStr).slice(0, 10).split('-').map(Number)
  if (!year || !month || !day) return String(dateStr)
  const weekday = WEEKDAYS[new Date(year, month - 1, day).getDay()]
  return `${year}年${month}月${day}日 星期${weekday}`
}
</script>

<template>
  <div v-if="isPost && frontmatter.title" class="post-header">
    <h1 class="post-header-title">{{ frontmatter.title }}</h1>
    <div class="post-header-meta">
      <span v-if="frontmatter.date" class="post-header-date">
        📅 {{ formatDate(frontmatter.date) }}
      </span>
      <span v-if="frontmatter.weather" class="post-header-weather">
        明日 {{ frontmatter.weather }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.post-header {
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-header-title {
  font-size: 26px;
  font-weight: 700;
  line-height: 1.35;
  color: var(--vp-c-text-1);
  margin: 0 0 14px;
  letter-spacing: -0.01em;
}

.post-header-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.post-header-date {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.post-header-weather {
  font-size: 13px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 3px 12px;
  border-radius: 20px;
  font-weight: 500;
}
</style>
