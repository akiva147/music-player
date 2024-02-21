import {
    handleNext,
    handlePrevious,
    handleProgressChange,
    onLoadedMetadata,
} from 'src/utils/audio-player.utils'
import { Controllers } from '../Controllers'
import { DispalySong } from '../DispalySong'
import { ProgressBar } from '../ProgressBar'
import classes from './audio-player.module.scss'
import world from '/We_Are_The_World.mp3'
import beautiful from '/a_beautiful_day.mp3'
import jackson from '/jackson.jpeg'
import trinix from '/trinix.jpeg'
import { HTMLProps, useRef, useState } from 'react'
import { useControllers } from './useControllers'
import { VolumeController } from '../VolumeController'

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

    const {
        getters: { isPlaying },
        setters: { setIsPlaying, setIsVolumeMuted, setVolume },
        volumeRef,
        volumeIcon,
    } = useControllers(progressBarRef, audioRef, setTimeProgress, duration)

    return (
        <div className={classes.container}>
            <main>
                <DispalySong
                    {...{
                        currentSong,
                        audioRef,
                        handleNext: () =>
                            handleNext(
                                progressBarRef,
                                songIndex,
                                setSongIndex,
                                songs,
                                setCurrentSong,
                                setTimeProgress,
                                audioRef
                            ),
                        onLoadedMetadata: () =>
                            onLoadedMetadata(
                                progressBarRef,
                                audioRef,
                                setDuration
                            ),
                    }}
                />
                <Controllers
                    {...{
                        setIsPlaying,
                        isPlaying,
                        handleNext: () =>
                            handleNext(
                                progressBarRef,
                                songIndex,
                                setSongIndex,
                                songs,
                                setCurrentSong,
                                setTimeProgress,
                                audioRef
                            ),
                        handlePrevious: () =>
                            handlePrevious(
                                songIndex,
                                setSongIndex,
                                songs,
                                setCurrentSong,
                                audioRef
                            ),
                    }}
                />
            </main>
            <footer>
                <ProgressBar
                    {...{
                        progressBarRef,
                        timeProgress,
                        duration,
                        handleProgressChange: () =>
                            handleProgressChange(progressBarRef, audioRef),
                    }}
                />
                <VolumeController
                    {...{ setIsVolumeMuted, setVolume, volumeIcon, volumeRef }}
                />
            </footer>
        </div>
    )
}
