<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import CartDrawer from '@/components/CartDrawer.vue'
import Footer from '@/components/Footer.vue'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { i18n } from '@/i18n'
import NavigationMenu from '@/components/NavigationMenu.vue'

const cart = useCartStore()
const { itemCount } = storeToRefs(cart)

const { t, locale } = useI18n()

interface NavMessages {
  home: string
  menu: string
  about: string
  contact: string
  orderNow: string
  language: string
}

const navMessages = computed<NavMessages>(() => {
  try {
    const currentLocale = locale.value
    const messages = i18n.global.messages.value
    const localeMessages = messages[currentLocale as keyof typeof messages]
    return (
      localeMessages?.nav || {
        home: 'Home',
        menu: 'Menu',
        about: 'About',
        contact: 'Contact',
        orderNow: 'Order Now',
        language: 'Language',
      }
    )
  } catch (error) {
    console.error('Error retrieving navigation messages:', error)
    return {
      home: 'Home',
      menu: 'Menu',
      about: 'About',
      contact: 'Contact',
      orderNow: 'Order Now',
      language: 'Language',
    }
  }
})

const availableLocales = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇲🇦' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
]

const isLanguageDropdownOpen = ref(false)
const isMobileMenuOpen = ref(false)

function changeLocale(newLocale: string) {
  locale.value = newLocale
  isLanguageDropdownOpen.value = false
  // Optional: Add document direction for RTL languages
  document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr'
}

function toggleLanguageDropdown() {
  isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value
}

function closeLanguageDropdown() {
  isLanguageDropdownOpen.value = false
}

