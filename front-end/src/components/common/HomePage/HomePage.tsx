import { useNavigate } from 'react-router-dom'
import { AudioPlayer } from '../../AudioPlayer'
import { SongPlayer } from '../../SongPlayer'
import classes from './home-page.module.scss'

export interface HomePageProps {}

export const HomePage = (props: HomePageProps) => {
    const API_URL = 'https://api.soundcloud.com'
    const TRACK_ID = '123' // Replace with the track ID you want to play
    const API_KEY = 'your_api_key_here' // Replace with your SoundCloud API key

    const navigate = useNavigate()
    // const song = new Audio(
    //     `${API_URL}/tracks/${TRACK_ID}/stream?client_id=${API_KEY}`
    // )
    const song = new Audio('https://www.deezer.com/track/72160317')
    console.log('🚀 ~ HomePage ~ song:', song)
    // song.play()
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
