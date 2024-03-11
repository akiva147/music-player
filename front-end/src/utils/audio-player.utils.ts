import { Song } from 'src/models/deezer'

export const handleProgressChange = (
    progressBarRef: React.RefObject<HTMLInputElement>,
    audioRef: React.RefObject<HTMLAudioElement>
) => {
    if (!progressBarRef.current || !audioRef.current?.currentTime) return
    audioRef.current.currentTime = Number(progressBarRef.current.value)
}

export const onLoadedMetadata = (
    progressBarRef: React.RefObject<HTMLInputElement>,
    audioRef: React.RefObject<HTMLAudioElement>,
    setDuration: React.Dispatch<React.SetStateAction<number>>
) => {
    if (!audioRef.current || !progressBarRef.current) return
    const seconds = audioRef.current.duration
    setDuration(seconds)
    progressBarRef.current.max = seconds.toString()
}

export const handlePrevious = (
    audioRef: React.RefObject<HTMLAudioElement>,
    currentPlaylist: Song[],
    songIndex: number,
    setCurrentSong: React.Dispatch<React.SetStateAction<Song>>,
    setSongIndex: React.Dispatch<React.SetStateAction<number>>
) => {
    if (!audioRef.current) return

    if (audioRef.current.currentTime >= 1) audioRef.current.currentTime = 0
    else if (songIndex !== 0 && currentPlaylist.length > 0) {
        setSongIndex((prev) => {
            const newIndex = prev - 1
            setCurrentSong(currentPlaylist[newIndex])
            return newIndex
        })
    }
}

export const handleNext = (
    progressBarRef: React.RefObject<HTMLInputElement>,
    audioRef: React.RefObject<HTMLAudioElement>,
    currentPlaylist: Song[],
    songIndex: number,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
    setTimeProgress: React.Dispatch<React.SetStateAction<number>>,
    setCurrentSong: React.Dispatch<React.SetStateAction<Song | undefined>>,
    setSongIndex: React.Dispatch<React.SetStateAction<number>>
) => {
    if (!progressBarRef.current || !audioRef.current?.currentTime) return
    progressBarRef.current.max = '0'
    audioRef.current.currentTime = 0
    setTimeProgress(0)
    if (!songIndex || !setSongIndex) return
    if (songIndex >= currentPlaylist.length - 1) {
        //reset the playlist to the first song
        setSongIndex(0)
        setCurrentSong(currentPlaylist[0])
        setIsPlaying(false)
    } else {
        setSongIndex((prev) => {
            const newIndex = prev + 1
            setCurrentSong(currentPlaylist[newIndex])
            return newIndex
        })
    }
}
