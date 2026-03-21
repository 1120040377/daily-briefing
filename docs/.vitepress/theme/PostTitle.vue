<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { frontmatter, page } = useData()

const isPost = computed(() => page.value.relativePath.startsWith('posts/'))

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })
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
        {{ frontmatter.weather }}
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
