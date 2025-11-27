<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { i18n } from '@/i18n'

const { t, locale } = useI18n()
const currentYear = new Date().getFullYear()
const languages = ['English', 'Arabic', 'French']

interface FooterMessages {
  readyToOrder: string
  deliveryDescription: string
  orderOnWhatsApp: string
  browseMenu: string
  brandDescription: string
  stayUpdated: string
  emailPlaceholder: string
  subscribe: string
  followUs: string
  browse: string
  allItems: string
  moroccan: string
  fastFood: string
  pizzas: string
  pastas: string
  company: string
  aboutUs: string
  contact: string
  language: string
  copyright: string
  privacy: string
  terms: string
  cookies: string
}

const footerMessages = computed<FooterMessages>(() => {
  try {
    const currentLocale = locale.value
    const messages = i18n.global.messages.value
    const localeMessages = messages[currentLocale as keyof typeof messages]
    return (
      localeMessages?.footer || {
        readyToOrder: 'Ready to order?',
        deliveryDescription: 'Get your favorite dishes delivered',
        orderOnWhatsApp: 'Order on WhatsApp',
        browseMenu: 'Browse Menu',
        brandDescription: 'Restaurant description',
        stayUpdated: 'Stay updated',
        emailPlaceholder: 'Your email address',
        subscribe: 'Subscribe',
        followUs: 'Follow us',
        browse: 'Browse',
        allItems: 'All Items',
        moroccan: 'Moroccan',
        fastFood: 'Fast Food',
        pizzas: 'Pizzas',
        pastas: 'Pastas',
        company: 'Company',
        aboutUs: 'About Us',
        contact: 'Contact',
        language: 'Language',
        copyright: `© ${currentYear} Restaurant`,
        privacy: 'Privacy',
        terms: 'Terms',
        cookies: 'Cookies',
      }
    )
  } catch (error) {
    console.error('Error retrieving footer messages:', error)
    return {
      readyToOrder: 'Ready to order?',
      deliveryDescription: 'Get your favorite dishes delivered',
      orderOnWhatsApp: 'Order on WhatsApp',
      browseMenu: 'Browse Menu',
      brandDescription: 'Restaurant description',
      stayUpdated: 'Stay updated',
      emailPlaceholder: 'Your email address',
      subscribe: 'Subscribe',
      followUs: 'Follow us',
      browse: 'Browse',
      allItems: 'All Items',
      moroccan: 'Moroccan',
      fastFood: 'Fast Food',
      pizzas: 'Pizzas',
      pastas: 'Pastas',
      company: 'Company',
      aboutUs: 'About Us',
      contact: 'Contact',
      language: 'Language',
      copyright: `© ${currentYear} Restaurant`,
      privacy: 'Privacy',
      terms: 'Terms',
      cookies: 'Cookies',
    }
  }
})
</script>

