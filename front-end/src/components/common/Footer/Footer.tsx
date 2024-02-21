import classes from './footer.module.scss'

export interface FooterProps {}

export const Footer = (props: FooterProps) => {
    return <div className={classes.container}>This is the footer</div>
}
