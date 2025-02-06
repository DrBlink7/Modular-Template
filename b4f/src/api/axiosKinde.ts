import { authUrl } from '../config'
import axios from 'axios'

const axiosApiClient = axios.create({
  baseURL: authUrl,
  timeout: 30000
})

export default axiosApiClient
