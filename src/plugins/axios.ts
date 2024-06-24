import { LOCAL_STORAGE_KEYS } from '@/@core/enums'
import router from '@/router'
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

// ℹ️ Add request interceptor to send the authorization header on each subsequent request after login
axiosIns.interceptors.request.use((config: { headers: {
  Refresh: string
  Authorization?: any
} }) => {
  console.log(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)

  // Retrieve token from localStorage
  let token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
  const refreshToken = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
  if (!token)
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhc2QiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDb21tb24sU3VwZXJBZG1pbiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3N5c3RlbSI6IjEiLCJleHAiOjE3MTk1NzU4MzF9.30K9zqhGQ_m3wIa2wkyjyYVXWIihtmcgRKpe_X2hh8A'

  // If token is found
  if (token) {
    // Get request headers and if headers is undefined assign blank object
    config.headers = config.headers || {}

    // Set authorization header
    // ℹ️ JSON.parse will convert token to string
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    config.headers.token = token ? `Bearer ${token}` : ''
  }
  if (refreshToken) {
    config.headers = config.headers || {}
    config.headers.Refresh = refreshToken ? `Bearer ${refreshToken}` : ''
  }

  // Return modified config
  return config
})

// ℹ️ Add response interceptor to handle 401 response
axiosIns.interceptors.response.use((response: any) => {
  if (response.headers.nat)
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, response.headers.nat)

  return response
}, (error: { response: { status: number } }) => {
  // Handle error
  debugger
  if (error.response.status === 401) {
    // ℹ️ Logout user and redirect to login page
    // Remove "userData" from localStorage
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_DATA)

    // Remove "accessToken" from localStorage
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem('userAbilities')

    // If 401 response returned from api
    router.push('/login')
  }
  else {
    return Promise.reject(error)
  }
})

export default axiosIns
