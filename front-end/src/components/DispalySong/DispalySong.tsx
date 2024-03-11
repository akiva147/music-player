import { Song } from 'src/models/deezer'
import classes from './dispaly-song.module.scss'

export interface DispalySongProps {
    currentSong: Song
    audioRef: React.RefObject<HTMLAudioElement>
    handleNext: () => void
    onLoadedMetadata: () => void
}

export const DispalySong = ({
    currentSong,
    audioRef,
    handleNext,
    onLoadedMetadata,
}: DispalySongProps) => {
    return (
        <div className={classes.container}>
            <audio
                src={currentSong.preview}
                ref={audioRef}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={handleNext}
            />
            <div className={classes['audio-info']}>
                <div className={classes['audio-image']}>
                    {currentSong.album.cover_big ? (
                        <img
                            src={currentSong.album.cover_big}
                            alt="audio avatar"
                        />
                    ) : (
                        <div className={classes['icon-wrapper']}>
                            <span className={classes['audio-icon']}>
                                <img src={'/music_note.png'} alt="music note" />
                            </span>
                        </div>
                    )}
                </div>
                <div className={classes.text}>
                    <p className={classes.title}>{currentSong.title}</p>
                    <p>{currentSong.artist.name}</p>
                </div>
            </div>
        </div>
    )
}
