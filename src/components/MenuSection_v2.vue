<script setup lang="ts">
import { ref, computed, withDefaults, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import menu1Data from '@/data/menu_1.json'
import { i18n } from '@/i18n'
import { useCartStore } from '@/stores/cart'
import { useI18n } from 'vue-i18n'

// Types aligned with menu_1.json structure
interface MenuItem {
  subcategoryid: string
  itemid?: string
  name?: string | number
  price: number | string
  description: string
  image?: string
  currency?: string
}

interface Subcategory {
  subcategoryid: string
  categoryid: string
}

interface Category {
  categoryid: string
  name?: string
  description?: string
}

interface MenuMessages {
  currency: string
}

const props = withDefaults(
  defineProps<{
    title?: string
    enableFilters?: boolean
  }>(),
  {
    title: '',
    enableFilters: true,
  },
)

// Initialize cart store
const cartStore = useCartStore()
const { locale } = useI18n()

// Enhance categories with more display information
const enhancedCategories: Category[] = menu1Data.categories.map((category) => ({
  categoryid: category.categoryid,
  name: category.name || category.categoryid,
  description: category.description,
}))

// Process menu data into structured format
const processedMenuData = computed(() => {
  const categoriesMap = new Map<
    string,
    {
      categoryid: string
      name: string
      description: string
      subcategories: Map<string, MenuItem[]>
    }
  >()

  // Group items by category and subcategory
  enhancedCategories.forEach((category) => {
    const categorySubcategories = new Map<string, MenuItem[]>()

    // Find subcategories for this category
    const relevantSubcategories = menu1Data.subcategories.filter(
      (sub: Subcategory) => sub.categoryid === category.categoryid,
    )

    // Process items for each subcategory
    relevantSubcategories.forEach((subcategory: Subcategory) => {
      const subcategoryItems = menu1Data.items
        .filter((item: MenuItem) => item.subcategoryid === subcategory.subcategoryid)
        .map((item: MenuItem) => {
          const processedItem = {
            ...item,
            name: item.name
              ? item.name.toString()
              : item.itemid
                ? item.itemid.toString()
                : 'Unnamed Item',
            price: Number(item.price || 0),
            image: item.image ? item.image.toString() : 'https://via.placeholder.com/300',
          }
          return processedItem
        })

      if (subcategoryItems.length > 0) {
        categorySubcategories.set(subcategory.subcategoryid, subcategoryItems)
      }
    })

    categoriesMap.set(category.categoryid, {
      categoryid: category.categoryid,
      name: category.name ? category.name.toString() : category.categoryid,
      description: category.description ? category.description.toString() : 'Menu Category',
      subcategories: categorySubcategories,
    })
  })

  return categoriesMap
})

// Computed categories for template
const computedCategories = computed(() => {
  return Array.from(processedMenuData.value.entries()).map(([id, data]) => ({
    id,
    ...data,
    subcategories: Object.fromEntries(data.subcategories),
  }))
})

// Add state for selected category in carousel
const selectedCategory = ref<string | null>(null)

// Add route handling for category selection
const route = useRoute()

// State for tracking selected subcategories
const selectedSubcategories = ref<Record<string, string>>({})

// Method to scroll to a specific category
function scrollToCategory(categoryId: string) {
  const categoryElement = document.getElementById(`category-${categoryId}`)

  if (categoryElement) {
    // Update selected category for active state
    selectedCategory.value = categoryId

    // Scroll to the category section
    categoryElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    // Automatically select the first subcategory for this category
    const targetCategory = computedCategories.value.find((c) => c.id === categoryId)
    if (targetCategory) {
      const subcategories = Object.keys(targetCategory.subcategories)
      if (subcategories.length > 0) {
        selectedSubcategories.value[categoryId] = String(subcategories[0])
      }
    }
  }
}

// Separate function for category navigation logic
function navigateToCategory(categoryQuery: string) {
  // Ensure computedCategories is available before processing
  if (computedCategories.value.length === 0) {
    console.warn('No categories available for navigation')
    return
  }

  console.log('Attempting to navigate to category:', categoryQuery)

  // Log all menu data for debugging
  console.log('Menu Data:', {
    categories: menu1Data.categories,
    subcategories: menu1Data.subcategories,
    items: menu1Data.items.slice(0, 5), // Log first 5 items to avoid overwhelming logs
  })

  // Log computed categories for debugging
  console.log(
    'Computed Categories:',
    computedCategories.value.map((c) => ({
      id: c.id,
      name: c.name,
      subcategories: Object.keys(c.subcategories),
    })),
  )

  // Matching strategies with detailed logging
  const matchingStrategies = [
    {
      name: 'Direct ID Match',
      match: (category: { id: string }) =>
        category.id.toLowerCase() === categoryQuery.toLowerCase(),
    },
    {
      name: 'Name Match',
      match: (category: { name?: string }) =>
        category.name?.toLowerCase() === categoryQuery.toLowerCase(),
    },
    {
      name: 'Subcategory Category Match',
      match: (category: { id: string }) =>
        menu1Data.subcategories.some(
          (sub) => sub.categoryid === categoryQuery && sub.categoryid === category.id,
        ),
    },
  ]

  // Find the matching category with detailed logging
  const targetCategory = computedCategories.value.find((category) => {
    const matchResults = matchingStrategies.map((strategy) => ({
      strategyName: strategy.name,
      result: strategy.match(category),
    }))

    console.log(`Checking category: ${category.id}`, matchResults)

    return matchResults.some((result) => result.result)
  })

  console.log('Found target category:', targetCategory)

  if (targetCategory) {
    // Update selected category
    selectedCategory.value = targetCategory.id

    // Scroll to the category section
    nextTick(() => {
      const categoryElement = document.getElementById(`category-${targetCategory.id}`)

      console.log('Category element:', categoryElement)

      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' })

        // Automatically select the first subcategory for this category
        const subcategories = Object.keys(targetCategory.subcategories)
        console.log('Subcategories:', subcategories)

        if (subcategories.length > 0) {
          selectedSubcategories.value[targetCategory.id] = String(subcategories[0])
          console.log('Selected subcategory:', selectedSubcategories.value[targetCategory.id])
        }
      } else {
        console.error(`No element found for category-${targetCategory.id}`)
      }
    })
  } else {
    console.error('No matching category found for:', categoryQuery)

    // Fallback: log all possible matching information
    console.log('Fallback Matching Information:', {
      directIdMatches: menu1Data.categories.filter(
        (cat) => cat.categoryid.toLowerCase() === categoryQuery.toLowerCase(),
      ),
      nameMatches: menu1Data.categories.filter(
        (cat) => cat.name?.toLowerCase() === categoryQuery.toLowerCase(),
      ),
      subcategoryMatches: menu1Data.subcategories.filter(
        (sub) => sub.categoryid.toLowerCase() === categoryQuery.toLowerCase(),
      ),
    })
  }
}

