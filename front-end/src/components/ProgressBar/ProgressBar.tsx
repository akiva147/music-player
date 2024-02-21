import { formatTime } from 'src/utils/general.utils'
import classes from './progress-bar.module.scss'

export interface ProgressBarProps {
    progressBarRef: React.RefObject<HTMLInputElement>
    timeProgress: number
    duration: number
    handleProgressChange: () => void
}

export const ProgressBar = ({
    progressBarRef,
    timeProgress,
    duration,
    handleProgressChange,
}: ProgressBarProps) => {
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
