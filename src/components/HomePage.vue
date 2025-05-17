<template>
  <div class="home-container">
    <div class="search-container">
      <input 
        type="text" 
        v-model="searchQuery" 
        @input="searchSchools"
        placeholder="Rechercher une école par domaine d'étude..."
        class="search-input"
      />
    </div>
    
    <div class="schools-grid" v-if="schools.length">
      <SchoolCard 
        v-for="school in schools" 
        :key="school.id" 
        :school="school"
      />
    </div>
    <div v-else class="no-results">
      Aucune école trouvée
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import SchoolCard from './SchoolCard.vue'

export default {
  name: 'HomePage',
  components: {
    SchoolCard
  },
  setup() {
    const searchQuery = ref('')
    const schools = ref([])

    const searchSchools = async () => {
      if (searchQuery.value.length > 2) {
        try {
          const response = await fetch(`/api/schools/search?query=${searchQuery.value}`)
          const data = await response.json()
          schools.value = data
        } catch (error) {
          console.error('Erreur lors de la recherche:', error)
        }
      } else {
        schools.value = []
      }
    }

    return {
      searchQuery,
      schools,
      searchSchools
    }
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background-image: url('@/assets/background.jpg');
  background-size: cover;
  background-position: center;
  padding: 2rem;
}

.search-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

.schools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.no-results {
  text-align: center;
  color: white;
  font-size: 1.2rem;
  margin-top: 2rem;
  background: rgba(0, 0, 0, 0.7);
  padding: 1rem;
  border-radius: 8px;
}
</style> 
 