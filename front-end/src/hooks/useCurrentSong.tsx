import { useContext, useEffect, useState } from 'react'
import { CurrentSongContext } from 'src/components/contexts/CurrentSongContext'
import { Song } from 'src/models/deezer'

export const useCurrentSong = () => {
    const { currentSong, setCurrentSong } = useContext(CurrentSongContext)

    useEffect(() => {
        console.log('🚀 ~ useCurrentSong ~ currentSong:', currentSong)
    }, [currentSong])

    return {
        currentSong,
        setCurrentSong,
    }
}
