<template>
  <div class="home-wrapper">
    <div class="home-container">
      <div class="logo-corner">
        <img src="../assets/logo.svg" alt="FindYourWay Logo" class="corner-logo" width="100" height="50" />
      </div>
      <div class="search-content">
        <h1 class="title">Trouvez votre école idéale</h1>
        <div class="search-container">
          <input 
            type="text" 
            v-model="searchQuery" 
            @keyup.enter="handleSearch"
            placeholder="Rechercher une école par domaine d'étude..."
            class="search-input"
          />
          <button @click="handleSearch" class="search-button">
            Rechercher
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HomePage',
  setup() {
    const router = useRouter()
    const searchQuery = ref('')

    const handleSearch = () => {
      const query = searchQuery.value.trim()
      if (query.length >= 3) {
        router.push('/search?q=' + encodeURIComponent(query))
      }
    }

    return {
      searchQuery,
      handleSearch
    }
  }
}
</script>

<style scoped>
.home-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.home-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.search-content {
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 800px;
  text-align: center;
  padding: 2rem;
}

.title {
  color: white;
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.search-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50px;
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-input {
  flex: 1;
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  border: none;
  background: transparent;
  outline: none;
}

.search-button {
  background: #42b983;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;
}

.search-button:hover {
  background: #3aa876;
}

.logo-corner {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
}

.corner-logo {
  height: 40px;
  width: auto;
}

@media (max-width: 768px) {
  .title {
    font-size: 2.5rem;
  }

  .search-container {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
  }

  .search-button {
    width: 100%;
  }
}
</style> 