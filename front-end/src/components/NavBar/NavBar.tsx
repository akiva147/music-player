import classes from './nav-bar.module.scss'

export interface NavBarProps {}

export const NavBar = (props: NavBarProps) => {
    return <div className={classes.container}>This is the nav bar</div>
}
