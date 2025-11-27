<script setup lang="ts">
import MenuItemCard from './MenuItemCard.vue'

export type MenuItem = {
  id: string
  name: string
  price: number
  description?: string
  image?: string
}

defineProps<{
  title?: string
  items: MenuItem[]
}>()
</script>

<template>
  <section class="menu" id="menu">
    <div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
      <MenuItemCard v-for="it in items" :key="it.id" v-bind="it" />
    </div>
  </section>
</template>

<style scoped>
.menu {
  padding: 2rem 1.25rem;
}
</style>
