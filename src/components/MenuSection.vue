<script setup lang="ts">
import { computed, ref, watchEffect, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n'
import MenuGrid, { type MenuItem } from '@/components/MenuGrid.vue'
import menu1Data from '@/data/menu_1.json'

const { locale } = useI18n()

interface MenuMessages {
  most_sold: string
  menuCategory: string
}

const menuMessages = computed<MenuMessages>(() => {
  try {
    const currentLocale = locale.value
    const messages = i18n.global.messages.value
    const localeMessages = messages[currentLocale as keyof typeof messages]
    return (
      localeMessages?.menu || {
        most_sold: 'Most Sold',
        menuCategory: 'Menu Category',
      }
    )
  } catch (error) {
    console.error('Error retrieving menu messages:', error)
    return {
      most_sold: 'Most Sold',
      menuCategory: 'Menu Category',
    }
  }
})

// Dynamically derive types from menu_1.json
type Category = string
type Subcategory = string

// Extend MenuItem type to include subcategoryid
interface ExtendedMenuItem extends MenuItem {
  subcategoryid?: string
}

const props = defineProps<{
  title?: string
  most_sold?: string
  enableFilters?: boolean
  initialCategory?: Category
}>()

// Dynamically generate categories from menu_1.json
const categories = computed(() => {
  const cats = ['All', ...new Set(menu1Data.categories.map((c) => c.categoryid))]
  return cats as Category[]
})

const selected = ref<Category>(props.initialCategory ?? 'All')
const selectedSubcategory = ref<Subcategory>('All')
const sortBy = ref<'popular' | 'price-asc' | 'price-desc'>('popular')
const showCategories = ref(true)

// Extend items with subcategoryid from menu_1.json
const items = ref<ExtendedMenuItem[]>(
  menu1Data.items.map((item) => ({
    id: item.itemid || String(item.name), // Convert itemid to id
    name: String(item.name || item.itemid || 'Unnamed Item'),
    price: typeof item.price === 'number' ? item.price : Number(item.price || 0),
    description: item.description || '',
    image: item.image || 'https://via.placeholder.com/150',
    subcategoryid: item.subcategoryid, // Keep subcategoryid for ExtendedMenuItem
  })) as ExtendedMenuItem[],
)

// Dynamically generate category data from menu_1.json
const categoryData = computed(() => {
  const data: Record<Category, { name: string; image: string; description: string }> = {
    All: {
      name: 'All Items',
      image:
        'https://goldbelly.imgix.net/uploads/showcase_media_asset/image/132439/yuzu-shio-ramen-kit-for-3.eff2c00445f04ccad761867bf8083ab6.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1',
      description: 'Browse our complete menu',
    },
  }

  menu1Data.categories.forEach((category) => {
    data[category.categoryid] = {
      name: category.name || category.categoryid,
      image:
        category.image ||
        'https://goldbelly.imgix.net/uploads/showcase_media_asset/image/132439/yuzu-shio-ramen-kit-for-3.eff2c00445f04ccad761867bf8083ab6.jpg?ixlib=react-9.0.2&auto=format&ar=1%3A1',
      description: category.description || 'Browse our complete menu',
    }
  })

  return data
})

// Determine category of an item based on subcategory
const categoryOf = (item: ExtendedMenuItem): Category => {
  if (!item.subcategoryid) return 'All'

  const subcategory = menu1Data.subcategories.find(
    (sub) => sub.subcategoryid === item.subcategoryid,
  )

  if (subcategory) {
    const category = menu1Data.categories.find((cat) => cat.categoryid === subcategory.categoryid)
    return category?.categoryid || 'All'
  }

  return 'All'
}

// Determine subcategory of an item
const subcategoryOf = (item: ExtendedMenuItem): Subcategory => {
  if (!item.subcategoryid) return 'All'

  const subcategory = menu1Data.subcategories.find(
    (sub) => sub.subcategoryid === item.subcategoryid,
  )

  return subcategory ? subcategory.subcategoryid : 'All'
}

// Generate subcategories map dynamically
const subcategoriesMap = computed(() => {
  const map: Record<Category, Subcategory[]> = {
    All: ['All', ...categories.value.slice(1)],
  }

  menu1Data.categories.forEach((category) => {
    map[category.categoryid] = ['All']

    menu1Data.subcategories
      .filter((sub) => sub.categoryid === category.categoryid)
      .forEach((sub) => map[category.categoryid]?.push(sub.subcategoryid))
  })

  return map
})

// Available subcategories for filtering
const availableSubcategories = computed(() => {
  if (props.enableFilters && subcategoriesMap.value[selected.value]) {
    return subcategoriesMap.value[selected.value]
  }
  return []
})

// Filter and sort items
const filtered = computed(() => {
  let list = items.value

  // Filter by main category
  if (selected.value !== 'All') {
    list = list.filter((item) => categoryOf(item) === selected.value)
  }

  // Filter by subcategory
  if (selectedSubcategory.value !== 'All') {
    if (selected.value === 'All') {
      list = list.filter((item) => categoryOf(item) === selectedSubcategory.value)
    } else {
      list = list.filter((item) => subcategoryOf(item) === selectedSubcategory.value)
    }
  }

  // Sort
  if (sortBy.value === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)

  return list
})

// Compute display title
const displayTitle = computed(() => {
  let title = categoryData.value[selected.value]?.name || 'Menu'

  if (selectedSubcategory.value !== 'All') {
    if (selected.value === 'All') {
      title = categoryData.value[selectedSubcategory.value]?.name || 'Menu'
    } else {
      const sub = menu1Data.subcategories.find((s) => s.subcategoryid === selectedSubcategory.value)
      if (sub) {
        title = `${title} - ${sub.subcategoryid}`
      } else {
        title += ` - ${selectedSubcategory.value}`
      }
    }
  }

  return title
})

// Category and subcategory selection functions
function selectCategory(category: Category) {
  selected.value = category
  selectedSubcategory.value = 'All'
  showCategories.value = false
}

function selectSubcategory(sub: Subcategory) {
  selectedSubcategory.value = sub
}

function goBack() {
  showCategories.value = true
  selectedSubcategory.value = 'All'
}

// Watch for initial category
watchEffect(() => {
  if (props.initialCategory) {
    selected.value = categories.value.includes(props.initialCategory)
      ? props.initialCategory
      : 'All'
    selectedSubcategory.value = 'All'
  }
})

// Reset subcategory when main category changes
watch(
  () => selected.value,
  () => {
    selectedSubcategory.value = 'All'
  },
)
</script>

<template>
  <section class="menu-section">
    <!-- Category Cards View -->
    <div v-if="showCategories" class="categories-view">
      <div class="categories-header">
        <h2 class="text-4xl text-white font-bold text-center mb-4">
          {{ menuMessages.most_sold }}
        </h2>
        <p class="text-neutral-100 text-center mb-8">
          {{ menuMessages.menuCategory }}
        </p>
      </div>

      <div class="categories-grid">
        <div
          v-for="category in categories"
          :key="category"
          class="category-card"
          @click="selectCategory(category)"
        >
          <div class="category-image">
            <img :src="categoryData[category]?.image" :alt="categoryData[category]?.name" />
            <div class="category-overlay">
              <div class="category-content">
                <h3 class="category-title">{{ categoryData[category]?.name }}</h3>
                <p class="category-description">
                  {{ categoryData[category]?.description }}
                </p>
                <div class="category-arrow">→</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Items List View -->
    <div v-else class="items-view">
      <div class="items-header">
        <button @click="goBack" class="back-button">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 class="current-category-title">{{ displayTitle }}</h2>
      </div>

      <!-- Subcategory Slider -->
      <div v-if="props.enableFilters" class="subcategory-slider-wrapper">
        <div class="subcategory-slider">
          <button
            v-for="sub in availableSubcategories"
            :key="sub"
            @click="selectSubcategory(sub)"
            :class="{ active: selectedSubcategory === sub }"
            class="subcategory-button"
          >
            {{ sub }}
          </button>
        </div>
      </div>

      <MenuGrid :title="displayTitle" :items="filtered" />
    </div>
  </section>
</template>

<style scoped>
.menu-section {
  padding: 8rem 0;
}

/* Categories View */
.categories-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.categories-header {
  text-align: center;
  margin-bottom: 3rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.category-card {
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  transform: rotate(-2deg);
}

.category-card:nth-child(even) {
  transform: rotate(2deg);
}

.category-card:hover {
  transform: rotate(0deg) scale(1.05);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.category-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.category-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.category-card:hover .category-image img {
  transform: scale(1.1);
}

.category-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6));
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  opacity: 1;
}

