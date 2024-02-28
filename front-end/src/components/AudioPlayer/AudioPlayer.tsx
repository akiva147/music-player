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
import { useParams } from 'react-router'
import { useCurrentSong } from 'src/hooks/useCurrentSong'

export interface AudioPlayerProps {}

export const AudioPlayer = (props: AudioPlayerProps) => {
    // const [songIndex, setSongIndex] = useState(0)
    // const [currentSong, setCurrentSong] = useState(songs[songIndex])
    const [timeProgress, setTimeProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const { currentSong, setCurrentSong } = useCurrentSong()
    const audioRef = useRef<HTMLAudioElement>(null)
    const progressBarRef = useRef<HTMLInputElement>(null)

    const songId = useParams()

    if (!songId || !currentSong) throw new Error('No song id provided')

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
                                audioRef,
                                setIsPlaying,
                                setTimeProgress,
                                setCurrentSong
                                // songIndex,
                                // setSongIndex,
                                // songs,
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
                                audioRef,
                                setIsPlaying,
                                setTimeProgress,
                                setCurrentSong
                                // songIndex,
                                // setSongIndex,
                                // songs,
                            ),
                        handlePrevious: () =>
                            handlePrevious(
                                audioRef,
                                setCurrentSong
                                // songIndex,
                                // setSongIndex,
                                // songs,
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
