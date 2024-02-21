import classes from './controllers.module.scss'
import {
    StepBackwardOutlined,
    PauseCircleOutlined,
    PlayCircleOutlined,
    StepForwardOutlined,
} from '@ant-design/icons'
import { useControllers } from '../AudioPlayer/useControllers'

export interface ControllersProps {
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
    isPlaying: boolean
    handleNext: () => void
    handlePrevious: () => void
}

export const Controllers = ({
    setIsPlaying,
    isPlaying,
    handleNext,
    handlePrevious,
}: ControllersProps) => {
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
        </div>
    )
}
