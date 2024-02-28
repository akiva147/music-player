import { SongOption, SongOptionSchema } from 'src/models/deezer'
import { axiosInstance } from './axios.service'

export class SongService {
    async getAutoCompleteResults(query: string) {
        const limit = 10
        try {
            const res = (
                await axiosInstance.get<SongOption[]>('/song', {
                    params: {
                        query,
                        limit,
                    },
                })
            ).data

            if (res.length === 0) return 'results not found'

            const autoCompleteResults = SongOptionSchema.array().parse(res)

            return autoCompleteResults
        } catch (error: unknown) {
            console.error(error)
            throw new Error(String(error))
        }
    }
}

export const songService = new SongService()
