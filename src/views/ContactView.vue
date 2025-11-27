<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n'
import { computed } from 'vue'

const { t, locale } = useI18n()

interface ContactMessages {
  title: string
  subtitle: string
  getInTouch: string
  intro: string
  address: string
  viewOnMap: string
  phone: string
  whatsapp: string
  email: string
  sendEmail: string
  hours: string
  hoursDetail: string
  status: string
  sendMessage: string
  name: string
  namePlaceholder: string
  emailPlaceholder: string
  message: string
  messagePlaceholder: string
  send: string
  sending: string
  successMessage: string
  findUs: string
  mapLabel: string
  mapDescription: string
  openInMaps: string
}

const contactMessages = computed<ContactMessages>(() => {
  try {
    const currentLocale = locale.value
    const messages = i18n.global.messages.value
    const localeMessages = messages[currentLocale as keyof typeof messages]
    return (
      localeMessages?.contact || {
        title: 'Contact Us',
        subtitle: "We'd love to hear from you. Reach out or order now.",
        getInTouch: 'Get in Touch',
        intro:
          "Have a question, feedback, or want to place an order? We're here to help! Choose your preferred way to reach us.",
        address: 'Address',
        viewOnMap: 'View on Map',
        phone: 'Phone / WhatsApp',
        whatsapp: 'Chat on WhatsApp',
        email: 'Email',
        sendEmail: 'Send Email',
        hours: 'Opening Hours',
        hoursDetail: 'Monday - Sunday: 09:00 AM - 02:00 AM',
        status: 'Open Now',
        sendMessage: 'Send us a Message',
        name: 'Name',
        namePlaceholder: 'Your full name',
        emailPlaceholder: 'your.email@example.com',
        message: 'Message',
        messagePlaceholder: 'Tell us how we can help you...',
        send: 'Send Message',
        sending: 'Sending...',
        successMessage: 'Thank you! Your message has been sent successfully.',
        findUs: 'Find Us',
        mapLabel: 'Interactive Map',
        mapDescription:
          'Located in the heart of Dcheira, easily accessible from Inezgane and Eljihadya.',
        openInMaps: 'Open in Google Maps',
      }
    )
  } catch (error) {
    console.error('Error retrieving contact messages:', error)
    return {
      title: 'Contact Us',
      subtitle: "We'd love to hear from you. Reach out or order now.",
      getInTouch: 'Get in Touch',
      intro:
        "Have a question, feedback, or want to place an order? We're here to help! Choose your preferred way to reach us.",
      address: 'Address',
      viewOnMap: 'View on Map',
      phone: 'Phone / WhatsApp',
      whatsapp: 'Chat on WhatsApp',
      email: 'Email',
      sendEmail: 'Send Email',
      hours: 'Opening Hours',
      hoursDetail: 'Monday - Sunday: 09:00 AM - 02:00 AM',
      status: 'Open Now',
      sendMessage: 'Send us a Message',
      name: 'Name',
      namePlaceholder: 'Your full name',
      emailPlaceholder: 'your.email@example.com',
      message: 'Message',
      messagePlaceholder: 'Tell us how we can help you...',
      send: 'Send Message',
      sending: 'Sending...',
      successMessage: 'Thank you! Your message has been sent successfully.',
      findUs: 'Find Us',
      mapLabel: 'Interactive Map',
      mapDescription:
        'Located in the heart of Dcheira, easily accessible from Inezgane and Eljihadya.',
      openInMaps: 'Open in Google Maps',
    }
  }
})

const phone = '+212 624995767'
const address = 'Mr. Crispo Restaurant, HAY AIT SOUAL Dcheira, Agadir, Morocco'
const email = 'info@Mr. Crispo.com'

const formData = ref({
  name: '',
  email: '',
  message: '',
})

const isSubmitting = ref(false)
const submitMessage = ref('')

function handleSubmit() {
  isSubmitting.value = true
  // Simulate form submission
  setTimeout(() => {
    isSubmitting.value = false
    submitMessage.value = contactMessages.value.successMessage
    formData.value = { name: '', email: '', message: '' }
  }, 2000)
}
</script>

