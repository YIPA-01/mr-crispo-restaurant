<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCartStore } from '@/stores/cart'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { i18n } from '@/i18n'

const { t, locale } = useI18n()
const cart = useCartStore()
const { items, isOpen, itemCount, subtotal } = storeToRefs(cart)

interface CartMessages {
  title: string
  empty: string
  total: string
  continue: string
  checkout: string
}

const cartMessages = computed<CartMessages>(() => {
  try {
    const currentLocale = locale.value
    const messages = i18n.global.messages.value
    const localeMessages = messages[currentLocale as keyof typeof messages]
    return (
      localeMessages?.cart || {
        title: 'Cart',
        empty: 'Your cart is empty',
        total: 'Total',
        continue: 'Continue Shopping',
        checkout: 'Proceed to Checkout',
      }
    )
  } catch (error) {
    console.error('Error retrieving cart messages:', error)
    return {
      title: 'Cart',
      empty: 'Your cart is empty',
      total: 'Total',
      continue: 'Continue Shopping',
      checkout: 'Proceed to Checkout',
    }
  }
})

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MAD',
    maximumFractionDigits: 0,
  }).format(value)
}
</script>

<template>
  <transition name="fade">
    <div v-if="isOpen" class="overlay" @click="cart.toggle(false)"></div>
  </transition>
  <transition name="slide">
    <aside v-if="isOpen" class="drawer bg-white" aria-label="Shopping cart">
      <header class="drawer__header">
        <h3>{{ cartMessages.title }} ({{ itemCount }})</h3>
        <button class="icon" aria-label="Close" @click="cart.toggle(false)">✕</button>
      </header>

      <div class="drawer__body">
        <div v-if="items.length === 0" class="empty">{{ cartMessages.empty }}</div>
        <ul v-else class="list">
          <li v-for="it in items" :key="it.id" class="row">
            <div class="row__info">
              <div class="row__name">{{ it.name }}</div>
              <div class="row__price">{{ formatCurrency(it.price) }}</div>
            </div>
            <div class="row__qty">
              <button @click="cart.decrement(it.id)">−</button>
              <span>{{ it.quantity }}</span>
              <button @click="cart.increment(it.id)">+</button>
            </div>
            <button class="row__remove" @click="cart.remove(it.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-trash-2"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <footer class="drawer__footer" v-if="items.length">
        <div class="summary">
          <span>{{ cartMessages.total }}</span>
          <strong>{{ formatCurrency(subtotal) }}</strong>
        </div>
        <div class="actions">
          <button class="ghost" @click="cart.toggle(false)">{{ cartMessages.continue }}</button>
          <a
            class="primary"
            :href="`https://wa.me/212719861012?text=${encodeURIComponent(
              `*Order Details*\n\n${items
                .map((i, idx) => `${idx + 1}. *${i.name}* x${i.quantity} - ${formatCurrency(i.price * i.quantity)}`)
                .join('\n')}

--------------------------
Subtotal: *${formatCurrency(subtotal)}*
`
            )}`"
            target="_blank"
            rel="noopener"
          >
            {{ cartMessages.checkout }}
          </a>
        </div>
      </footer>
    </aside>
  </transition>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9998;
  backdrop-filter: blur(4px);
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: min(420px, 92vw);
  background: white;
  color: #1f2937;
  border-left: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  z-index: 9999;
  box-shadow: -10px 0 25px rgba(0, 0, 0, 0.15);
}

.drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.drawer__header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.drawer__header .icon {
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.drawer__header .icon:hover {
  background: #dc2626;
  transform: scale(1.05);
}

.drawer__body {
  flex: 1;
  overflow: auto;
  padding: 1.5rem;
}

.empty {
  opacity: 0.7;
  padding: 3rem 0;
  text-align: center;
  color: #6b7280;
  font-size: 1.125rem;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

.row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fafbfc;
  transition: all 0.2s ease;
}

.row:hover {
  border-color: #fbbf24;
  box-shadow: 0 4px 8px rgba(251, 191, 36, 0.1);
}

.row__info {
  display: grid;
  gap: 0.25rem;
}

.row__name {
  font-weight: 600;
  color: #1f2937;
  font-size: 1rem;
}

.row__price {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.row__qty {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border-radius: 8px;
  padding: 0.25rem;
  border: 1px solid #e5e7eb;
}

.row__qty button {
  width: 28px;
  height: 28px;
  border: none;
  background: #f3f4f6;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  color: #374151;
  transition: all 0.2s ease;
}

.row__qty button:hover {
  background: #e5e7eb;
  color: #1f2937;
}

.row__qty span {
  min-width: 20px;
  text-align: center;
  font-weight: 600;
  color: #1f2937;
}

.row__remove {
  justify-self: end;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.row__remove:hover {
  background: #dc2626;
  transform: scale(1.05);
}

.drawer__footer {
  border-top: 1px solid #e5e7eb;
  padding: 1.5rem;
  background: #f9fafb;
  display: grid;
  gap: 1rem;
}

.summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.summary strong {
  color: #fbbf24;
  font-size: 1.25rem;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.actions .primary {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #1f2937;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.actions .primary:hover {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(251, 191, 36, 0.3);
}

.actions .ghost {
  background: transparent;
  border: 2px solid #e5e7eb;
  padding: 0.875rem 1rem;
  border-radius: 8px;
  color: #6b7280;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.actions .ghost:hover {
  border-color: #d1d5db;
  color: #374151;
  background: #f3f4f6;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .drawer {
    width: 100vw;
    border-left: none;
  }

  .drawer__header {
    padding: 1rem;
  }

  .drawer__body {
    padding: 1rem;
  }

  .drawer__footer {
    padding: 1rem;
  }

  .row {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    text-align: center;
  }

  .row__qty {
    justify-self: center;
  }

  .row__remove {
    justify-self: center;
  }

  .actions {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

@media (max-width: 480px) {
  .drawer__header h3 {
    font-size: 1.125rem;
  }

  .row {
    padding: 0.75rem;
  }

  .row__name {
    font-size: 0.875rem;
  }

  .row__price {
    font-size: 0.75rem;
  }
}
</style>
