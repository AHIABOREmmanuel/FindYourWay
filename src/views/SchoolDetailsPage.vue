<template>
  <div class="school-details-page">
    <!-- Loading state -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Chargement des informations...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-state">
      <i class="fas fa-exclamation-circle"></i>
      <p>{{ error }}</p>
      <button @click="retryLoading" class="retry-button">
        Réessayer
      </button>
    </div>

    <!-- Content -->
    <div v-else>
      <!-- Hero section -->
      <section class="hero" :style="{ backgroundImage: `url(${school.coverImage})` }">
        <div class="hero-content">
          <h1>{{ school.name }}</h1>
          <div class="hero-meta">
            <span class="location">
              <i class="fas fa-map-marker-alt"></i>
              {{ school.city }}, {{ school.country }}
            </span>
            <span class="type">
              <i class="fas fa-university"></i>
              {{ school.type }}
            </span>
          </div>
        </div>
      </section>

      <!-- Quick facts -->
      <section class="quick-facts">
        <div class="container">
          <div class="facts-grid">
            <div class="fact-card">
              <i class="fas fa-users"></i>
              <h3>Étudiants</h3>
              <p>{{ school.studentCount }}</p>
            </div>
            <div class="fact-card">
              <i class="fas fa-graduation-cap"></i>
              <h3>Programmes</h3>
              <p>{{ school.programCount }}</p>
            </div>
            <div class="fact-card">
              <i class="fas fa-globe"></i>
              <h3>International</h3>
              <p>{{ school.internationalStudents }}%</p>
            </div>
            <div class="fact-card">
              <i class="fas fa-star"></i>
              <h3>Classement</h3>
              <p>#{{ school.ranking }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Main content -->
      <section class="main-content">
        <div class="container">
          <div class="content-grid">
            <!-- Left column -->
            <div class="content-main">
              <div class="content-section">
                <h2>À propos</h2>
                <p>{{ school.description }}</p>
              </div>

              <div class="content-section">
                <h2>Programmes</h2>
                <div class="programs-grid">
                  <div v-for="program in school.programs" :key="program.id" class="program-card">
                    <h3>{{ program.name }}</h3>
                    <p>{{ program.description }}</p>
                    <span class="duration">{{ program.duration }}</span>
                  </div>
                </div>
              </div>

              <div class="content-section">
                <h2>Vie étudiante</h2>
                <div class="campus-life-grid">
                  <div class="campus-image" v-for="image in school.campusImages" :key="image.id">
                    <img :src="image.url" :alt="image.alt">
                  </div>
                </div>
              </div>
            </div>

            <!-- Right sidebar -->
            <div class="content-sidebar">
              <div class="sidebar-card contact-info">
                <h3>Contact</h3>
                <ul>
                  <li>
                    <i class="fas fa-phone"></i>
                    {{ school.phone }}
                  </li>
                  <li>
                    <i class="fas fa-envelope"></i>
                    {{ school.email }}
                  </li>
                  <li>
                    <i class="fas fa-map-marked-alt"></i>
                    {{ school.address }}
                  </li>
                </ul>
              </div>

              <div class="sidebar-card application-dates">
                <h3>Dates importantes</h3>
                <ul>
                  <li v-for="date in school.importantDates" :key="date.id">
                    <span class="date">{{ date.date }}</span>
                    <span class="event">{{ date.event }}</span>
                  </li>
                </ul>
              </div>

              <button class="cta-button">
                Postuler maintenant
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="testimonials">
        <div class="container">
          <h2>Témoignages d'étudiants</h2>
          <div class="testimonials-grid">
            <div v-for="testimonial in school.testimonials" :key="testimonial.id" class="testimonial-card">
              <div class="testimonial-content">
                <p>"{{ testimonial.content }}"</p>
              </div>
              <div class="testimonial-author">
                <img :src="testimonial.avatar" :alt="testimonial.name">
                <div class="author-info">
                  <h4>{{ testimonial.name }}</h4>
                  <span>{{ testimonial.program }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import schoolService from '@/services/schoolService'

export default {
  name: 'SchoolDetailsPage',
  data() {
    return {
      school: {
        name: '',
        city: '',
        country: '',
        type: '',
        description: '',
        studentCount: 0,
        programCount: 0,
        internationalStudents: 0,
        ranking: 0,
        phone: '',
        email: '',
        address: '',
        programs: [],
        campusImages: [],
        importantDates: [],
        testimonials: []
      },
      loading: true,
      error: null
    }
  },
  async created() {
    try {
      const schoolId = this.$route.params.id
      
      // Charger les détails de l'école
      const schoolDetails = await schoolService.getSchoolById(schoolId)
      
      // Charger les programmes
      const programs = await schoolService.getSchoolPrograms(schoolId)
      
      // Charger les témoignages
      const testimonials = await schoolService.getSchoolTestimonials(schoolId)
      
      // Mettre à jour l'état
      this.school = {
        ...schoolDetails,
        programs,
        testimonials
      }
      
      this.loading = false
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
      this.error = 'Une erreur est survenue lors du chargement des données'
      this.loading = false
    }
  },
  methods: {
    retryLoading() {
      this.loading = true
      this.error = null
      this.created()
    }
  }
}
</script>

<style scoped>
.school-details-page {
  background: #fff;
}

.hero {
  height: 60vh;
  background-size: cover;
  background-position: center;
  position: relative;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 2rem;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7));
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
}

.hero-meta {
  display: flex;
  gap: 2rem;
  font-size: 1.2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.quick-facts {
  margin-top: -4rem;
  position: relative;
  z-index: 2;
  padding: 0 1rem;
}

.facts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.fact-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.fact-card:hover {
  transform: translateY(-5px);
}

.fact-card i {
  font-size: 2rem;
  color: #4A90E2;
  margin-bottom: 1rem;
}

.main-content {
  padding: 4rem 0;
}

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.content-section {
  margin-bottom: 3rem;
}

.content-section h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.programs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.program-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.program-card:hover {
  transform: translateY(-5px);
}

.campus-life-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.campus-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.content-sidebar {
  position: sticky;
  top: 2rem;
}

.sidebar-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
}

.cta-button {
  width: 100%;
  padding: 1rem;
  background: #4A90E2;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.cta-button:hover {
  background: #357ABD;
}

.testimonials {
  background: #f8f9fa;
  padding: 4rem 0;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.testimonial-card {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.testimonial-author {
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
}

.testimonial-author img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .quick-facts {
    margin-top: -2rem;
  }
  
  .content-sidebar {
    position: static;
  }
}

.loading-state,
.error-state {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4A90E2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.error-state i {
  font-size: 3rem;
  color: #dc3545;
  margin-bottom: 1rem;
}

.retry-button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #4A90E2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.retry-button:hover {
  background: #357ABD;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 