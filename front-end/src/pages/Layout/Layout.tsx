import { Outlet, useNavigation } from 'react-router-dom'
import classes from './layout.module.scss'
import { Spin } from 'antd'
import { LoadingOutlined, UpOutlined } from '@ant-design/icons'
import { NavBar } from 'src/components/NavBar'
import { Footer } from 'src/components/Footer'

export interface LayoutProps {}

export const LoadingIcon = <LoadingOutlined spin={true} size={16} />

export const Layout = (props: LayoutProps) => {
    const navigation = useNavigation()
    return (
        <div className={classes.container}>
            {navigation.state === 'loading' && <Spin indicator={LoadingIcon} />}
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}
