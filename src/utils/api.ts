import axios from 'axios'
import { config } from '@/config'
import { getUserToken, logout } from './localStorage'

export const API_URL = config.apiUrl // local network

const fetch = () => {
  const defaultOptions = {
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const instance = axios.create(defaultOptions)

  instance.interceptors.request.use((response: any) => {
    const token = getUserToken()
    response.headers.Authorization = token ? `Bearer ${token}` : ''
    return response
  })

  instance.interceptors.response.use(
    async (response) => response,
    (error) => {
      if (!error) logout()

      const { status } = error.response
      if (status && status === 401) logout()

      if (error.response) {
        const { errors } = error.response.data
        if (errors) throw errors
      }

      return error
    }
  )

  return instance
}

export default fetch()