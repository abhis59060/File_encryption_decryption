import axios from 'axios'

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000', 
  withCredentials: true, // needed if backend uses cookies/sessions
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach token automatically (if saved in localStorage)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
