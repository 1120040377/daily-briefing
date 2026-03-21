<script setup>
import { withBase } from 'vitepress'
import { data as posts } from '../posts.data.js'

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']

function formatDate(dateStr) {
  const [year, month, day] = String(dateStr).split('-').map(Number)
  if (!year || !month || !day) return String(dateStr)
  const weekday = WEEKDAYS[new Date(year, month - 1, day).getDay()]
  return `${year}年${month}月${day}日 周${weekday}`
}

function getDaysSince(dateStr) {
  const [year, month, day] = String(dateStr).split('-').map(Number)
  if (!year || !month || !day) return ''
  const diff = Date.now() - new Date(year, month - 1, day).getTime()
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
      :href="withBase(post.url)"
      class="post-card"
    >
      <div class="post-card-top">
        <div class="post-meta">
          <span class="post-date">{{ formatDate(post.date) }}</span>
          <span class="post-ago">{{ getDaysSince(post.date) }}</span>
        </div>
        <span v-if="post.weather" class="post-weather">明日 {{ post.weather }}</span>
      </div>
      <h2 class="post-title">{{ post.title }}</h2>
      <p v-if="post.summary" class="post-summary">{{ post.summary }}</p>
      <div class="post-card-footer">
        <span class="post-read-more">阅读全文 →</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.post-list {
  max-width: 780px;
  margin: 0 auto;
  padding: 28px 0 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-card {
  display: block;
  padding: 22px 26px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.18s;
  background: var(--vp-c-bg-soft);
  position: relative;
  overflow: hidden;
}

.post-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 3px;
  background: var(--vp-c-brand-1);
  transition: width 0.25s ease;
}

.post-card:hover {
  border-color: var(--vp-c-brand-2);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.09);
  transform: translateY(-3px);
}

.post-card:hover::before {
  width: 100%;
}

.post-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.post-date {
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.post-ago {
  font-size: 12px;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-alt);
  padding: 1px 8px;
  border-radius: 10px;
}

.post-weather {
  font-size: 13px;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 3px 12px;
  border-radius: 20px;
  font-weight: 500;
  white-space: nowrap;
}

.post-title {
  font-size: 17px;
  font-weight: 600;
  margin: 0 0 8px;
  color: var(--vp-c-text-1);
  border: none;
  padding: 0;
  line-height: 1.4;
  letter-spacing: -0.01em;
}

.post-summary {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 14px;
  line-height: 1.7;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card-footer {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 12px;
  margin-top: 2px;
}

.post-read-more {
  font-size: 13px;
  color: var(--vp-c-brand-1);
  font-weight: 500;
  transition: gap 0.15s;
}

.empty {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 60px 0;
}

@media (max-width: 640px) {
  .post-list {
    padding: 16px 0 32px;
  }

  .post-card {
    padding: 18px 18px;
  }

  .post-title {
    font-size: 16px;
  }
}
</style>
