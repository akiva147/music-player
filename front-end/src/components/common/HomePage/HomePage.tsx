import { useNavigate } from 'react-router-dom'
import { AudioPlayer } from '../../AudioPlayer'
import { SongPlayer } from '../../SongPlayer'
import classes from './home-page.module.scss'

export interface HomePageProps {}

export const HomePage = (props: HomePageProps) => {
    const navigate = useNavigate()

    return (
        <div className={classes.container}>
            <header>
                <h1>{'Welcome to your music player (:'}</h1>
            </header>
            <section>
                <h3 onClick={() => navigate('/song/:example')}>play a song</h3>
            </section>
        </div>
    )
}
