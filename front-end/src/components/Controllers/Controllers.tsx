import classes from './controllers.module.scss'

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
            <img
                src="/skip_prev.svg"
                alt="skip prev"
                onClick={handlePrevious}
            />
            {isPlaying ? (
                <img
                    src="/pause_circle.svg"
                    alt="pause circle"
                    onClick={() => setIsPlaying((prev) => !prev)}
                />
            ) : (
                <img
                    src="/play_circle.svg"
                    alt="play circle"
                    onClick={() => setIsPlaying((prev) => !prev)}
                />
            )}

            <img src="/skip_next.svg" alt="skip next" onClick={handleNext} />
        </div>
    )
}
