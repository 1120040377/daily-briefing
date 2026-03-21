---
title: 归档
---

<script setup>
import { data as posts } from './.vitepress/posts.data.js'
import { withBase } from 'vitepress'

// Group posts by year -> month
const grouped = posts.reduce((acc, post) => {
  const d = new Date(post.date + 'T00:00:00')
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  if (!acc[year]) acc[year] = {}
  if (!acc[year][month]) acc[year][month] = []
  acc[year][month].push(post)
  return acc
}, {})

const years = Object.keys(grouped).sort((a, b) => b - a)

const monthNames = [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月',
]

function getMonths(year) {
  return Object.keys(grouped[year]).sort((a, b) => b - a)
}

function formatDay(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return String(d.getDate()).padStart(2, '0') + ' 日'
}
</script>

# 归档

<template v-for="year in years" :key="year">
  <div class="archive-year">{{ year }} 年</div>
  <template v-for="month in getMonths(year)" :key="`${year}-${month}`">
    <div class="archive-month">{{ monthNames[month - 1] }}</div>
    <ul class="archive-list">
      <li v-for="post in grouped[year][month]" :key="post.url">
        <span class="date">{{ formatDay(post.date) }}</span>
        <a :href="withBase(post.url)">{{ post.title }}</a>
      </li>
    </ul>
  </template>
</template>
