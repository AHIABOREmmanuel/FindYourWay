<template>
  <div class="school-details" v-if="school">
    <div class="header">
      <h1>{{ school.name }}</h1>
      <div class="specialty">{{ school.specialty }}</div>
    </div>

    <div class="main-content">
      <div class="info-section">
        <h2>Informations générales</h2>
        <div class="info-grid">
          <div class="info-item">
            <strong>Contact:</strong>
            <p>{{ school.contact }}</p>
          </div>
          <div class="info-item">
            <strong>Adresse:</strong>
            <p>{{ school.address }}</p>
          </div>
        </div>
      </div>

      <div class="description-section">
        <h2>Description</h2>
        <p>{{ school.description }}</p>
      </div>

      <div class="technical-sheet">
        <button @click="showTechnicalSheet" class="tech-button">
          Voir la fiche technique
        </button>
      </div>

      <div class="testimonials-section">
        <h2>Avis et témoignages</h2>
        <div class="testimonials-grid">
          <div v-for="testimonial in school.testimonials" :key="testimonial.id" class="testimonial-card">
            <div class="testimonial-header">
              <strong>{{ testimonial.author }}</strong>
              <span>Promotion {{ testimonial.year }}</span>
            </div>
            <p>{{ testimonial.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'SchoolDetails',
  setup() {
    const route = useRoute()
    const school = ref(null)

    const fetchSchoolDetails = async () => {
      try {
        const response = await fetch(`/api/schools/${route.params.id}`)
        school.value = await response.json()
      } catch (error) {
        console.error('Erreur lors du chargement des détails:', error)
      }
    }

    const showTechnicalSheet = () => {
      // Implémenter l'affichage de la fiche technique
      window.open(school.value.technicalSheetUrl, '_blank')
    }

    onMounted(fetchSchoolDetails)

    return {
      school,
      showTechnicalSheet
    }
  }
}
</script>

<style scoped>
.school-details {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.specialty {
  font-size: 1.2rem;
  color: #42b983;
  font-weight: 600;
}

.main-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.info-section,
.description-section,
.testimonials-section {
  margin-bottom: 3rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #42b983;
  padding-bottom: 0.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-item strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

.tech-button {
  background: #42b983;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.tech-button:hover {
  background: #3aa876;
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
</style> 