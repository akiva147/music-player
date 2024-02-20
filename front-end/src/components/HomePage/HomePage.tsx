import { SongPlayer } from '../SongPlayer'
import classes from './home-page.module.scss'

export interface HomePageProps {}

export const HomePage = (props: HomePageProps) => {
    return (
        <div className={classes.container}>
            <header>
                <h1>{'Welcome to your music player (:'}</h1>
            </header>
            <section>
                <h3>play a song</h3>
                <SongPlayer />
            </section>
        </div>
    )
}
