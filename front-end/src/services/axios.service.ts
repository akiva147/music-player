import axios from 'axios'
import { validateEnvs } from '../utils/general.utils'

const { VITE_API_LOCATION } = validateEnvs()

export const axiosInstance = axios.create({
    baseURL: VITE_API_LOCATION,
})
