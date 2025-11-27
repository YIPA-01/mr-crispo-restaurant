import { defineStore } from 'pinia'

export type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
}

type State = {
  isOpen: boolean
  items: CartItem[]
}

export const useCartStore = defineStore('cart', {
  state: (): State => ({
    isOpen: false,
    items: [],
  }),
  getters: {
    itemCount: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: (state) => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  },
  actions: {
    toggle(open?: boolean) {
      this.isOpen = typeof open === 'boolean' ? open : !this.isOpen
    },
    addItem(item: Omit<CartItem, 'quantity'>, quantity = 1) {
      const existing = this.items.find((i) => i.id === item.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ ...item, quantity })
      }
      this.isOpen = true
    },
    increment(id: string) {
      const target = this.items.find((i) => i.id === id)
      if (target) target.quantity += 1
    },
    decrement(id: string) {
      const target = this.items.find((i) => i.id === id)
      if (!target) return
      target.quantity -= 1
      if (target.quantity <= 0) this.remove(id)
    },
    remove(id: string) {
      this.items = this.items.filter((i) => i.id !== id)
    },
    clear() {
      this.items = []
    },
  },
})
