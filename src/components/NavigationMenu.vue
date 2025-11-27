<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import menu1Data from '@/data/menu_1.json'

// Derive categories from menu data
const categories = computed(() => {
  const categoriesList = [
    {
      name: 'All Items',
      image:
        'https://goldbelly.imgix.net/uploads/showcase_media_asset/image/132439/yuzu-shio-ramen-kit-for-3.eff2c00445f04ccad761867bf8083ab6.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1',
      description: 'Browse our complete menu',
      to: '/menu',
      categoryId: 'all',
    },
    ...menu1Data.categories.map((category) => ({
      name: category.name || category.categoryid,
      image:
        category.image ||
        'https://goldbelly.imgix.net/uploads/showcase_media_asset/image/132439/yuzu-shio-ramen-kit-for-3.eff2c00445f04ccad761867bf8083ab6.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1',
      description: category.description || 'Browse our menu',
      to: `/menu?category=${category.categoryid}`,
      categoryId: category.categoryid,
    })),
  ]

  return categoriesList
})

// State for dropdown visibility
const isDropdownVisible = ref(false)
const dropdownTimeout = ref<number | null>(null)

// Methods to handle dropdown visibility
const showDropdown = () => {
  if (dropdownTimeout.value) {
    clearTimeout(dropdownTimeout.value)
    dropdownTimeout.value = null
  }
  isDropdownVisible.value = true
}

const hideDropdown = () => {
  dropdownTimeout.value = window.setTimeout(() => {
    isDropdownVisible.value = false
  }, 300) // 300ms delay before hiding
}

const cancelHideDropdown = () => {
  if (dropdownTimeout.value) {
    clearTimeout(dropdownTimeout.value)
    dropdownTimeout.value = null
  }
}
</script>

<template>
  <div class="navigation-menu-wrapper" @mouseenter="showDropdown" @mouseleave="hideDropdown">
    <div class="nav-dropdown">
      <RouterLink to="/menu" class="menu-trigger">
        Menu
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="dropdown-icon"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </RouterLink>

      <div
        class="dropdown-content"
        :class="{ 'dropdown-visible': isDropdownVisible }"
        @mouseenter="cancelHideDropdown"
        @mouseleave="hideDropdown"
      >
        <div class="categories-grid">
          <RouterLink
            v-for="category in categories"
            :key="category.name"
            :to="{
              path: '/menu',
              query: {
                category: category.categoryId,
              },
            }"
            class="category-card"
          >
            <img :src="category.image" :alt="category.name" class="category-image" />
            <div class="category-details">
              <h3 class="category-name">{{ category.name }}</h3>
              <p class="category-description">{{ category.description }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navigation-menu-wrapper {
  position: relative;
}

.nav-dropdown {
  position: relative;
}

.menu-trigger {
  font-family: 'Bebas Neue Light', 'Impact', 'Poppins', Arial, sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 0.5rem 0.75rem;
  color: #374151;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.menu-trigger:hover {
  color: var(--vt-c-red);
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  margin-left: 0.25rem;
}

.dropdown-content {
  display: none;
  opacity: 0;
  visibility: hidden;
  position: absolute;
  top: 100%;
  inset-inline-end: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(229, 231, 235, 0.3);
  border-radius: 0.5rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  z-index: 1000;
  padding: 1rem;
  margin-top: 0.5rem;
  width: max-content;
  max-width: 800px;
  transform-origin: top inline-end;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
}

.dropdown-content.dropdown-visible {
  display: block;
  opacity: 1;
  visibility: visible;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.category-card {
  display: block;
  text-decoration: none;
  border-radius: 0.75rem;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(229, 231, 235, 0.3);
}

.category-card:hover {
  transform: scale(1.05);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.category-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.category-details {
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.95);
}

.category-name {
  font-family: 'Bebas Neue', 'Impact', 'Poppins', Arial, sans-serif;
  font-size: 1.25rem;
  color: var(--vt-c-red);
  margin-bottom: 0.25rem;
  text-transform: uppercase;
}

.category-description {
  font-size: 0.875rem;
  color: #6b7280;
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dropdown-content {
    max-width: 100%;
    width: 100vw;
    inset-inline-start: 50%;
    transform: translateX(-50%);
  }
}
</style>
