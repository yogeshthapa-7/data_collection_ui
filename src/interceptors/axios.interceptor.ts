import axios from 'axios'
import { getAccessToken } from '@/services/auth.service'

export const setupAxiosInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const accessToken = getAccessToken()

      if (accessToken && accessToken !== 'undefined' && accessToken !== 'null') {
        config.headers.Authorization = `Bearer ${accessToken}`
      } else {
        const clientCode = import.meta.env.VITE_CLIENT_CODE || ''
        if (clientCode) {
          config.headers.clientcode = clientCode
        }
      }

      return config
    },
    (error) => Promise.reject(error)
  )
}
