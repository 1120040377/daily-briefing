<script setup>
import { data as posts } from '../posts.data.js'

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  })
}

function getDaysSince(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days === 0) return '今天'
  if (days === 1) return '昨天'
  return `${days} 天前`
}
</script>

<template>
  <div class="post-list">
    <div v-if="posts.length === 0" class="empty">
      <p>暂无日报，敬请期待。</p>
    </div>

    <a
      v-for="post in posts"
      :key="post.url"
      :href="post.url"
      class="post-card"
    >
      <div class="post-meta">
        <span class="post-date">{{ formatDate(post.date) }}</span>
        <span class="post-ago">{{ getDaysSince(post.date) }}</span>
        <span v-if="post.weather" class="post-weather">{{ post.weather }}</span>
      </div>
      <h2 class="post-title">{{ post.title }}</h2>
      <p v-if="post.summary" class="post-summary">{{ post.summary }}</p>
    </a>
  </div>
</template>

<style scoped>
.post-list {
  max-width: 760px;
  margin: 0 auto;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-card {
  display: block;
  padding: 20px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
  background: var(--vp-c-bg-soft);
}

.post-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-size: 13px;
}

.post-date {
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.post-ago {
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.post-weather {
  margin-left: auto;
  font-size: 14px;
}

.post-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 6px;
  color: var(--vp-c-text-1);
  border: none;
  padding: 0;
}

.post-summary {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.empty {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 60px 0;
}
</style>
