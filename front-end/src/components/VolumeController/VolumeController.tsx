import classes from './volume-controller.module.scss'

export interface VolumeControllerProps {
    setIsVolumeMuted: React.Dispatch<React.SetStateAction<boolean>>
    setVolume: React.Dispatch<React.SetStateAction<number>>
    volumeIcon: JSX.Element
    volumeRef: React.RefObject<HTMLInputElement>
}

export const VolumeController = ({
    setIsVolumeMuted,
    setVolume,
    volumeIcon,
    volumeRef,
}: VolumeControllerProps) => {
    return (
        <div className={classes.container}>
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
    )
}
