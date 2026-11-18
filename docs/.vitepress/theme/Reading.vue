<script setup>
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

<template>
  <main class="portal-wrap portal-reading">
    <article>
      <h1>{{ frontmatter.title }}</h1>
      <Content class="reading-copy" />
    </article>
  </main>
</template>