// Watch for route changes to handle category navigation
watch(
  () => route.query.category,
  (newCategory) => {
    console.log('Route query category changed:', newCategory)

    if (newCategory && newCategory !== 'all') {
      // Use nextTick to ensure computedCategories is fully initialized
      nextTick(() => {
        navigateToCategory(String(newCategory))
      })
    }
  },
  { immediate: true },
)

// Global menu messages
const menuMessages = computed<MenuMessages>(() => {
  try {
    const currentLocale = locale.value
    const messages = i18n.global.messages.value
    const localeMessages = messages[currentLocale as keyof typeof messages]
    return (
      localeMessages?.menu || {
        currency: 'MAD',
      }
    )
  } catch (error) {
    console.error('Error retrieving menu messages:', error)
    return {
      currency: 'MAD',
    }
  }
})

// Type guard for string conversion
function asString(value: string | number | undefined, fallback: string = ''): string {
  return value !== undefined ? String(value) : fallback
}

// Lifecycle hook to set initial subcategory for each category
onMounted(() => {
  // Ensure categories are processed before setting initial state
  nextTick(() => {
    computedCategories.value.forEach((category) => {
      const subcategories = Object.keys(category.subcategories)
      if (subcategories.length > 0) {
        // Select the first subcategory for each category by default
        selectedSubcategories.value[category.id] = String(subcategories[0])
      }
    })

    // Initial navigation based on route query
    const routeCategory = route.query.category as string | undefined
    if (routeCategory && routeCategory !== 'all') {
      navigateToCategory(routeCategory)
    }
  })
})

