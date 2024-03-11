import { useMemo } from 'react'
import { Song } from 'src/models/deezer'

export const useCurrentPlaylist = () => {
    const setLocalStoragePlaylist = (playlist: Song[]) => {
        localStorage.setItem('current_playlist', JSON.stringify(playlist))
    }
    const getLocalStoragePlaylist = useMemo(() => {
        const playlist = localStorage.getItem('current_playlist')
        if (!playlist) return []
        const parsed: Song[] = JSON.parse(playlist)
        return parsed
    }, [])

    return {
        currentPlaylist: getLocalStoragePlaylist,
        setCurrentPlaylist: setLocalStoragePlaylist,
    }
}
