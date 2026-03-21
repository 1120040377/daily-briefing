---
title: 归档
---

<script setup>
import { data as posts } from './.vitepress/posts.data.js'

const byYear = posts.reduce((acc, post) => {
  const year = new Date(post.date).getFullYear()
  if (!acc[year]) acc[year] = []
  acc[year].push(post)
  return acc
}, {})

const years = Object.keys(byYear).sort((a, b) => b - a)

function formatShortDate(dateStr) {
  const d = new Date(dateStr)
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
</script>

# 归档

<template v-for="year in years" :key="year">
  <div class="archive-year">{{ year }} 年</div>
  <ul class="archive-list">
    <li v-for="post in byYear[year]" :key="post.url">
      <span class="date">{{ formatShortDate(post.date) }}</span>
      <a :href="post.url">{{ post.title }}</a>
    </li>
  </ul>
</template>