// Method to select a subcategory
function selectSubcategory(categoryId: string, subcategoryId: string | number) {
  // Convert subcategoryId to string
  const stringSubcategoryId = String(subcategoryId)

  // Toggle subcategory selection
  if (selectedSubcategories.value[categoryId] === stringSubcategoryId) {
    // If already selected, deselect
    delete selectedSubcategories.value[categoryId]
  } else {
    // Select the subcategory
    selectedSubcategories.value[categoryId] = stringSubcategoryId
  }
}

// Check if a subcategory is selected
function isSubcategorySelected(
  categoryId: string,
  subcategoryId: string | number | undefined,
): boolean {
  if (subcategoryId === undefined) return false
  const stringSubcategoryId = String(subcategoryId)
  return selectedSubcategories.value[categoryId] === stringSubcategoryId
}

// Method to add item to cart
function addToCart(item: MenuItem) {
  cartStore.addItem({
    id: item.itemid || String(item.name),
    name: String(item.name),
    price: Number(item.price || 0),
  })
}
</script>

<template>
  <div class="menu-section-v2">
    <!-- Fixed Category Carousel -->
    <div class="category-carousel">
      <div
        v-for="category in computedCategories"
        :key="category.id"
        class="category-carousel-item"
        :class="{ active: selectedCategory === category.id }"
        @click="scrollToCategory(category.id)"
      >
        <span class="category-carousel-name">{{ category.name }}</span>
      </div>
    </div>

    <div class="menu-categories">
      <div
        v-for="category in computedCategories"
        :key="category.id"
        :id="`category-${category.id}`"
        class="category-section"
      >
        <div class="category-header">
          <p class="category-description">{{ category.description }}</p>
        </div>

        <div class="subcategory-slider">
          <div
            v-for="(subcategoryItems, subcategoryId) in category.subcategories"
            :key="subcategoryId"
            class="subcategory-tab"
            :class="{
              active: isSubcategorySelected(category.id, subcategoryId),
            }"
            @click="selectSubcategory(category.id, subcategoryId)"
          >
            {{ subcategoryId }}
          </div>
        </div>

        <div v-if="selectedSubcategories[category.id]" class="category-subcategories">
          <div
            v-for="(subcategoryItems, subcategoryId) in category.subcategories"
            :key="subcategoryId"
            v-show="isSubcategorySelected(category.id, subcategoryId)"
            class="subcategory-section"
          >
            <div class="subcategory-items">
              <div v-for="item in subcategoryItems" :key="item.itemid" class="menu-item">
                <img :src="item.image" class="item-image" />
                <div class="item-details">
                  <div class="item-header">
                    <div class="header-left">
                      <h4 class="item-name">{{ item.name }}</h4>
                      <p class="item-description">{{ item.description }}</p>
                    </div>
                    <span class="item-price">
                      {{
                        typeof item.price === 'number'
                          ? item.price.toFixed(2)
                          : Number(item.price || 0).toFixed(2)
                      }}
                      {{ menuMessages.currency }}
                    </span>
                  </div>
                  <button class="add-to-cart" @click="addToCart(item)">🛒</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-section-v2 {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.menu-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
}

.category-section {
  margin-bottom: 3rem;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 2rem;
}

.category-header {
  text-align: center;
  margin-bottom: 2rem;
}

