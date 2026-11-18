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
  <aside v-if="frontmatter.readingSources?.length" class="portal-wrap reading-references" aria-label="报道来源">
    <details>
      <summary>查看报道来源</summary>
      <ul>
        <li v-for="(group, index) in frontmatter.readingSources" :key="index">
          <strong v-if="group.title">{{ group.title }}</strong>
          <ul>
            <li v-for="(link, linkIndex) in group.links" :key="linkIndex">
              <a class="portal-accent" :href="link.href">{{ link.label }} ↗</a>
            </li>
          </ul>
        </li>
      </ul>
    </details>
  </aside>
</template>