<template>
  <footer class="relative bg-[var(--vt-c-red-dark)] overflow-hidden">
    <!-- Arch shape background -->
    <div
      class="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-neutral-50 to-transparent"
    ></div>

    <!-- Main content -->
    <div class="relative">
      <!-- Top CTA Banner -->
      <div class="bg-[#ffc041]">
        <div
          class="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h3 class="text-xl font-bold text-neutral-900">{{ footerMessages.readyToOrder }}</h3>
            <p class="text-neutral-800">
              {{ footerMessages.deliveryDescription }}
            </p>
          </div>
          <div class="flex gap-3">
            <a
              href="https://wa.me/212719861012"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-neutral-900 font-semibold hover:bg-neutral-100 transition-colors"
            >
              <span>{{ footerMessages.orderOnWhatsApp }}</span>
            </a>
            <a
              href="/menu"
              class="inline-flex items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-white font-semibold hover:bg-white hover:text-neutral-900 transition-colors"
            >
              <span>{{ footerMessages.browseMenu }}</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Main footer content -->
      <div class="footer-content">
        <div class="footer-grid">
          <!-- Brand section -->
          <div class="brand-section">
            <div class="brand-card">
              <div class="brand-logo-container">
                <img
                  src="@/assets/images/logo.jpg"
                  alt="Mr. Crispo Logo"
                  class="brand-logo-image"
                />
                <div class="brand-logo">Mr. Crispo</div>
              </div>
              <p class="brand-description">
                {{ footerMessages.brandDescription }}
              </p>

              <!-- Newsletter -->
              <div class="newsletter-card">
                <h4 class="newsletter-title">{{ footerMessages.stayUpdated }}</h4>
                <form class="newsletter-form" @submit.prevent>
                  <input
                    type="email"
                    :placeholder="footerMessages.emailPlaceholder"
                    class="newsletter-input"
                  />
                  <button class="newsletter-btn">{{ footerMessages.subscribe }}</button>
                </form>
              </div>

              <!-- Social & App -->
              <div class="social-section">
                <div class="social-card">
                  <h4 class="social-title">{{ footerMessages.followUs }}</h4>
                  <div class="social-links">
                    <a href="https://www.instagram.com/mrcrispo/" class="social-link">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                        />
                      </svg>
                    </a>
                    <a href="#" class="social-link">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                        />
                      </svg>
                    </a>
                    <a href="#" class="social-link">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Link columns -->
          <div class="links-section">
            <div class="link-card">
              <h4 class="link-title">{{ footerMessages.browse }}</h4>
              <ul class="link-list">
                <li>
                  <a href="/menu" class="link-item">{{ footerMessages.allItems }}</a>
                </li>
                <li>
                  <a href="/menu" class="link-item">{{ footerMessages.moroccan }}</a>
                </li>
                <li>
                  <a href="/menu" class="link-item">{{ footerMessages.fastFood }}</a>
                </li>
                <li>
                  <a href="/menu" class="link-item">{{ footerMessages.pizzas }}</a>
                </li>
                <li>
                  <a href="/menu" class="link-item">{{ footerMessages.pastas }}</a>
                </li>
              </ul>
            </div>
            <div class="link-card">
              <h4 class="link-title">{{ footerMessages.company }}</h4>
              <ul class="link-list">
                <li>
                  <a href="/about" class="link-item">{{ footerMessages.aboutUs }}</a>
                </li>
                <li>
                  <a href="/contact" class="link-item">{{ footerMessages.contact }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Language selector -->
        <div class="mt-12 pt-8 border-t border-neutral-800">
          <div class="flex flex-wrap items-center gap-4">
            <span class="text-sm text-neutral-400">{{ footerMessages.language }}:</span>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="lang in languages"
                :key="lang"
                class="rounded-full border border-neutral-600 px-3 py-1 text-sm text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
              >
                {{ lang }}
              </button>
            </div>
          </div>
        </div>

        <!-- Legal bar -->
        <div
          class="mt-8 pt-6 border-t border-neutral-800 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-sm text-neutral-400"
        >
          <p>{{ footerMessages.copyright }}</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-white transition-colors">{{ footerMessages.privacy }}</a>
            <a href="#" class="hover:text-white transition-colors">{{ footerMessages.terms }}</a>
            <a href="#" class="hover:text-white transition-colors">{{ footerMessages.cookies }}</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Footer Content */
.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem 4rem;
  color: var(--vt-c-white-soft);
}

.footer-grid {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

/* Brand Section */
.brand-section {
  display: flex;
  justify-content: center;
  background-color: var(--vt-c-red-dark);
  border-radius: 1rem;
}

.brand-card {
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  max-width: 500px;
  color: var(--vt-c-white-soft);
}

.brand-logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.brand-logo-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid var(--vt-c-white);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.brand-logo {
  font-family: var(--font-secondary);
  font-size: 2.5rem;
  font-weight: 400;
  color: var(--vt-c-white);
  text-transform: uppercase;
  margin-left: 1rem;
}

.brand-description {
  color: var(--vt-c-white-soft);
  line-height: 1.6;
  margin-bottom: 2rem;
}

/* Newsletter Card */
.newsletter-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.newsletter-title {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vt-c-white);
  margin-bottom: 1rem;
}

.newsletter-form {
  display: flex;
  gap: 0.5rem;
}

.newsletter-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0, 0.3);
  color: var(--vt-c-white);
  backdrop-filter: blur(10px);
}

.newsletter-input::placeholder {
  color: var(--vt-c-white-soft);
}

.newsletter-btn {
  padding: 0.75rem 1.5rem;
  background: var(--vt-c-white);
  color: var(--vt-c-red);
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.newsletter-btn:hover {
  background: var(--vt-c-white-soft);
  transform: translateY(-1px);
}

/* Social Section */
.social-section {
  margin-top: 1rem;
}

.social-card {
  padding: 1.5rem;
}

.social-title {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vt-c-white-soft);
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: var(--vt-c-white);
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.social-link:hover {
  background: var(--vt-c-white);
  color: var(--vt-c-red);
  transform: translateY(-2px);
}

/* Links Section */
.links-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.link-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.link-title {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vt-c-white-soft);
  margin-bottom: 1rem;
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-item {
  display: block;
  color: var(--vt-c-white-soft);
  text-decoration: none;
  padding: 0.5rem 0;
  transition: all 0.2s ease;
  position: relative;
}

.link-item:hover {
  color: var(--vt-c-white);
  transform: translateX(10px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .links-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-content {
    padding: 0 1rem 2rem;
  }

  .brand-card,
  .link-card {
    transform: none;
  }

  .brand-card:hover,
  .link-card:hover {
    transform: scale(1.01);
  }

  .links-section {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .social-links {
    justify-content: center;
  }

  .brand-logo-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .brand-logo {
    margin-left: 0;
    margin-top: 1rem;
  }
}
</style>
