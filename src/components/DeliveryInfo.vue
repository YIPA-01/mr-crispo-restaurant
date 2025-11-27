<script setup lang="ts">
const features = [
  {
    icon: '🚚',
    title: 'Free Delivery',
    description: 'Enjoy free delivery within Dcheira, Inezgane & Eljihadya',
  },
  { icon: '⏰', title: 'Open Late', description: 'Open 09:00 AM – 02:00 AM, Monday to Friday' },
  {
    icon: '🍽️',
    title: 'Authentic Cuisine',
    description: 'Traditional Moroccan dishes prepared with care and local ingredients',
  },
  {
    icon: '📱',
    title: 'Easy Ordering',
    description: 'Order via WhatsApp for quick and convenient service',
  },
]
</script>

<template>
  <section class="py-16 px-5 bg-neutral-50">
    <div class="max-w-8xl mx-auto">
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold mb-3">Why Choose Mr. Crispo?</h2>
        <p class="text-neutral-600 max-w-2xl mx-auto">
          From sizzling fast food to the finest Moroccan tagines, we bring you the best of both
          worlds
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="rounded-xl bg-white p-6 border border-neutral-200"
        >
          <div class="text-3xl mb-3">{{ feature.icon }}</div>
          <h3 class="text-lg font-semibold">{{ feature.title }}</h3>
          <p class="text-neutral-600 mt-1">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
