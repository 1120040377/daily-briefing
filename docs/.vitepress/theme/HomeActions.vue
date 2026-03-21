<script setup>
import { withBase } from 'vitepress'
import { data as posts } from '../posts.data.js'

const latestPost = posts[0]
</script>

<template>
  <div class="home-actions">
    <a
      v-if="latestPost"
      :href="withBase(latestPost.url)"
      class="home-action-btn brand"
    >
      查看今日日报
    </a>
    <a :href="withBase('/archive')" class="home-action-btn alt">
      归档
    </a>
  </div>
</template>

<style scoped>
.home-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 24px;
}

.home-action-btn {
  display: inline-block;
  padding: 10px 24px;
  border-radius: 22px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

.home-action-btn.brand {
  background: var(--vp-c-brand-1);
  color: #fff;
  border: 2px solid var(--vp-c-brand-1);
}

.home-action-btn.brand:hover {
  background: var(--vp-c-brand-2);
  border-color: var(--vp-c-brand-2);
}

.home-action-btn.alt {
  background: transparent;
  color: var(--vp-c-text-1);
  border: 2px solid var(--vp-c-divider);
}

.home-action-btn.alt:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
</style>
