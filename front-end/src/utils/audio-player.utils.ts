import { ISong } from 'src/components/AudioPlayer'

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
    songIndex: number,
    setSongIndex: React.Dispatch<React.SetStateAction<number>>,
    songs: ISong[],
    setCurrentSong: React.Dispatch<React.SetStateAction<ISong>>,
    audioRef: React.RefObject<HTMLAudioElement>
) => {
    if (!audioRef.current) return

    if (audioRef.current.currentTime >= 1) audioRef.current.currentTime = 0
    else if (songIndex !== 0) {
        setSongIndex((prev) => prev - 1)
        setCurrentSong(songs[songIndex - 1])
    }
}

export const handleNext = (
    progressBarRef: React.RefObject<HTMLInputElement>,
    songIndex: number,
    setSongIndex: React.Dispatch<React.SetStateAction<number>>,
    songs: ISong[],
    setCurrentSong: React.Dispatch<React.SetStateAction<ISong>>,
    setTimeProgress: React.Dispatch<React.SetStateAction<number>>,
    audioRef: React.RefObject<HTMLAudioElement>
) => {
    if (!progressBarRef.current || !audioRef.current?.currentTime) return
    progressBarRef.current.max = '0'
    audioRef.current.currentTime = 0
    setTimeProgress(0)
    if (songIndex >= songs.length - 1) {
        //reset the playlist to the first song
        setSongIndex(0)
        setCurrentSong(songs[0])
    } else {
        setSongIndex((prev) => prev + 1)
        setCurrentSong(songs[songIndex + 1])
    }
}
