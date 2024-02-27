import { z } from 'zod'
import { EnvironmentVariables } from '../types/env.types'

export const envSchema = z.object({
    VITE_API_LOCATION: z.string(),
    VITE_DEEZER_APP_ID: z.string(),
    VITE_DEEZER_SECRET_KEY: z.string(),
})

export const validateEnvs = (): EnvironmentVariables => {
    const env = envSchema.parse(import.meta.env)

    return {
        VITE_API_LOCATION: env.VITE_API_LOCATION,
        VITE_DEEZER_APP_ID: env.VITE_DEEZER_APP_ID,
        VITE_DEEZER_SECRET_KEY: env.VITE_DEEZER_SECRET_KEY,
    }
}

export const formatTime = (time) => {
    if (time && !isNaN(time)) {
        const minutes = Math.floor(time / 60)
        const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const seconds = Math.floor(time % 60)
        const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
        return `${formatMinutes}:${formatSeconds}`
    }
    return '00:00'
}
