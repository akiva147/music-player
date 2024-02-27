import { useState } from 'react'
import { SearchInput } from '../SearchInput'
import classes from './nav-bar.module.scss'
import { option } from 'src/types/general.types'
import { songService } from 'src/services/song.service'

export interface NavBarProps {}

export const NavBar = (props: NavBarProps) => {
    const [autoCompleteResults, setAutoCompleteResults] = useState<option[]>([])

    return (
        <div className={classes.container}>
            <SearchInput
                autoComplete
                onChange={async (value) => {
                    if (value.toString().trim().length === 0) return
                    await songService.getAutoCompleteResults(value.toString())
                    // setAutoCompleteResults(res)
                }}
                value=""
                className="search"
                // variant="borderless"
            />
        </div>
    )
}
