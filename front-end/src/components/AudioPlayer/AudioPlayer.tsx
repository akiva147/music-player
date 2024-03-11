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

import { useRef, useState } from 'react'
import { useControllers } from './useControllers'
import { VolumeController } from '../VolumeController'
import { useParams } from 'react-router'
import { useCurrentPlaylist } from 'src/hooks/useCurrentPlaylist'

export interface AudioPlayerProps {}

export const AudioPlayer = (props: AudioPlayerProps) => {
    const { currentPlaylist } = useCurrentPlaylist()
    const [timeProgress, setTimeProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [songIndex, setSongIndex] = useState(0)
    const [currentSong, setCurrentSong] = useState(currentPlaylist[songIndex])
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
                                currentPlaylist,
                                songIndex,
                                setIsPlaying,
                                setTimeProgress,
                                setCurrentSong,
                                setSongIndex
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
                                currentPlaylist,
                                songIndex,
                                setIsPlaying,
                                setTimeProgress,
                                setCurrentSong,
                                setSongIndex
                            ),
                        handlePrevious: () =>
                            handlePrevious(
                                audioRef,
                                currentPlaylist,
                                songIndex,
                                setCurrentSong,
                                setSongIndex
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
