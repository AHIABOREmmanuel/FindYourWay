import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://api-findyourway.onrender.com/api'

// Création d'une instance axios avec la configuration de base
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Intercepteur pour gérer les erreurs globalement
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default {
  /**
   * Recherche des écoles selon les critères donnés
   * @param {Object} searchParams - Les paramètres de recherche
   * @returns {Promise<Array>} La liste des écoles correspondant aux critères
   */
  async searchSchools(searchParams) {
    try {
      const response = await apiClient.get('/schools/search', { params: searchParams })
      return response.data
    } catch (error) {
      console.error('Error searching schools:', error)
      throw error
    }
  },

  /**
   * Récupère les détails d'une école par son ID
   * @param {number} id - L'ID de l'école
   * @returns {Promise<Object>} Les détails de l'école
   */
  async getSchoolById(id) {
    try {
      const response = await apiClient.get(`/schools/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching school details:', error)
      throw error
    }
  },

  /**
   * Récupère les programmes d'une école par son ID
   * @param {number} id - L'ID de l'école
   * @returns {Promise<Array>} La liste des programmes
   */
  async getSchoolPrograms(id) {
    try {
      const response = await apiClient.get(`/schools/${id}/programs`)
      return response.data
    } catch (error) {
      console.error('Error fetching school programs:', error)
      throw error
    }
  },

  /**
   * Récupère les témoignages d'une école par son ID
   * @param {number} id - L'ID de l'école
   * @returns {Promise<Array>} La liste des témoignages
   */
  async getSchoolTestimonials(id) {
    try {
      const response = await apiClient.get(`/schools/${id}/testimonials`)
      return response.data
    } catch (error) {
      console.error('Error fetching school testimonials:', error)
      throw error
    }
  }
} 