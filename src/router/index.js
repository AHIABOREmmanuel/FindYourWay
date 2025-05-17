import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import SearchResultsPage from '../views/SearchResultsPage.vue'
import SchoolDetailsPage from '../views/SchoolDetailsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/search',
      name: 'search-results',
      component: SearchResultsPage,
      props: route => ({ query: route.query.q })
    },
    {
      path: '/school/:id',
      name: 'school-details',
      component: SchoolDetailsPage,
      props: true
    }
  ]
})

// Gestionnaire d'erreurs global pour le routeur
router.onError((error) => {
  console.error('Router error:', error)
})

export default router 