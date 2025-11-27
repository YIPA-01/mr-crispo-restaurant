<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n'

const { t, locale } = useI18n()

interface AboutMessages {
  title: string
  description: string
  cities: string
  happyCustomers: string
  rating: string
  restaurantImage: string
  ourStory: string
  storyText: string
  authenticCuisine: string
  authenticCuisineDesc: string
  fastService: string
  fastServiceDesc: string
  freeDelivery: string
  freeDeliveryDesc: string
  mission: string
  missionText: string
  quality: string
  qualityDesc: string
  tradition: string
  traditionDesc: string
  community: string
  communityDesc: string
  openingHours: string
  hours: string
  location: string
  locationDesc: string
  contact: string
  contactDesc: string
}

const aboutMessages = computed<AboutMessages>(() => {
  try {
    const currentLocale = locale.value
    const messages = i18n.global.messages.value
    const localeMessages = messages[currentLocale as keyof typeof messages]
    return (
      localeMessages?.about || {
        title: 'About Mr. Crispo',
        description:
          'Authentic Moroccan cuisine with a modern twist, serving delicious meals in the heart of Dcheira.',
        cities: 'Cities',
        happyCustomers: 'Happy Customers',
        rating: 'Rating',
        restaurantImage: 'Our Restaurant',
        ourStory: 'Our Story',
        storyText:
          'Founded with passion, Mr. Crispo began as a small family-run establishment in the vibrant coastal village of Dcheira. Our journey started with a simple mission: to share the rich, authentic flavors of Moroccan cuisine with locals and travelers alike.',
        authenticCuisine: 'Authentic Cuisine',
        authenticCuisineDesc:
          'We pride ourselves on using traditional recipes and locally sourced ingredients to create genuine Moroccan dishes.',
        fastService: 'Fast Service',
        fastServiceDesc:
          'Quick, efficient, and friendly service ensures you enjoy your meal without unnecessary waiting.',
        freeDelivery: 'Free Delivery',
        freeDeliveryDesc:
          'Enjoy free delivery within Dcheira and nearby areas, bringing delicious meals right to your doorstep.',
        mission: 'Our Mission',
        missionText:
          'To provide an exceptional dining experience that celebrates the rich culinary heritage of Morocco, while embracing modern tastes and sustainable practices.',
        quality: 'Quality',
        qualityDesc:
          'We are committed to using the freshest ingredients and maintaining the highest standards of food preparation.',
        tradition: 'Tradition',
        traditionDesc:
          'Our recipes are rooted in generations of family cooking, preserving the authentic flavors of Moroccan cuisine.',
        community: 'Community',
        communityDesc:
          'We support local farmers and producers, contributing to the economic growth of our community.',
        openingHours: 'Opening Hours',
        hours: 'Monday - Sunday: 09:00 AM - 02:00 AM',
        location: 'Location',
        locationDesc: 'HAY AIT SOUAL Dcheira, Agadir, Morocco',
        contact: 'Contact',
        contactDesc: '+212 624995767 | info@Mr. Crispo.com',
      }
    )
  } catch (error) {
    console.error('Error retrieving about messages:', error)
    // Fallback to default messages
    return {
      title: 'About Mr. Crispo',
      description:
        'Authentic Moroccan cuisine with a modern twist, serving delicious meals in the heart of Dcheira.',
      cities: 'Cities',
      happyCustomers: 'Happy Customers',
      rating: 'Rating',
      restaurantImage: 'Our Restaurant',
      ourStory: 'Our Story',
      storyText:
        'Founded with passion, Mr. Crispo began as a small family-run establishment in the vibrant coastal village of Dcheira. Our journey started with a simple mission: to share the rich, authentic flavors of Moroccan cuisine with locals and travelers alike.',
      authenticCuisine: 'Authentic Cuisine',
      authenticCuisineDesc:
        'We pride ourselves on using traditional recipes and locally sourced ingredients to create genuine Moroccan dishes.',
      fastService: 'Fast Service',
      fastServiceDesc:
        'Quick, efficient, and friendly service ensures you enjoy your meal without unnecessary waiting.',
      freeDelivery: 'Free Delivery',
      freeDeliveryDesc:
        'Enjoy free delivery within Dcheira and nearby areas, bringing delicious meals right to your doorstep.',
      mission: 'Our Mission',
      missionText:
        'To provide an exceptional dining experience that celebrates the rich culinary heritage of Morocco, while embracing modern tastes and sustainable practices.',
      quality: 'Quality',
      qualityDesc:
        'We are committed to using the freshest ingredients and maintaining the highest standards of food preparation.',
      tradition: 'Tradition',
      traditionDesc:
        'Our recipes are rooted in generations of family cooking, preserving the authentic flavors of Moroccan cuisine.',
      community: 'Community',
      communityDesc:
        'We support local farmers and producers, contributing to the economic growth of our community.',
      openingHours: 'Opening Hours',
      hours: 'Monday - Sunday: 09:00 AM - 02:00 AM',
      location: 'Location',
      locationDesc: 'HAY AIT SOUAL Dcheira, Agadir, Morocco',
      contact: 'Contact',
      contactDesc: '+212 624995767 | info@Mr. Crispo.com',
    }
  }
})

