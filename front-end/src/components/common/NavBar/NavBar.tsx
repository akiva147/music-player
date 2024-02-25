import { useState } from 'react'
import { SearchInput } from '../SearchInput'
import classes from './nav-bar.module.scss'

export interface NavBarProps {}

export const NavBar = (props: NavBarProps) => {
    const [searchValue, setSearchValue] = useState('')

    return (
        <div className={classes.container}>
            <SearchInput
                onChange={(value) => {
                    console.log('🚀 ~ NavBar ~ value:', value)
                    setSearchValue(value.toString())
                }}
                value={searchValue}
                className="search"
                // variant="borderless"
            />
        </div>
    )
}
