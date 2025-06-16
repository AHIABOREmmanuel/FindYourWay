<template>
  <div class="school-card">
     <img :src="school.image" :alt="school.name" class="school-image"> 
    <div class="school-info">
      <h3 class="school-name">{{ school.name }}</h3>
      <p class="school-specialty">{{ school.specialty }}</p>
      <p class="school-contact">{{ school.contact }}</p>
      <p class="school-address">{{ school.address }}</p>
      <router-link :to="'/school/' + school.id" class="details-link">
        Voir les détails
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SchoolCard',
  props: {
    school: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.school-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.school-card:hover {
  transform: translateY(-5px);
}

.school-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.school-info {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.school-name {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.school-specialty {
  color: #42b983;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.school-contact,
.school-address {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.details-link {
  display: inline-block;
  margin-top: auto;
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.3s ease;
}

.details-link:hover {
  background: #3aa876;
}
</style> 