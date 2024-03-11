import { useNavigate, useRouteError } from 'react-router-dom'
import classes from './error-page.module.scss'
import { Button } from 'antd'

export interface ErrorPageProps {}

export const ErrorPage = (props: ErrorPageProps) => {
    const navigate = useNavigate()
    const error = useRouteError() as Error
    console.error(error)

    return (
        <div className={classes.container}>
            <p>error occurred: {error.message}</p>
            <Button danger type="primary" onClick={() => navigate('/')}>
                return to home page
            </Button>
        </div>
    )
}
