import { useCallback, useEffect, useRef, useState } from 'react'
import { GrVolume, GrVolumeLow, GrVolumeMute } from 'react-icons/gr'

export const useControllers = (
    progressBarRef: React.RefObject<HTMLInputElement>,
    audioRef: React.RefObject<HTMLAudioElement>,
    setTimeProgress: React.Dispatch<React.SetStateAction<number>>,
    duration: number
) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isVolumeMuted, setIsVolumeMuted] = useState(false)
    const [volume, setVolume] = useState(50)

    const playAnimationRef = useRef(0)
    const volumeRef = useRef<HTMLInputElement>(null)

    const repeat = useCallback(() => {
        if (!audioRef.current || !progressBarRef.current) return
        const currentTime = audioRef.current.currentTime
        setTimeProgress(currentTime)
        progressBarRef.current.value = currentTime.toString()
        progressBarRef.current.style.setProperty(
            '--range-progress',
            `${(Number(progressBarRef.current.value) / duration) * 100}%`
        )

        playAnimationRef.current = requestAnimationFrame(repeat)
    }, [audioRef, duration, progressBarRef, setTimeProgress])

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play()
            playAnimationRef.current = requestAnimationFrame(repeat)
        } else {
            audioRef.current?.pause()
            cancelAnimationFrame(playAnimationRef.current)
        }
    }, [isPlaying, audioRef, repeat])

    useEffect(() => {
        if (!audioRef.current || !volumeRef.current) return
        audioRef.current.volume = volume / 100
        audioRef.current.muted = isVolumeMuted
        isVolumeMuted
            ? (volumeRef.current.value = '0')
            : (volumeRef.current.value = volume.toString())
    }, [volume, audioRef, isVolumeMuted, volumeRef])

    const volumeIcon =
        isVolumeMuted || volume < 5 ? (
            <img
                src="/no_sound.svg"
                alt="no sound"
                onClick={() => setIsVolumeMuted((prev) => !prev)}
            />
        ) : volume < 40 ? (
            // <GrVolumeLow />
            <img
                src="/volume_mute.svg"
                alt="volume mute"
                onClick={() => setIsVolumeMuted((prev) => !prev)}
            />
        ) : volume < 70 ? (
            <img
                src="/volume_down.svg"
                alt="volume down"
                onClick={() => setIsVolumeMuted((prev) => !prev)}
            />
        ) : (
            // <GrVolume />
            <img
                src="/volume_up.svg"
                alt="volume up"
                onClick={() => setIsVolumeMuted((prev) => !prev)}
            />
            // <GrVolume />
        )

    return {
        getters: {
            isPlaying,
            isVolumeMuted,
            volume,
        },
        setters: {
            setIsPlaying,
            setIsVolumeMuted,
            setVolume,
        },
        volumeRef,
        volumeIcon,
    }
}
