<script setup lang="ts">
import { useCartStore } from '@/stores/cart'

const props = defineProps<{
  id: string
  name: string
  price: number
  description?: string
  image?: string
}>()

const cart = useCartStore()

function addToCart() {
  cart.addItem({ id: props.id, name: props.name, price: props.price }, 1)
}
</script>

<template>
  <article class="menu-item-card">
    <div class="menu-item-image">
      <slot name="media">
        <img v-if="image" :src="image" :alt="name" class="item-image" />
        <div v-else class="placeholder-image">
          <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        </div>
      </slot>
      <div class="menu-item-overlay">
        <div class="overlay-content">
          <h4 class="item-title">{{ name }}</h4>
          <p v-if="description" class="item-description">{{ description }}</p>
          <div class="item-price">{{ price }} MAD</div>
        </div>
      </div>
    </div>
    <div class="menu-item-actions">
      <button class="add-to-cart-btn" @click="addToCart">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Add to cart
      </button>
    </div>
  </article>
</template>

<style scoped>
.menu-item-card {
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background: white;
  position: relative;
}

.menu-item-card:hover {
  transform: rotate(0deg) scale(1.05);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.menu-item-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.item-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-item-card:hover .item-image {
  transform: scale(1.1);
}

.menu-item-overlay {
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
}

.menu-item-card:hover .menu-item-overlay {
  opacity: 1;
}

.overlay-content {
  text-align: center;
  color: white;
  padding: 1rem;
}

.item-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.item-description {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.item-price {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fbbf24;
}

.menu-item-actions {
  padding: 1rem;
  background: white;
}

.add-to-cart-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #fbbf24;
  color: #111827;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.add-to-cart-btn:hover {
  background: #f59e0b;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(251, 191, 36, 0.3);
}

.add-to-cart-btn:active {
  transform: translateY(0);
}

/* Responsive Design */
@media (max-width: 768px) {
  .menu-item-card {
    transform: none;
  }

  .menu-item-card:nth-child(even),
  .menu-item-card:nth-child(3n) {
    transform: none;
  }

  .menu-item-card:hover {
    transform: scale(1.02);
  }

  .item-title {
    font-size: 1.1rem;
  }

  .item-description {
    font-size: 0.85rem;
  }
}
</style>
