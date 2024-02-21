import { useCallback, useEffect, useRef, useState } from 'react'
import classes from './controls.module.scss'
import {
    FastBackwardOutlined,
    StepBackwardOutlined,
    PauseCircleOutlined,
    PlayCircleOutlined,
    StepForwardOutlined,
    FastForwardOutlined,
} from '@ant-design/icons'
import { ISong } from '../AudioPlayer'
import { GrVolumeMute, GrVolumeLow, GrVolume } from 'react-icons/gr'

export interface ControlsProps {
    audioRef: React.RefObject<HTMLAudioElement>
    progressBarRef: React.RefObject<HTMLInputElement>
    duration: number
    setTimeProgress: React.Dispatch<React.SetStateAction<number>>
    songs: ISong[]
    songIndex: number
    setSongIndex: React.Dispatch<React.SetStateAction<number>>
    setCurrentSong: React.Dispatch<React.SetStateAction<ISong>>
    handleNext: () => void
}

export const Controls = ({
    audioRef,
    progressBarRef,
    duration,
    setTimeProgress,
    songs,
    songIndex,
    setSongIndex,
    setCurrentSong,
    handleNext,
}: ControlsProps) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [muteVolume, setMuteVolume] = useState(false)
    const [volume, setVolume] = useState(50)

    const playAnimationRef = useRef(0)
    const valueRef = useRef<HTMLInputElement>(null)

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
        if (!audioRef.current || !valueRef.current) return
        audioRef.current.volume = volume / 100
        audioRef.current.muted = muteVolume
        muteVolume
            ? (valueRef.current.value = '0')
            : (valueRef.current.value = volume.toString())
    }, [volume, audioRef, muteVolume, valueRef])

    const skipForward = () => {
        if (!audioRef.current?.currentTime) return
        audioRef.current.currentTime += 15
    }

    const skipBackward = () => {
        if (!audioRef.current?.currentTime) return
        audioRef.current.currentTime -= 15
    }

    const handlePrevious = () => {
        if (songIndex === 0) {
            const lastSongIndex = songs.length - 1
            setSongIndex(lastSongIndex)
            setCurrentSong(songs[lastSongIndex])
        } else {
            setSongIndex((prev) => prev - 1)
            setCurrentSong(songs[songIndex - 1])
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.controls}>
                <button onClick={handlePrevious}>
                    <FastBackwardOutlined />
                </button>
                <button onClick={skipBackward}>
                    <StepBackwardOutlined />
                </button>
                <button onClick={() => setIsPlaying((prev) => !prev)}>
                    {isPlaying ? (
                        <PauseCircleOutlined />
                    ) : (
                        <PlayCircleOutlined />
                    )}
                </button>
                <button onClick={skipForward}>
                    <StepForwardOutlined />
                </button>
                <button onClick={handleNext}>
                    <FastForwardOutlined />
                </button>
            </div>
            <div className={classes.volume}>
                <button onClick={() => setMuteVolume((prev) => !prev)}>
                    {muteVolume || volume < 5 ? (
                        <GrVolumeMute />
                    ) : volume < 49 ? (
                        <GrVolumeLow />
                    ) : (
                        <GrVolume />
                    )}
                </button>
                <input
                    type="range"
                    min={0}
                    max={100}
                    ref={valueRef}
                    onChange={(e) => setVolume(Number(e.target.value))}
                />
            </div>
        </div>
    )
}