// Images
const heroBackgroundImage =
  'https://images.unsplash.com/photo-1695606453524-523a606f0293?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fm=jpg&q=60&w=3000'
const chefImage =
  'https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fm=jpg&q=60&w=3000'

// Computed property for CSS background image
const heroBackgroundImageStyle = computed(() => {
  return heroBackgroundImage ? `url(${heroBackgroundImage})` : 'none'
})
</script>

<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">{{ aboutMessages.title }}</h1>
          <p class="hero-description">
            {{ aboutMessages.description }}
          </p>
        </div>
        <div class="hero-stats">
          <div class="stat">
            <span class="stat-number">3+</span>
            <span class="stat-label">{{ aboutMessages.cities }}</span>
          </div>
          <div class="stat">
            <span class="stat-number">500+</span>
            <span class="stat-label">{{ aboutMessages.happyCustomers }}</span>
          </div>
          <div class="stat">
            <span class="stat-number">5★</span>
            <span class="stat-label">{{ aboutMessages.rating }}</span>
          </div>
        </div>
      </div>
      <div class="hero-image">
        <div class="image-container">
          <img :src="chefImage" alt="Chef" class="chef-image" />
        </div>
      </div>
    </section>

    <!-- Our Story Section -->
    <section class="story-section">
      <div class="container">
        <div class="story-content">
          <h2 class="section-title">{{ aboutMessages.ourStory }}</h2>
          <p class="story-text">
            {{ aboutMessages.storyText }}
          </p>
          <div class="story-features">
            <div class="feature">
              <div class="feature-content">
                <h3>{{ aboutMessages.authenticCuisine }}</h3>
                <p>{{ aboutMessages.authenticCuisineDesc }}</p>
              </div>
            </div>
            <div class="feature">
              <div class="feature-content">
                <h3>{{ aboutMessages.fastService }}</h3>
                <p>{{ aboutMessages.fastServiceDesc }}</p>
              </div>
            </div>
            <div class="feature">
              <div class="feature-content">
                <h3>{{ aboutMessages.freeDelivery }}</h3>
                <p>{{ aboutMessages.freeDeliveryDesc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission-section">
      <div class="container">
        <div class="mission-content">
          <h2 class="section-title">{{ aboutMessages.mission }}</h2>
          <p class="mission-text">
            {{ aboutMessages.missionText }}
          </p>
          <div class="mission-values">
            <div class="value">
              <div class="value-content">
                <h4>{{ aboutMessages.quality }}</h4>
                <p>{{ aboutMessages.qualityDesc }}</p>
              </div>
            </div>
            <div class="value">
              <div class="value-content">
                <h4>{{ aboutMessages.tradition }}</h4>
                <p>{{ aboutMessages.traditionDesc }}</p>
              </div>
            </div>
            <div class="value">
              <div class="value-content">
                <h4>{{ aboutMessages.community }}</h4>
                <p>{{ aboutMessages.communityDesc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Info Section -->
    <section class="info-section">
      <div class="container">
        <div class="info-grid">
          <div class="info-card">
            <h3>{{ aboutMessages.openingHours }}</h3>
            <p>{{ aboutMessages.hours }}</p>
          </div>
          <div class="info-card">
            <h3>{{ aboutMessages.location }}</h3>
            <p>{{ aboutMessages.locationDesc }}</p>
          </div>
          <div class="info-card">
            <h3>{{ aboutMessages.contact }}</h3>
            <p>{{ aboutMessages.contactDesc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-page {
  font-family: var(--font-tertiary);
  color: var(--color-text);
  line-height: 1.6;
}

/* Hero Section */
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, var(--vt-c-red-light) 0%, var(--vt-c-red) 100%);
  color: var(--vt-c-white);
}

.hero-content {
  max-width: 600px;
}

.hero-title {
  font-family: var(--font-secondary);
  font-size: 3rem;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--vt-c-white);
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.hero-description {
  font-size: 1.25rem;
  color: var(--vt-c-white-soft);
  margin-bottom: 2rem;
}

.hero-stats {
  display: flex;
  gap: 2rem;
}

.stat {
  text-align: center;

  padding: 1.5rem;

  transition: transform 0.3s ease;
}

.stat:hover {
  transform: translateY(-5px);
}

.stat-number {
  display: block;
  font-family: var(--font-secondary);
  font-size: 2.5rem;
  font-weight: 400;
  color: var(--vt-c-white);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--vt-c-white-soft);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-image {
  display: flex;
  justify-content: center;
}

.image-container {
  max-width: 500px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.3);
  transition: transform 0.4s ease;
}

.image-container:hover {
  transform: scale(1.02);
}

.chef-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

/* Sections */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-title {
  font-family: var(--font-secondary);
  font-size: 2.5rem;
  font-weight: 400;
  text-align: center;
  margin-bottom: 2rem;
  color: var(--vt-c-red);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: var(--vt-c-red);
  border-radius: 2px;
}

.story-section,
.mission-section {
  padding: 6rem 0;
  background: var(--color-background-soft);
}

.story-text,
.mission-text {
  max-width: 800px;
  margin: 0 auto 3rem;
  text-align: center;
  font-size: 1.125rem;
  color: var(--color-text);
}

.story-features,
.mission-values {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.feature,
.value {
  background: var(--color-background);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.feature:hover,
.value:hover {
  transform: translateY(-10px);
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.feature h3,
.value h4 {
  font-family: var(--font-secondary);
  font-size: 1.25rem;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--vt-c-red);
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.feature p,
.value p {
  color: var(--color-text);
}

.info-section {
  background: var(--vt-c-red-dark);
  color: var(--vt-c-white);
  padding: 6rem 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.info-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  transition: background 0.3s ease;
}

.info-card:hover {
  background: rgba(255, 255, 255, 0.15);
}

.info-card h3 {
  font-family: var(--font-secondary);
  font-size: 1.25rem;
  font-weight: 400;
  text-transform: uppercase;
  margin-bottom: 1rem;
  color: var(--vt-c-white);
  letter-spacing: 0.05em;
}

.info-card p {
  color: var(--vt-c-white-soft);
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero,
  .story-features,
  .mission-values,
  .info-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    gap: 2rem;
    text-align: center;
    padding: 4rem 1rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.125rem;
  }

  .hero-stats {
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-image {
    order: -1;
  }

  .section-title {
    font-size: 2rem;
  }

  .story-text,
  .mission-text {
    font-size: 1rem;
  }
}
</style>