.category-content {
  text-align: center;
  color: white;
  padding: 1rem;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.category-description {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 1rem;
}

.current-category-title {
  font-size: 1rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  color: #1f2937;
  width: 100%;
}

.category-arrow {
  font-size: 1.5rem;
  font-weight: bold;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

/* Items View */
.items-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.items-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem; /* Adjusted margin */
  flex-wrap: wrap;
  gap: 1rem;
}

.back-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #070707;
  color: #d3d5db;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: #f59e0b;
  transform: translateX(-2px);
}

.subcategory-slider-wrapper {
  margin-bottom: 2rem; /* Space below the slider */
}

.subcategory-slider {
  display: flex;
  overflow-x: auto; /* Enable horizontal scrolling */
  gap: 0.75rem;
  padding-bottom: 1rem; /* Space for scrollbar */
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}

.subcategory-slider::-webkit-scrollbar {
  display: none; /* Hide scrollbar for Chrome, Safari, Edge */
}

.subcategory-button {
  flex-shrink: 0; /* Prevent buttons from shrinking */
  padding: 0.6rem 1.2rem;
  border-radius: 999px; /* Pill shape */
  border: 1px solid #d1d5db; /* neutral-300 */
  background-color: #f9fafb; /* neutral-50 */
  color: #374151; /* neutral-700 */
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.subcategory-button:hover {
  background-color: #e5e7eb; /* neutral-200 */
  border-color: #9ca3af; /* neutral-400 */
}

.subcategory-button.active {
  background-color: #fbbf24; /* amber-400 */
  border-color: #fbbf24;
  color: #111827; /* neutral-900 */
  font-weight: 600;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .category-card {
    transform: none;
  }

  .category-card:nth-child(even) {
    transform: none;
  }

  .category-card:hover {
    transform: scale(1.02);
  }

  .items-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .sort-controls {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