<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">{{ contactMessages.title }}</h1>
        <p class="hero-description">
          {{ contactMessages.subtitle }}
        </p>
      </div>
    </section>

    <!-- Contact Info & Form Section -->
    <section class="main-content">
      <div class="container">
        <div class="content-grid">
          <!-- Contact Information -->
          <div class="contact-info">
            <h2>{{ contactMessages.getInTouch }}</h2>
            <p class="contact-intro">
              {{ contactMessages.intro }}
            </p>

            <div class="contact-methods">
              <div class="contact-method">
                <div class="method-visual">
                  <div class="method-placeholder">
                    <div class="method-icon">📍</div>
                  </div>
                </div>
                <div class="method-content">
                  <h3>{{ contactMessages.address }}</h3>
                  <p>{{ address }}</p>
                  <a
                    href="https://maps.google.com/?q=Mr. Crispo+Restaurant+Dcheira+Agadir+Morocco"
                    target="_blank"
                    class="map-link"
                  >
                    {{ contactMessages.viewOnMap }}
                  </a>
                </div>
              </div>

              <div class="contact-method">
                <div class="method-visual">
                  <div class="method-placeholder">
                    <div class="method-icon">📞</div>
                  </div>
                </div>
                <div class="method-content">
                  <h3>{{ contactMessages.phone }}</h3>
                  <p>{{ phone }}</p>
                  <a
                    :href="`https://wa.me/212719861012`"
                    target="_blank"
                    rel="noopener"
                    class="whatsapp-link"
                  >
                    {{ contactMessages.whatsapp }}
                  </a>
                </div>
              </div>

              <div class="contact-method">
                <div class="method-visual">
                  <div class="method-placeholder">
                    <div class="method-icon">✉️</div>
                  </div>
                </div>
                <div class="method-content">
                  <h3>{{ contactMessages.email }}</h3>
                  <p>{{ email }}</p>
                  <a :href="`mailto:${email}`" class="email-link">
                    {{ contactMessages.sendEmail }}
                  </a>
                </div>
              </div>

              <div class="contact-method">
                <div class="method-visual">
                  <div class="method-placeholder">
                    <div class="method-icon">🕒</div>
                  </div>
                </div>
                <div class="method-content">
                  <h3>{{ contactMessages.hours }}</h3>
                  <p>{{ contactMessages.hoursDetail }}</p>
                  <span class="status">{{ contactMessages.status }}</span>
                </div>
              </div>
            </div>

            <!-- Social Links -->
          </div>

          <!-- Contact Form -->
          <div class="contact-form-section">
            <h2>{{ contactMessages.sendMessage }}</h2>
            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-group">
                <label for="name">{{ contactMessages.name }}</label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  :placeholder="contactMessages.namePlaceholder"
                  required
                />
              </div>

              <div class="form-group">
                <label for="email">{{ contactMessages.email }}</label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  :placeholder="contactMessages.emailPlaceholder"
                  required
                />
              </div>

              <div class="form-group">
                <label for="message">{{ contactMessages.message }}</label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  :placeholder="contactMessages.messagePlaceholder"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button type="submit" :disabled="isSubmitting" class="submit-btn">
                <span v-if="isSubmitting">{{ contactMessages.sending }}</span>
                <span v-else>{{ contactMessages.send }}</span>
              </button>

              <div v-if="submitMessage" class="success-message">
                {{ submitMessage }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="map-section">
      <div class="container">
        <h2>{{ contactMessages.findUs }}</h2>
        <div class="map-container">
          <div class="map-visual">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3437.241192028287!2d-9.683244824428124!3d30.514218274690396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdb3b3c826bc00db%3A0xa7dfd3183298d218!2sMr. Crispo%20Restaurant!5e0!3m2!1sen!2sma!4v1761931832952!5m2!1sen!2sma"
              width="100%"
              height="100%"
              style="border: 0"
              :allowfullscreen="true"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="map-iframe"
            ></iframe>
            <div class="map-info">
              <p>{{ contactMessages.mapDescription }}</p>
              <a
                href="https://maps.google.com/?q=Mr. Crispo+Restaurant+Dcheira+Agadir+Morocco"
                target="_blank"
                class="map-button"
              >
                {{ contactMessages.openInMaps }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact-page {
  font-family: var(--font-tertiary);
  min-height: 100vh;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, var(--vt-c-red-light) 0%, var(--vt-c-red) 100%);
  color: white;
  padding: 6rem 1rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.hero-title {
  font-family: var(--font-secondary);
  font-size: 3.5rem;
  font-weight: 400;
  text-transform: uppercase;
  margin-bottom: 2rem;
  line-height: 1.1;
  letter-spacing: 0.05em;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  color: var(--vt-c-white);
}

.hero-description {
  font-size: 1.375rem;
  color: var(--vt-c-white-soft);
  line-height: 1.7;
  font-weight: 400;
}

/* Main Content */
.main-content {
  padding: 6rem 0;
  background: var(--color-background-soft);
  position: relative;
}

.main-content::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-border), transparent);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
}

/* Contact Info */
.contact-info h2 {
  font-family: var(--font-secondary);
  font-size: 2.5rem;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--vt-c-red);
  margin-bottom: 1.5rem;
  letter-spacing: 0.05em;
  position: relative;
}

.contact-info h2::after {
  content: '';
  position: absolute;
  bottom: -0.75rem;
  left: 0;
  width: 60px;
  height: 4px;
  background: var(--vt-c-red);
  border-radius: 2px;
}

.contact-intro {
  font-size: 1.25rem;
  color: var(--color-text);
  margin-bottom: 3rem;
  line-height: 1.7;
  font-weight: 400;
}

