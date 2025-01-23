import { Logger } from '../logger'
import { authUrl } from '../config'
import axios from 'axios'

if (authUrl == null) {
  const error = new Error('Auth URL is not provided')
  Logger.writeException(error, '000-ENVVAR', 'init')
  throw error
}

const axiosApiClient = axios.create({
  baseURL: authUrl,
  timeout: 30000
})

export default axiosApiClient
