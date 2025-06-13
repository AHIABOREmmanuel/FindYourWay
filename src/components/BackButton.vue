<template>
  <div class="back-arrow" @click="goBack">
    <i class="fas fa-chevron-left"></i>
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
.back-arrow {
  position: fixed;
  top: 80px;
  left: 20px;
  z-index: 1000;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-arrow i {
  font-size: 2rem;
  color: #2c3e50;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.back-arrow:hover {
  transform: translateX(-5px);
}

@media (max-width: 768px) {
  .back-arrow {
    top: 70px;
    left: 15px;
  }
  
  .back-arrow i {
    font-size: 1.8rem;
  }
}
</style> 