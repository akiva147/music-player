import { Controls } from '../Controls'
import { DispalySong } from '../DispalySong'
import { ProgressBar } from '../ProgressBar'
import classes from './audio-player.module.scss'
import world from '/We_Are_The_World.mp3'
import beautiful from '/a_beautiful_day.mp3'
import jackson from '/jackson.jpeg'
import trinix from '/trinix.jpeg'
import { HTMLProps, useRef, useState } from 'react'

export interface AudioPlayerProps {}

export interface ISong extends HTMLProps<HTMLAudioElement> {
    author: string
    thumbnail: string
}

export const songs: ISong[] = [
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
    const [songIndex, setSongIndex] = useState(0)
    const [currentSong, setCurrentSong] = useState(songs[songIndex])
    const [timeProgress, setTimeProgress] = useState(0)
    const [duration, setDuration] = useState(0)

    const audioRef = useRef<HTMLAudioElement>(null)
    const progressBarRef = useRef<HTMLInputElement>(null)

    const handleNext = () => {
        if (songIndex >= songs.length - 1) {
            //reset the playlist to the first song
            setSongIndex(0)
            setCurrentSong(songs[0])
        } else {
            setSongIndex((prev) => prev + 1)
            setCurrentSong(songs[songIndex + 1])
        }
    }

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <DispalySong
                    {...{
                        currentSong,
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
                        setCurrentSong,
                        setSongIndex: setSongIndex,
                        songIndex: songIndex,
                        songs,
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
