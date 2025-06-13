<template>
    <div class="school-details">
      <BackButton />
      <!-- Loading state -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Chargement des informations...</p>
      </div>
  
      <!-- Error state -->
      <div v-else-if="error" class="error-state">
        <i class="fas fa-exclamation-circle"></i>
        <p>{{ error }}</p>
        <button @click="fetchSchoolDetails" class="retry-button">
          Réessayer
        </button>
      </div>
  
      <!-- Content -->
      <div v-else-if="school">
        <!-- Hero section avec image -->
        <div class="hero" :style="{ backgroundImage: `url(${school.image})` }">
          <div class="hero-overlay"></div>
          <div class="hero-content">
            <h1>{{ school.name }}</h1>
            <div class="specialty">{{ school.specialty }}</div>
          </div>
        </div>
  
        <div class="main-content">
          <!-- Informations principales -->
          <div class="info-section">
            <h2>Informations générales</h2>
            <div class="info-grid">
              <div class="info-item">
                <i class="fas fa-phone"></i>
                <strong>Contact:</strong>
                <p>{{ school.contact }}</p>
              </div>
              <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <strong>Adresse:</strong>
                <p>{{ school.address }}</p>
              </div>
            </div>
          </div>
  
          <!-- Description -->
          <div class="description-section">
            <h2>À propos</h2>
            <p>{{ school.description }}</p>
          </div>
  
          <!-- Fiche technique -->
          <div class="technical-sheet" v-if="school.technicalSheetUrl">
            <h2>Documents</h2>
            <button @click="showTechnicalSheet" class="tech-button">
              <i class="fas fa-file-pdf"></i>
              Voir la fiche technique
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import schoolService from '@/services/schoolService'
  import BackButton from '@/components/BackButton.vue'
  
  export default {
    name: 'SchoolDetails',
    components: {
      BackButton
    },
    setup() {
      const route = useRoute()
      const school = ref(null)
      const loading = ref(true)
      const error = ref(null)
  
      const fetchSchoolDetails = async () => {
        try {
          loading.value = true
          error.value = null
          const schoolId = route.params.id
          school.value = await schoolService.getSchoolById(schoolId)
        } catch (error) {
          console.error('Erreur lors du chargement des détails:', error)
          error.value = 'Une erreur est survenue lors du chargement des détails de l\'école'
        } finally {
          loading.value = false
        }
      }
  
      const showTechnicalSheet = () => {
        if (school.value?.technicalSheetUrl) {
          window.open(school.value.technicalSheetUrl, '_blank')
        }
      }
  
      onMounted(fetchSchoolDetails)
  
      return {
        school,
        loading,
        error,
        showTechnicalSheet
      }
    }
  }
  </script>
  
  <style scoped>
  .school-details {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background: #f8f9fa;
  }
  
  .hero {
    height: 60vh;
    background-size: cover;
    background-position: center;
    position: relative;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 0;
  }
  
  .hero-overlay {
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
    padding: 2rem;
  }
  
  .hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }
  
  .specialty {
    font-size: 1.5rem;
    color: #42b983;
    font-weight: 600;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
  }
  
  .main-content {
    background: white;
    padding: 3rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 0;
    width: 100%;
  }
  
  .info-section,
  .description-section,
  .technical-sheet {
    margin-bottom: 3rem;
  }
  
  h2 {
    color: #2c3e50;
    margin-bottom: 1.5rem;
    border-bottom: 2px solid #42b983;
    padding-bottom: 0.5rem;
    font-size: 1.8rem;
  }
  
  .info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
    padding: 0 2rem;
  }
  
  .info-item {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  }
  
  .info-item i {
    font-size: 1.5rem;
    color: #42b983;
    margin-bottom: 1rem;
  }
  
  .info-item strong {
    display: block;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    font-size: 1.1rem;
  }
  
  .info-item p {
    color: #666;
    line-height: 1.6;
  }
  
  .description-section p {
    line-height: 1.8;
    color: #444;
    font-size: 1.1rem;
  }
  
  .tech-button {
    background: #42b983;
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .tech-button i {
    font-size: 1.2rem;
  }
  
  .tech-button:hover {
    background: #3aa876;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
  
  .testimonials-section {
    margin-bottom: 3rem;
  }
  
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .testimonial-card {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }
  
  .testimonial-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    color: #2c3e50;
  }
  
  .testimonial-header span {
    color: #666;
  }
  
  @media (max-width: 768px) {
    .hero {
      height: 50vh;
    }
  
    .hero h1 {
      font-size: 2rem;
    }
  
    .specialty {
      font-size: 1.2rem;
    }
  
    .main-content {
      padding: 2rem 1rem;
    }
  
    .info-grid {
      grid-template-columns: 1fr;
      padding: 0;
    }
  }
  
  .loading-state,
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    text-align: center;
    padding: 2rem;
  }
  
  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #42b983;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .error-state i {
    font-size: 3rem;
    color: #dc3545;
    margin-bottom: 1rem;
  }
  
  .error-state p {
    color: #666;
    margin-bottom: 1.5rem;
  }
  
  .retry-button {
    background: #42b983;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .retry-button:hover {
    background: #3aa876;
  }
  </style> 