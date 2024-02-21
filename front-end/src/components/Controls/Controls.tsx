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
import { ITrack } from '../AudioPlayer'
import { GrVolumeMute, GrVolumeLow, GrVolume } from 'react-icons/gr'

export interface ControlsProps {
    audioRef: React.RefObject<HTMLAudioElement>
    progressBarRef: React.RefObject<HTMLInputElement>
    duration: number
    setTimeProgress: React.Dispatch<React.SetStateAction<number>>
    tracks: ITrack[]
    trackIndex: number
    setTrackIndex: React.Dispatch<React.SetStateAction<number>>
    setCurrentTrack: React.Dispatch<React.SetStateAction<ITrack>>
    handleNext: () => void
}

export const Controls = ({
    audioRef,
    progressBarRef,
    duration,
    setTimeProgress,
    tracks,
    trackIndex,
    setTrackIndex,
    setCurrentTrack,
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
        if (trackIndex === 0) {
            const lastTrackIndex = tracks.length - 1
            setTrackIndex(lastTrackIndex)
            setCurrentTrack(tracks[lastTrackIndex])
        } else {
            setTrackIndex((prev) => prev - 1)
            setCurrentTrack(tracks[trackIndex - 1])
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
