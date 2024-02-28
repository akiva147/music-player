import { useMemo, useState } from 'react'
import { SearchInput } from '../SearchInput'
import classes from './nav-bar.module.scss'
import { option } from 'src/types/general.types'
import { songService } from 'src/services/song.service'
import { Song, SongOption } from 'src/models/deezer'
import { useCurrentSong } from 'src/hooks/useCurrentSong'
import { useNavigate } from 'react-router'

export interface NavBarProps {}

export const NavBar = (props: NavBarProps) => {
    const [autoCompleteResults, setAutoCompleteResults] = useState<
        SongOption[]
    >([])
    const { setCurrentSong } = useCurrentSong()

    const autoCompleteOptions: option[] = useMemo(() => {
        if (autoCompleteResults.length === 0)
            return [{ label: 'results not found', value: undefined }]
        return autoCompleteResults.map(({ label, value }) => ({
            label,
            value: value.preview,
        }))
    }, [autoCompleteResults])

    const navigate = useNavigate()

    return (
        <div className={classes.container}>
            <SearchInput
                autoComplete
                autoCompleteOptions={autoCompleteOptions}
                onAutoCompleteSelect={(preview: string) => {
                    const currentSong = autoCompleteResults.find(
                        (s) => s.value.preview === preview
                    )
                    setCurrentSong(currentSong?.value)
                    if (!location.pathname.includes('song') && preview)
                        navigate(`/song/search`)
                }}
                onChange={async (value) => {
                    if (value.toString().trim().length === 0) return
                    const res = await songService.getAutoCompleteResults(
                        value.toString()
                    )
                    if (res === 'results not found') setAutoCompleteResults([])
                    else setAutoCompleteResults(res)
                }}
                onSearch={() => setCurrentSong(autoCompleteResults[0].value)}
                value=""
                className="search"
                placeholder="search song..."
                // variant="borderless"
            />
        </div>
    )
}
