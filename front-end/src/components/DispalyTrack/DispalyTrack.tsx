import { ITrack } from '../AudioPlayer'
import classes from './dispaly-track.module.scss'

export interface DispalyTrackProps {
    currentTrack: ITrack
    audioRef: React.RefObject<HTMLAudioElement>
    setDuration: React.Dispatch<React.SetStateAction<number>>
    progressBarRef: React.RefObject<HTMLInputElement>
    handleNext: () => void
}

export const DispalyTrack = ({
    currentTrack,
    audioRef,
    setDuration,
    progressBarRef,
    handleNext,
}: DispalyTrackProps) => {
    const onLoadedMetadata = () => {
        if (!audioRef.current || !progressBarRef.current) return
        const seconds = audioRef.current.duration
        setDuration(seconds)
        progressBarRef.current.max = seconds.toString()
    }

    return (
        <div className={classes.container}>
            <audio
                src={currentTrack.src}
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={handleNext}
            />
            <div className={classes['audio-info']}>
                <div className={classes['audio-image']}>
                    {currentTrack.thumbnail ? (
                        <img src={currentTrack.thumbnail} alt="audio avatar" />
                    ) : (
                        <div className={classes['icon-wrapper']}>
                            <span className={classes['audio-icon']}>
                                <img src={'/music_note.png'} alt="music note" />
                            </span>
                        </div>
                    )}
                </div>
                <div className={classes.text}>
                    <p className={classes.title}>{currentTrack.title}</p>
                    <p>{currentTrack.author}</p>
                </div>
            </div>
        </div>
    )
}
