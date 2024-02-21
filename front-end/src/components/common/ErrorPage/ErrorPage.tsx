import { useRouteError } from 'react-router-dom'
import classes from './error-page.module.scss'

export interface ErrorPageProps {}

export const ErrorPage = (props: ErrorPageProps) => {
    const error = useRouteError() as Error
    console.error(error)

    return (
        <div className={classes.container}>
            <p>אירעה שגיאה: </p>
            <p>{error.message}</p>
        </div>
    )
}
