<template>
  <div class="page-wrapper">
    <BackButton />
    <div class="logo-corner">
      <router-link to="/">
        <img src="../assets/logo1.svg" alt="FindYourWay Logo" class="corner-logo" />
      </router-link>
    </div>
    
    <div class="results-container">
      <h2 class="results-title">Résultats de recherche pour "{{ searchQuery }}"</h2>
      
      <div v-if="loading" class="loading">
        <div class="loader"></div>
        <p>Recherche en cours...</p>
      </div>

      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-else-if="schools.length" class="schools-grid">
        <SchoolCard 
          v-for="school in schools" 
          :key="school.id" 
          :school="school"
        />
      </div>

      <div v-else class="no-results">
        <p>Aucune école trouvée pour "{{ searchQuery }}"</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SchoolCard from '../components/SchoolCard.vue'
import BackButton from '../components/BackButton.vue'
import schoolService from '../services/schoolService'

export default {
  name: 'SearchResultsPage',
  components: {
    SchoolCard,
    BackButton
  },
  setup() {
    const route = useRoute()
    const searchQuery = ref('')
    const schools = ref([])
    const loading = ref(false)
    const error = ref(null)

    const fetchResults = async () => {
      searchQuery.value = route.query.q || ''
      if (searchQuery.value) {
        try {
          loading.value = true
          error.value = null
          schools.value = await schoolService.searchSchools({ query: searchQuery.value })
        } catch (err) {
          console.error('Erreur lors de la recherche:', err)
          error.value = 'Une erreur est survenue lors de la recherche. Veuillez réessayer.'
          schools.value = []
        } finally {
          loading.value = false
        }
      }
    }

    onMounted(fetchResults)

    return {
      searchQuery,
      schools,
      loading,
      error
    }
  }
}
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  width: 100%;
  background: #f8f9fa;
  padding: 0;
  margin: 0;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}

.logo-corner {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 10;
}

.corner-logo {
  height: 40px;
  width: auto;
  transition: transform 0.3s ease;
}

.corner-logo:hover {
  transform: scale(1.05);
}

.results-container {
  padding: 80px 2rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

.results-title {
  color: #2c3e50;
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 600;
}

.schools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
  margin-bottom: 2rem;
}

.no-results {
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.no-results p {
  margin-bottom: 1rem;
}

.back-link {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.back-link:hover {
  background: #3aa876;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .results-container {
    padding: 70px 1rem 1rem 1rem;
  }

  .results-title {
    font-size: 1.5rem;
    margin-top: 0;
  }

  .schools-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.loading {
  text-align: center;
  padding: 2rem;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #42b983;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  text-align: center;
  color: #dc3545;
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
}
</style> 