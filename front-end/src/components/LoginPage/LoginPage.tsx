import { Button } from 'antd'
import classes from './login-page.module.scss'

export interface LoginPageProps {}

export const LoginPage = (props: LoginPageProps) => {
    return (
        <div>
            <header>
                <h1>Login Page (:</h1>
            </header>
            <Button>Login</Button>
        </div>
    )
}
