import classes from './controllers.module.scss'
import {
    StepBackwardOutlined,
    PauseCircleOutlined,
    PlayCircleOutlined,
    StepForwardOutlined,
} from '@ant-design/icons'
import { useControls } from './useControls'

export interface ControllersProps {
    audioRef: React.RefObject<HTMLAudioElement>
    progressBarRef: React.RefObject<HTMLInputElement>
    duration: number
    setTimeProgress: React.Dispatch<React.SetStateAction<number>>
    handleNext: () => void
    handlePrevious: () => void
}

export const Controllers = ({
    audioRef,
    progressBarRef,
    duration,
    setTimeProgress,
    handleNext,
    handlePrevious,
}: ControllersProps) => {
    const {
        getters: { isPlaying },
        setters: { setIsPlaying, setIsVolumeMuted, setVolume },
        volumeRef,
        volumeIcon,
    } = useControls(progressBarRef, audioRef, setTimeProgress, duration)

    return (
        <div className={classes.container}>
            <div className={classes.controls}>
                <button onClick={handlePrevious}>
                    <StepBackwardOutlined />
                </button>
                <button onClick={() => setIsPlaying((prev) => !prev)}>
                    {isPlaying ? (
                        <PauseCircleOutlined />
                    ) : (
                        <PlayCircleOutlined />
                    )}
                </button>
                <button onClick={handleNext}>
                    <StepForwardOutlined />
                </button>
            </div>
            <div className={classes.volume}>
                <button onClick={() => setIsVolumeMuted((prev) => !prev)}>
                    {volumeIcon}
                </button>
                <input
                    type="range"
                    min={0}
                    max={100}
                    ref={volumeRef}
                    onChange={(e) => setVolume(Number(e.target.value))}
                />
            </div>
        </div>
    )
}
