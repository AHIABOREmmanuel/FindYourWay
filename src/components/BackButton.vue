<template>
  <div class="back-button" @click="goBack">
    <i class="fas fa-arrow-left"></i>
    <span>Retour</span>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'BackButton',
  setup() {
    const router = useRouter()

    const goBack = () => {
      router.back()
    }

    return {
      goBack
    }
  }
}
</script>

<style scoped>
.back-button {
  position: fixed;
  top: 80px;
  left: 20px;
  z-index: 1000;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 15px;
  border-radius: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.back-button i {
  font-size: 1.2rem;
  color: #42b983;
}

.back-button span {
  color: #2c3e50;
  font-weight: 500;
  font-size: 1rem;
}

.back-button:hover {
  transform: translateX(-5px);
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .back-button {
    top: 70px;
    left: 15px;
    padding: 8px 12px;
  }
  
  .back-button i {
    font-size: 1.1rem;
  }

  .back-button span {
    font-size: 0.9rem;
  }
}
</style> 