function openMobileMenu() {
  isMobileMenuOpen.value = true
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function openCartAndCloseMobile() {
  cart.toggle(true)
  closeMobileMenu()
}

const currentLocale = computed(() => availableLocales.find((lang) => lang.code === locale.value))

// Click outside handler
function handleClickOutside(event: Event) {
  const target = event.target as HTMLElement
  if (!target.closest('.language-selector')) {
    closeLanguageDropdown()
  }
  if (isMobileMenuOpen.value && !target.closest('.mobile-menu') && !target.closest('.hamburger')) {
    closeMobileMenu()
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeLanguageDropdown()
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header class="topbar">
    <div class="profile-brand-container">
      <div class="profile-circle">
        <img src="/src/assets/images/logo.jpg" alt="Profile Picture" />
      </div>
      <div class="brand">Mr. Crispo</div>
    </div>
    <nav class="nav">
      <div class="desktop-only links">
        <RouterLink to="/">{{ navMessages.home }}</RouterLink>
        <NavigationMenu />
        <RouterLink to="/about">{{ navMessages.about }}</RouterLink>
        <RouterLink to="/contact">{{ navMessages.contact }}</RouterLink>
      </div>

      <!-- Language Selector -->
      <div class="language-selector desktop-only" @click.stop>
        <button
          class="language-trigger"
          @click="toggleLanguageDropdown"
          :class="{ active: isLanguageDropdownOpen }"
        >
          <span class="flag">{{ currentLocale?.flag }}</span>
          <span class="language-name">{{ currentLocale?.name }}</span>
          <svg
            class="chevron"
            :class="{ rotated: isLanguageDropdownOpen }"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <div v-if="isLanguageDropdownOpen" class="language-dropdown" @click="closeLanguageDropdown">
          <div class="dropdown-content">
            <button
              v-for="lang in availableLocales"
              :key="lang.code"
              @click="changeLocale(lang.code)"
              class="language-option"
              :class="{ active: locale === lang.code }"
            >
              <span class="flag">{{ lang.flag }}</span>
              <span class="language-name">{{ lang.name }}</span>
              <svg
                v-if="locale === lang.code"
                class="check"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M13.333 4L6 11.333L2.667 8"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <button class="cart desktop-only" @click="cart.toggle(true)">
        🛒 <span v-if="itemCount" class="count">{{ itemCount }}</span>
      </button>
      <a
        class="order desktop-only"
        href="https://wa.me/212621995530"
        target="_blank"
        rel="noopener"
        >{{ navMessages.orderNow }}</a
      >

      <!-- Mobile hamburger -->
      <button
        class="hamburger mobile-only"
        :class="{ open: isMobileMenuOpen }"
        @click="toggleMobileMenu"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle menu"
      >
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
          <line class="line line1" x1="4" y1="6" x2="20" y2="6" />
          <line class="line line2" x1="4" y1="12" x2="20" y2="12" />
          <line class="line line3" x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
  <Footer />
  <CartDrawer />

  <!-- Mobile Drawer -->
  <div v-if="isMobileMenuOpen" class="mobile-menu-overlay" @click="closeMobileMenu"></div>
  <aside class="mobile-menu" :class="{ open: isMobileMenuOpen }" :aria-hidden="!isMobileMenuOpen">
    <div class="mobile-menu-header">
      <div class="brand">Mr. Crispo</div>
      <button class="header-cart" @click="openCartAndCloseMobile" aria-label="Open cart">
        🛒<span v-if="itemCount" class="count">{{ itemCount }}</span>
      </button>
      <button class="close" @click="closeMobileMenu" aria-label="Close menu">✕</button>
    </div>
    <div class="mobile-menu-content">
      <RouterLink to="/" @click="closeMobileMenu">{{ navMessages.home }}</RouterLink>
      <RouterLink to="/menu" @click="closeMobileMenu">{{ navMessages.menu }}</RouterLink>
      <RouterLink to="/about" @click="closeMobileMenu">{{ navMessages.about }}</RouterLink>
      <RouterLink to="/contact" @click="closeMobileMenu">{{ navMessages.contact }}</RouterLink>

      <div class="divider"></div>

      <!-- Language selector simplified for mobile -->
      <div class="mobile-language">
        <label>{{ navMessages.language || 'Language' }}</label>
        <div class="options">
          <button
            v-for="lang in availableLocales"
            :key="lang.code"
            @click="changeLocale(lang.code)"
            :class="{ active: locale === lang.code }"
          >
            <span class="flag">{{ lang.flag }}</span>
            <span class="language-name">{{ lang.name }}</span>
          </button>
        </div>
      </div>

      <div class="actions">
        <a
          class="order"
          href="https://wa.me/212621995530"
          target="_blank"
          rel="noopener"
          @click="closeMobileMenu"
        >
          {{ navMessages.orderNow }}
        </a>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 1rem;
  background: rgb(255, 255, 255);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.profile-brand-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.profile-circle {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.profile-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.brand {
  font-family: 'Bebas Neue', 'Impact', 'Poppins', Arial, sans-serif;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 1.5rem;
  color: var(--vt-c-red);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.nav {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.nav a {
  font-family: 'Bebas Neue Light', 'Impact', 'Poppins', Arial, sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 0.5rem 0.75rem;
  color: #374151;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
}

.nav .links {
  display: flex;
  gap: 0.5rem;
}

.nav .links a:hover {
  color: var(--vt-c-red);
}

.nav .cart {
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(229, 231, 235, 0.5);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.2s ease;
  cursor: pointer;
}

.nav .cart:hover {
  background: rgba(251, 191, 36, 0.1);
  border-color: rgba(251, 191, 36, 0.3);
  transform: translateY(-1px);
}

.nav .cart .count {
  margin-left: 0.25rem;
  font-weight: 700;
  color: #fbbf24;
}

.nav .order {
  font-family: 'Bebas Neue', 'Impact', 'Poppins', Arial, sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--vt-c-red);
  color: var(--vt-c-white-soft);
  border-radius: 999px;
  padding: 0.5rem 0.9rem;
}

/* Language Selector Styles */
.language-selector {
  position: relative;
  display: inline-block;
}

.language-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(229, 231, 235, 0.5);
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 100;
  color: #374151;
  min-width: 120px;
  justify-content: space-between;
}

.language-trigger .flag {
  font-size: 1rem;
  line-height: 1;
}

.language-trigger .language-name {
  flex: 1;
  text-align: left;
  font-family: var(--font-primary);
}

.language-trigger .chevron {
  transition: transform 0.2s ease;
  color: #6b7280;
}

.language-trigger .chevron.rotated {
  transform: rotate(180deg);
}

.language-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 0.25rem;
  animation: dropdownFadeIn 0.15s ease-out;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(229, 231, 235, 0.3);
  border-radius: 0.5rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  min-width: 140px;
}

.language-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  font-size: 0.875rem;
  color: #374151;
  text-align: left;
  position: relative;
}

.language-option.active {
  color: var(--vt-c-red);
}

.language-option .flag {
  font-size: 1rem;
  line-height: 1;
  flex-shrink: 0;
}

.language-option .language-name {
  flex: 1;
}

.language-option .check {
  color: var(--vt-c-red);
  flex-shrink: 0;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .language-trigger {
    min-width: 100px;
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }

  .language-trigger .language-name {
    display: none;
  }

  .dropdown-content {
    min-width: 120px;
  }

  .language-option {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
  }

  .desktop-only {
    display: none !important;
  }
  .mobile-only {
    display: inline-flex !important;
  }
  .hamburger {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    border: 1px solid rgba(229, 231, 235, 0.6);
    background: rgba(255, 255, 255, 0.95);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition:
      background 0.2s ease,
      border-color 0.2s ease;
  }

  .hamburger svg {
    display: block;
  }
  .hamburger .line {
    stroke: #1f2937;
    stroke-width: 2;
    stroke-linecap: round;
    transition:
      transform 0.22s ease,
      opacity 0.22s ease;
    transform-origin: 12px 12px;
  }
  .hamburger.open .line1 {
    transform: translateY(6px) rotate(45deg);
  }
  .hamburger.open .line2 {
    opacity: 0;
  }
  .hamburger.open .line3 {
    transform: translateY(-6px) rotate(-45deg);
  }
}

main {
  min-height: calc(100vh - 64px);
}

/* Desktop/Mobile visibility defaults */
.desktop-only {
  display: inline-flex;
}
.mobile-only {
  display: none;
}

/* Hamburger */

/* Mobile Drawer */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1400;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: min(85vw, 360px);
  height: 100vh;
  background: #ffffff;
  border-left: 1px solid rgba(229, 231, 235, 0.6);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.06);
  transform: translateX(100%);
  transition: transform 0.25s ease;
  z-index: 1500;
  display: flex;
  flex-direction: column;
}
.mobile-menu.open {
  transform: translateX(0);
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid rgba(229, 231, 235, 0.6);
}
.mobile-menu-header .header-cart {
  margin-left: auto;
  margin-right: 0.5rem;
  padding: 0.4rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(229, 231, 235, 0.7);
  background: #ffffff;
  cursor: pointer;
}
.mobile-menu-header .header-cart .count {
  margin-left: 0.25rem;
  font-weight: 700;
  color: #f59e0b;
}
.mobile-menu-header .close {
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

.mobile-menu-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
}
.mobile-menu-content a {
  padding: 0.75rem 0.5rem;
  color: #374151;
  text-decoration: none;
  font-weight: 600;
  border-radius: 0.5rem;
}
.mobile-menu-content a:hover {
  background: rgba(251, 191, 36, 0.1);
  color: #92400e;
}

.mobile-menu .divider {
  height: 1px;
  background: rgba(229, 231, 235, 0.8);
  margin: 0.5rem 0;
}

.mobile-language {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.mobile-language label {
  font-size: 0.9rem;
  color: #6b7280;
}
.mobile-language .options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.mobile-language .options button {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(229, 231, 235, 0.8);
  background: #fff;
  cursor: pointer;
}
.mobile-language .options button.active {
  border-color: #fbbf24;
  background: #fef3c7;
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.actions .order {
  flex: 1;
  text-align: center;
}
</style>
