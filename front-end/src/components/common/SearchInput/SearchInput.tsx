import { useEffect, useState } from 'react'
import classes from './search-input.module.scss'
import { AutoComplete, Input } from 'antd'
import type { SearchProps } from 'antd/es/input'
import { option } from 'src/types/general.types'
const { Search } = Input

export interface SearchInputProps
    extends Omit<SearchProps, 'onChange' | 'autoComplete'> {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
    autoComplete?: boolean
    autoCompleteOptions?: option[]
    onAutoCompleteSelect?: (value: any) => void
}

export const SearchInput = ({
    value: initialValue,
    onChange,
    debounce = 500,
    autoComplete,
    autoCompleteOptions,
    onAutoCompleteSelect,
    ...props
}: SearchInputProps) => {
    const [value, setValue] = useState(initialValue)
    const { className, ...values } = props
    console.log('🚀 ~ className:', className)

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value)
        }, debounce)

        return () => clearTimeout(timeout)
    }, [value])

    if (autoComplete) {
        return (
            <AutoComplete
                options={autoCompleteOptions}
                popupClassName={classes.autoComplete}
                onSelect={(value, option) => {
                    if (onAutoCompleteSelect) onAutoCompleteSelect(option.value)
                }}
                value={value}
                className={classes[`${className}`]}
            >
                <Search
                    {...values}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </AutoComplete>
        )
    } else {
        return (
            <Search
                {...values}
                className={classes[`${className}`]}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        )
    }
}
