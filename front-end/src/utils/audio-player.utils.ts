import { Song } from 'src/models/deezer'

export const handleProgressChange = (
    progressBarRef: React.RefObject<HTMLInputElement>,
    audioRef: React.RefObject<HTMLAudioElement>
) => {
    if (!progressBarRef.current || !audioRef.current?.currentTime) return
    console.log('🚀 ~ progressBarRef.current:', progressBarRef.current)
    console.log('🚀 ~ audioRef.current:', audioRef.current)
    audioRef.current.currentTime = Number(progressBarRef.current.value)
}

export const onLoadedMetadata = (
    progressBarRef: React.RefObject<HTMLInputElement>,
    audioRef: React.RefObject<HTMLAudioElement>,
    setDuration: React.Dispatch<React.SetStateAction<number>>
) => {
    if (!audioRef.current || !progressBarRef.current) return
    console.log('🚀 ~ progressBarRef.current:', progressBarRef.current)
    console.log('🚀 ~ audioRef.current:', audioRef.current)
    const seconds = audioRef.current.duration
    setDuration(seconds)
    progressBarRef.current.max = seconds.toString()
}

export const handlePrevious = (
    audioRef: React.RefObject<HTMLAudioElement>,
    setCurrentSong: React.Dispatch<React.SetStateAction<Song | undefined>>,
    songIndex?: number,
    setSongIndex?: React.Dispatch<React.SetStateAction<number>>,
    songs?: Song[]
) => {
    if (!audioRef.current) return

    if (audioRef.current.currentTime >= 1) audioRef.current.currentTime = 0

    if (!songs || !songIndex || !setSongIndex) return
    else if (songIndex !== 0) {
        setSongIndex((prev) => prev - 1)
        setCurrentSong(songs[songIndex - 1])
    }
}

export const handleNext = (
    progressBarRef: React.RefObject<HTMLInputElement>,
    audioRef: React.RefObject<HTMLAudioElement>,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>,
    setTimeProgress: React.Dispatch<React.SetStateAction<number>>,
    setCurrentSong: React.Dispatch<React.SetStateAction<Song | undefined>>,
    songIndex?: number,
    setSongIndex?: React.Dispatch<React.SetStateAction<number>>,
    songs?: Song[]
) => {
    if (!progressBarRef.current || !audioRef.current?.currentTime) return
    progressBarRef.current.max = '0'
    audioRef.current.currentTime = 0
    setTimeProgress(0)
    if (!songs || !songIndex || !setSongIndex) return
    if (songIndex >= songs.length - 1) {
        //reset the playlist to the first song
        setSongIndex(0)
        setCurrentSong(songs[0])
        setIsPlaying(false)
    } else {
        setSongIndex((prev) => prev + 1)
        setCurrentSong(songs[songIndex + 1])
    }
}
