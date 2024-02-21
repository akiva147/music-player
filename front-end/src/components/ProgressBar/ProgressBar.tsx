import { formatTime } from 'src/utils/general.utils'
import classes from './progress-bar.module.scss'

export interface ProgressBarProps {
    progressBarRef: React.RefObject<HTMLInputElement>
    audioRef: React.RefObject<HTMLAudioElement>
    timeProgress: number
    duration: number
}

export const ProgressBar = ({
    progressBarRef,
    audioRef,
    timeProgress,
    duration,
}: ProgressBarProps) => {
    const handleProgressChange = () => {
        if (!progressBarRef.current || !audioRef.current?.currentTime) return
        audioRef.current.currentTime = Number(progressBarRef.current.value)
    }
    return (
        <div className={classes.container}>
            <span className={classes['time current']}>
                {formatTime(timeProgress)}
            </span>
            <input
                type="range"
                ref={progressBarRef}
                defaultValue={0}
                onChange={handleProgressChange}
            />
            <span className={classes['time current']}>
                {formatTime(duration)}
            </span>
        </div>
    )
}
