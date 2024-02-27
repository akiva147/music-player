import { axiosInstance } from './axios.service'

export class SongService {
    async getAutoCompleteResults(query: string) {
        const limit = 10
        try {
            const res = await axiosInstance.get('/song', {
                params: {
                    query,
                    limit,
                },
            })
            console.log('🚀 ~ SongService ~ getAutoCompleteResults ~ res:', res)
        } catch (error: unknown) {
            console.error(error)
            throw new Error(String(error))
        }
    }
}

export const songService = new SongService()
