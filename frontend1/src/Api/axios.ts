import axios from 'axios'
import { beUrl } from '../Utils/config'

const axiosClient = axios.create({ baseURL: `${beUrl}/api` })
axiosClient.defaults.headers.common.Accept = 'application/json'

export default axiosClient
