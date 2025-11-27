<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n'
import { computed } from 'vue'
import MenuSection from '@/components/MenuSection.vue'
import MenuSection_v2 from '@/components/MenuSection_v2.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'

const { t, locale } = useI18n()

interface HomeMessages {
  restaurant: string
  heroTitle: string
  heroDescription: string
  whatsapp: string
  exploreMenu: string
  freeDelivery: string
  openHours: string
  burgerAlt: string
  menuTitle: string
}

const homeMessages = computed<HomeMessages>(() => {
  try {
    const currentLocale = locale.value
    const messages = i18n.global.messages.value
    const localeMessages = messages[currentLocale as keyof typeof messages]
    return (
      localeMessages?.home || {
        restaurant: 'Top Rated Restaurant',
        heroTitle: 'Delicious Moroccan Cuisine in Dcheira',
        heroDescription:
          'Experience authentic flavors, fresh ingredients, and a warm atmosphere at Mr. Crispo.',
        whatsapp: 'Order on WhatsApp',
        exploreMenu: 'Explore Menu',
        freeDelivery: 'Free Delivery',
        openHours: 'Open 9 AM - 2 AM',
        burgerAlt: 'Delicious Burger',
        menuTitle: 'Our Menu',
      }
    )
  } catch (error) {
    console.error('Error retrieving home messages:', error)
    return {
      restaurant: 'Top Rated Restaurant',
      heroTitle: 'Delicious Moroccan Cuisine in Dcheira',
      heroDescription:
        'Experience authentic flavors, fresh ingredients, and a warm atmosphere at Mr. Crispo.',
      whatsapp: 'Order on WhatsApp',
      exploreMenu: 'Explore Menu',
      freeDelivery: 'Free Delivery',
      openHours: 'Open 9 AM - 2 AM',
      burgerAlt: 'Delicious Burger',
      menuTitle: 'Our Menu',
    }
  }
})
</script>

<template>
  <section class="hero">
    <div class="hero__container">
      <div class="hero__content">
        <p class="eyebrow">★★★★★ {{ homeMessages.restaurant }}</p>
        <h1>{{ homeMessages.heroTitle }}</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="201" height="24" viewBox="0 0 201 24" fill="currentColor" color="var(--color-primary-main)"><path d="M200.375 20.4207C200.157 21.4381 199.231 21.6017 198.341 21.6198C195.399 21.6744 188.045 19.1852 184.105 18.7128C155.541 15.3696 120.622 17.6226 91.6952 19.2396C70.8672 20.4025 47.9872 23.9818 27.4679 24C25.8336 24 21.3847 23.6184 19.8049 23.3641C18.7335 23.1824 18.4975 22.9462 18.334 21.8924C18.1161 20.5115 18.9333 21.1111 19.8231 21.0202C25.4159 20.4388 30.9362 18.84 36.4383 17.5863L37.782 18.6401L23.6545 22.1831C34.0595 23.037 44.2828 21.1111 54.5788 20.4207C91.7134 17.9315 133.17 14.2795 170.068 16.2599C180.328 16.805 190.369 18.2949 200.375 20.4207Z"></path><path d="M173.863 2.12434C172.992 3.269 169.777 2.17885 168.797 2.17885C144.555 2.05167 119.532 3.81407 95.2179 5.06774C75.0072 6.10338 54.6514 7.37523 34.5497 9.79173C23.6 11.1181 12.4687 12.7715 1.84591 15.6785L5.96796 18.6038C4.53343 18.6401 2.66308 18.2767 1.42829 17.5499C-2.47583 15.2606 2.64492 14.0796 4.66054 13.4619C10.3624 11.7176 18.0435 10.7365 24.0358 9.86442C66.3456 3.74142 109.218 3.81408 151.746 0.30743C157.884 1.12504 166.582 -0.728232 172.392 0.343748C173.282 0.50727 174.426 1.36122 173.863 2.10616V2.12434Z"></path></svg>
        <p class="sub">
          {{ homeMessages.heroDescription }}
        </p>
        <div class="cta">
          <a class="btn primary" href="https://wa.me/212719861012" target="_blank" rel="noopener">
            {{ homeMessages.whatsapp }}
          </a>
          <RouterLink class="btn ghost" :to="'/menu'">
            {{ homeMessages.exploreMenu }}
          </RouterLink>
        </div>
        <div class="hero__meta">
          <span>{{ homeMessages.freeDelivery }}</span>
          <span>{{ homeMessages.openHours }}</span>
        </div>
      </div>
      <div class="hero__image">
        <img
          src="/src/assets/images/hero.png"
          :alt="homeMessages.burgerAlt"
          class="burger-animation"
        />
        
      </div>
      
    </div>
  </section>
  
  <MenuSection :title="homeMessages.menuTitle" :enable-filters="true" class="wave-background" /> 
  <MenuSection_v2 :title="homeMessages.menuTitle" :enable-filters="true" />

  <TestimonialsSection />
</template>

<style scoped>
.wave-background {
  background-color: var(--vt-c-red);
  background-size: cover;
  background-repeat: no-repeat;
}
.hero {
  min-height: 55vh;
  padding: 2rem 1.25rem;
}

.hero__container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;
}

.hero__content {
  max-width: 600px;
}

.hero__image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.burger-animation {
  max-width: 100%;
  height: auto;
  animation: spin-burst 70s cubic-bezier(0.33, 1, 0.68, 1) infinite;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.1));
}

@keyframes spin-burst {
  0% {
    transform: rotate(0deg);
  }
  80% {
    transform: rotate(1080deg); /* 3 full spins fast */
  }
  100% {
    transform: rotate(1080deg); /* Ends at 3 full spins, slows to stop */
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@media (max-width: 768px) {
  .hero__container {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero__image {
    order: -1;
  }

  .cta {
    justify-content: center;
  }

  .hero__meta {
    justify-content: center;
  }
}

.eyebrow {
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.9;
}

h1 {
  margin-top: 0.5rem;
  font-size: clamp(2rem, 5vw, 3.25rem);
  line-height: 1.15;
  font-weight: 800;
}

.sub {
  margin-top: 0.75rem;
  max-width: 60ch;
  opacity: 0.95;
}

.cta {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.btn.primary {
  background: var(--vt-c-red);
  color: var(--vt-c-white);
  border-color: #f59e0b;
}
.btn.ghost {
  background: #ffffff;
  color: #111827;
}

.hero__meta {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  opacity: 0.9;
  font-size: 0.95rem;
}
</style>