.category-name {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.category-description {
  color: #666;
  font-size: 1rem;
}

.subcategory-slider {
  display: flex;
  justify-content: center;
  gap: 1rem;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  scrollbar-width: none;
}

.subcategory-slider::-webkit-scrollbar {
  display: none;
}

.subcategory-tab {
  flex-shrink: 0;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: #f4f4f4;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.subcategory-tab:hover {
  background-color: #e0e0e0;
}

.subcategory-tab.active {
  background-color: #fbbf24;
  color: white;
  border-color: #fbbf24;
}

.category-subcategories {
  margin-top: 1.5rem;
}

.subcategory-section {
  margin-bottom: 2rem;
}

.subcategory-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  align-items: stretch;
}

.menu-item {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  display: flex;
  flex-direction: row;
  height: 100%;
  min-height: 140px;
}

.menu-item:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 33.333%;
  height: 100%;
  min-height: 140px;
  object-fit: cover;
  flex-shrink: 0;
}

.item-details {
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
}

.header-left {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.item-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;
}

.item-price {
  color: #fbbf24;
  font-weight: bold;
  white-space: nowrap;
  flex-shrink: 0;
}

.item-description {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
  margin-top: 0.25rem;
  line-height: 1.5;
}

.add-to-cart {
  align-self: flex-end;
  margin-top: auto;
  background-color: #fbbf24;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.add-to-cart:hover {
  transform: scale(1.1);
}

.category-carousel {
  position: sticky;
  top: 64px; /* Adjust based on your header height */
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  backdrop-filter: blur(10px);
  padding: 0.75rem 0;

  overflow-x: auto;
  gap: 1rem;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.category-carousel::-webkit-scrollbar {
  display: none; /* WebKit */
}

.category-carousel-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.6;
  transform: scale(0.9);
}

.category-carousel-item.active,
.category-carousel-item:hover {
  opacity: 1;
  transform: scale(1);
}

.category-carousel-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease;
}

.category-carousel-item.active .category-carousel-icon {
  background-color: #fbbf24;
  color: white;
}

.category-carousel-name {
  font-size: 1rem;
  color: #666;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.category-carousel-item.active .category-carousel-name {
  color: var(--vt-c-red);
}

@media (max-width: 768px) {
  .menu-section-v2 {
    padding: 1rem;
  }

  .menu-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .category-section {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
  }

  .category-header {
    margin-bottom: 1.5rem;
  }

  .category-name {
    font-size: 1.5rem;
  }

  .category-description {
    font-size: 0.9rem;
  }

  .subcategory-slider {
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .subcategory-tab {
    padding: 0.4rem 0.8rem;
    font-size: 0.875rem;
  }

  .subcategory-items {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .menu-item {
    flex-direction: column;
    min-height: auto;
  }

  .item-image {
    width: 100%;
    height: 200px;
    min-height: 200px;
  }

  .item-details {
    padding: 1rem;
  }

  .item-header {
    flex-direction: row;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .header-left {
    width: 100%;
    flex: 1;
  }

  .item-name {
    font-size: 1rem;
    margin-bottom: 0.25rem;
  }

  .item-price {
    align-self: flex-start;
    font-size: 1rem;
    flex-shrink: 0;
  }

  .item-description {
    font-size: 0.85rem;
    margin-top: 0;
  }

  .add-to-cart {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }

  .category-carousel {
    top: 56px; /* Adjust for smaller screens */
    padding: 0.5rem 0;
    gap: 0.75rem;
  }

  .category-carousel-name {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .menu-section-v2 {
    padding: 0.75rem;
  }

  .menu-title {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }

  .category-name {
    font-size: 1.25rem;
  }

  .subcategory-tab {
    padding: 0.35rem 0.7rem;
    font-size: 0.8rem;
  }

  .item-image {
    height: 180px;
    min-height: 180px;
  }

  .item-details {
    padding: 0.75rem;
  }

  .item-name {
    font-size: 0.95rem;
  }

  .item-description {
    font-size: 0.8rem;
  }
}
</style>
