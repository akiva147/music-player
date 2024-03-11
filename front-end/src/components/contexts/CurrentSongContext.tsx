import { createContext, useState } from 'react'
import { Song } from 'src/models/deezer'

export interface CurrentSongContextProps {
    currentSong: Song | undefined
    setCurrentSong: React.Dispatch<React.SetStateAction<Song | undefined>>
}

export const CurrentSongContext = createContext<CurrentSongContextProps>({
    currentSong: undefined,
    setCurrentSong: () => {},
})

export interface CurrentSongProviderProps {
    children?: React.ReactNode
}

export const CurrentSongProvider: React.FC<CurrentSongProviderProps> = ({
    children,
}) => {
    const [currentSong, setCurrentSong] = useState<Song | undefined>(undefined)

    return (
        <CurrentSongContext.Provider
            value={{
                currentSong: currentSong,
                setCurrentSong: setCurrentSong,
            }}
        >
            {children}
        </CurrentSongContext.Provider>
    )
}
