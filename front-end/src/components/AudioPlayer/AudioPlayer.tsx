import { Controls } from '../Controls'
import { DispalyTrack } from '../DispalyTrack'
import { ProgressBar } from '../ProgressBar'
import classes from './audio-player.module.scss'
import world from '/We_Are_The_World.mp3'
import beautiful from '/a_beautiful_day.mp3'
import jackson from '/jackson.jpeg'
import trinix from '/trinix.jpeg'
import { HTMLProps, useRef, useState } from 'react'

export interface AudioPlayerProps {}

export interface ITrack extends HTMLProps<HTMLAudioElement> {
    author: string
    thumbnail: string
}

export const tracks: ITrack[] = [
    {
        title: 'Trinix ft Rushawn – Its a beautiful day',
        src: beautiful,
        author: 'Trinix ft Rushawn',
        thumbnail: trinix,
    },
    {
        title: 'Michael Jackson – We Are The World',
        src: world,
        author: 'Michael Jackson',
        thumbnail: jackson,
    },
]

export const AudioPlayer = (props: AudioPlayerProps) => {
    const [trackIndex, setTrackIndex] = useState(0)
    const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex])
    const [timeProgress, setTimeProgress] = useState(0)
    const [duration, setDuration] = useState(0)

    const audioRef = useRef<HTMLAudioElement>(null)
    const progressBarRef = useRef<HTMLInputElement>(null)

    const handleNext = () => {
        if (trackIndex >= tracks.length - 1) {
            //reset the playlist to the first track
            setTrackIndex(0)
            setCurrentTrack(tracks[0])
        } else {
            setTrackIndex((prev) => prev + 1)
            setCurrentTrack(tracks[trackIndex + 1])
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <DispalyTrack
                    {...{
                        currentTrack,
                        audioRef,
                        setDuration,
                        progressBarRef,
                        handleNext,
                    }}
                />
                <Controls
                    {...{
                        audioRef,
                        progressBarRef,
                        duration,
                        setTimeProgress,
                        setCurrentTrack,
                        setTrackIndex,
                        trackIndex,
                        tracks,
                        handleNext,
                    }}
                />
                <ProgressBar
                    {...{ progressBarRef, audioRef, timeProgress, duration }}
                />
            </div>
        </div>
    )
}
