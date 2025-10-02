import axios from 'axios'
import { beUrl } from '../config'

const axiosClient = axios.create({ baseURL: beUrl })
axiosClient.defaults.headers.common.Accept = 'application/json'

export default axiosClient
