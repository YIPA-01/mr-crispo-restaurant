<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { i18n } from '@/i18n'

const { t, locale } = useI18n()

interface Review {
  id?: number
  name: string
  text: string
  date: string
  rating: number
}

interface LocaleMessages {
  testimonials?: {
    reviews?: Review[]
    title?: string
    subtitle?: string
  }
}

const testimonialMessages = computed(() => {
  try {
    const currentLocale = locale.value
    const messages = i18n.global.messages.value
    const localeMessages = messages[currentLocale as keyof typeof messages] as LocaleMessages
    return localeMessages?.testimonials || {}
  } catch (error) {
    console.error('Error retrieving testimonial messages:', error)
    return {}
  }
})

const testimonials = computed<Review[]>(() => {
  try {
    const reviews = testimonialMessages.value.reviews || []

    return Array.isArray(reviews)
      ? reviews.map((review, index) => ({
          id: index + 1,
          name: review.name || `Reviewer ${index + 1}`,
          text: review.text || 'No review text',
          date: review.date || '2025-01-01',
          rating: review.rating || 5,
        }))
      : [
          {
            id: 1,
            name: 'Délices Amazigh',
            text: 'A true delight. Moroccan cuisine in all its splendor. Impeccable service and hygiene worthy of a great restaurant.',
            date: '2025-04-25',
            rating: 5,
          },
          {
            id: 2,
            name: 'Lucabrando Sanfilippo',
            text: 'Hands down the best restaurant in Dcheira. Been remote working here for 2 weeks and have tried it all, this is the best place with great price quality ratio.',
            date: '2025-04-22',
            rating: 5,
          },
          {
            id: 3,
            name: 'Serena Malaspina',
            text: 'Amazing food, lots of variety, super kind staff (Mohamed is the best 😍) - a must try in town!!!',
            date: '2025-04-22',
            rating: 5,
          },
          {
            id: 4,
            name: 'Steven Hall',
            text: 'This was the cheapest meal we had on holiday. The food and service were really good. Well worth a visit.',
            date: '2025-04-22',
            rating: 5,
          },
        ]
  } catch (error) {
    console.error('Error processing testimonials:', error)
    return []
  }
})
</script>

<template>
  <section class="testimonials-section">
    <div class="testimonials-container">
      <div class="testimonials-header">
        <h2 class="text-4xl font-bold mb-4">{{ testimonialMessages.title }}</h2>
        <p class="text-neutral-600 text-lg">{{ testimonialMessages.subtitle }}</p>
      </div>

      <div class="testimonials-grid">
        <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
          <div class="testimonial-content">
            <div class="testimonial-header">
              <div class="stars">
                <span v-for="i in testimonial.rating" :key="i" class="star">★</span>
              </div>
              <span class="date">{{ testimonial.date }}</span>
            </div>
            <blockquote class="testimonial-text">"{{ testimonial.text }}"</blockquote>
            <div class="testimonial-author">{{ testimonial.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  padding: 4rem 1rem;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  position: relative;
  overflow: hidden;
}

.testimonials-container {
  max-width: 1200px;
  margin: 0 auto;
}

.testimonials-header {
  text-align: center;
  margin-bottom: 3rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  transform: rotate(-1deg);
  background: white;
  position: relative;
}

.testimonial-card:nth-child(even) {
  transform: rotate(1deg);
}

.testimonial-card:nth-child(3n) {
  transform: rotate(2deg);
}

.testimonial-card:nth-child(4n) {
  transform: rotate(-2deg);
}

.testimonial-card:hover {
  transform: rotate(0deg) scale(1.05);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.testimonial-content {
  padding: 1.5rem;
  position: relative;
}

.testimonial-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.stars {
  display: flex;
  gap: 0.25rem;
}

.star {
  color: #fbbf24;
  font-size: 1.1rem;
  animation: twinkle 2s ease-in-out infinite;
}

.star:nth-child(2) {
  animation-delay: 0.2s;
}

.star:nth-child(3) {
  animation-delay: 0.4s;
}

.star:nth-child(4) {
  animation-delay: 0.6s;
}

.star:nth-child(5) {
  animation-delay: 0.8s;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}

.date {
  font-size: 0.8rem;
  color: #6b7280;
  font-weight: 500;
}

.testimonial-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #374151;
  margin-bottom: 1.5rem;
  font-style: italic;
  position: relative;
}

.testimonial-text::before {
  content: '"';
  font-size: 3rem;
  color: #fbbf24;
  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
  font-family: serif;
  opacity: 0.3;
}

.testimonial-author {
  font-weight: 700;
  color: #111827;
  font-size: 1.1rem;
  position: relative;
}

.testimonial-author::before {
  content: '—';
  color: #fbbf24;
  margin-right: 0.5rem;
  font-weight: 900;
}

/* Responsive Design */
@media (max-width: 768px) {
  .testimonials-section {
    padding: 2rem 1rem;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .testimonial-card {
    transform: none;
  }

  .testimonial-card:nth-child(even),
  .testimonial-card:nth-child(3n),
  .testimonial-card:nth-child(4n) {
    transform: none;
  }

  .testimonial-card:hover {
    transform: scale(1.02);
  }

  .testimonials-header h2 {
    font-size: 2.5rem;
  }
}
</style>