.contact-methods {
  display: grid;
  gap: 2rem;
  margin-bottom: 4rem;
}

.contact-method {
  background: var(--color-background);
  border-radius: 1.5rem;
  padding: 0;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: 0;
}

.contact-method:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.method-visual {
  width: 120px;
  height: 120px;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 0 1.5rem 1.5rem 0;
}

.method-placeholder {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.method-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  color: var(--vt-c-white);
}

.method-content {
  padding: 2rem;
  flex: 1;
}

.method-content h3 {
  font-family: var(--font-secondary);
  font-size: 1.375rem;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--color-heading);
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}

.method-content p {
  color: var(--color-text);
  margin-bottom: 1rem;
  line-height: 1.6;
  font-size: 1rem;
}

.map-link,
.whatsapp-link,
.email-link {
  color: var(--vt-c-red);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.map-link:hover,
.whatsapp-link:hover,
.email-link:hover {
  color: var(--vt-c-red-dark);
  transform: translateX(2px);
}

.status {
  display: inline-block;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
}

/* Social Section */

.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-radius: 0.75rem;
  text-decoration: none;
  color: #374151;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
}

.social-link:hover {
  background: #f1f5f9;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Contact Form */
.contact-form-section {
  background: var(--color-background);
  padding: 3rem;
  border-radius: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--color-border);
  position: relative;
  overflow: hidden;
}

.contact-form-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--vt-c-red);
}

.contact-form-section h2 {
  font-family: var(--font-secondary);
  font-size: 2.25rem;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--vt-c-red);
  margin-bottom: 2.5rem;
  letter-spacing: 0.05em;
}

.contact-form {
  display: grid;
  gap: 2rem;
}

.form-group {
  display: grid;
  gap: 0.75rem;
}

.form-group label {
  font-weight: 600;
  color: var(--color-heading);
  font-size: 1rem;
}

.form-group input,
.form-group textarea {
  padding: 1rem 1.25rem;
  border: 2px solid var(--color-border);
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: var(--color-background-soft);
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--vt-c-red);
  background: var(--color-background);
  box-shadow: 0 0 0 4px rgba(205, 0, 27, 0.1);
  transform: translateY(-1px);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  background: linear-gradient(135deg, var(--vt-c-red-light), var(--vt-c-red));
  color: var(--color-background);
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 0.75rem;
  font-family: var(--font-secondary);
  font-size: 1rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  justify-self: start;
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.submit-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--vt-c-red), var(--vt-c-red-dark));
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(205, 0, 27, 0.3);
}

.submit-btn:hover:not(:disabled)::before {
  left: 100%;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.success-message {
  background: linear-gradient(135deg, #d1fae5, #a7f3d0);
  color: #065f46;
  padding: 1.25rem;
  border-radius: 0.75rem;
  font-weight: 600;
  border: 1px solid #a7f3d0;
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.1);
}

/* Map Section */
.map-section {
  padding: 6rem 0;
  background: var(--vt-c-red-dark);
  color: var(--vt-c-white);
  position: relative;
  overflow: hidden;
}

.map-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>');
  opacity: 0.3;
}

.map-section h2 {
  font-family: var(--font-secondary);
  font-size: 2.5rem;
  font-weight: 400;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 3rem;
  letter-spacing: 0.05em;
  position: relative;
  z-index: 2;
  color: var(--vt-c-white);
}

.map-container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.map-visual {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1.5rem;
  padding: 3rem;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.map-iframe {
  width: 100%;
  height: 400px;
  min-height: 300px;
  border-radius: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.map-info {
  text-align: center;
}

.map-info p {
  font-size: 1.25rem;
  color: var(--vt-c-white-soft);
  margin-bottom: 2rem;
  line-height: 1.7;
}

.map-button {
  display: inline-block;
  background: linear-gradient(135deg, var(--vt-c-red-light), var(--vt-c-red));
  color: var(--vt-c-white);
  padding: 1rem 2.5rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-family: var(--font-secondary);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.map-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.map-button:hover {
  background: linear-gradient(135deg, var(--vt-c-red), var(--vt-c-red-dark));
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(205, 0, 27, 0.3);
}

.map-button:hover::before {
  left: 100%;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .hero {
    padding: 4rem 1rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.125rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .contact-method {
    flex-direction: column;
    text-align: center;
  }

  .method-visual {
    width: 100%;
    height: 100px;
    border-radius: 1.5rem 1.5rem 0 0;
  }

  .method-placeholder {
    width: 60px;
    height: 60px;
  }

  .method-icon {
    font-size: 2rem;
  }

  .map-visual {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
  }

  .map-iframe {
    height: 300px;
    min-height: 250px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .map-visual {
    padding: 1.5rem;
  }

  .map-iframe {
    height: 250px;
    min-height: 200px;
  }
}
</style>
