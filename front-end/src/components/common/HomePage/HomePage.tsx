import { useNavigate } from 'react-router-dom'
import { AudioPlayer } from '../../AudioPlayer'
import { SongPlayer } from '../../SongPlayer'
import classes from './home-page.module.scss'

export interface HomePageProps {}

export const HomePage = (props: HomePageProps) => {
    const navigate = useNavigate()
    // const song = new Audio(
    //     `${API_URL}/tracks/${TRACK_ID}/stream?client_id=${API_KEY}`
    // )
    const song = new Audio(
        'https://cdns-preview-c.dzcdn.net/stream/c-c795fb94ac6cccfcfeed98bc542a33bd-5.mp3'
    )
    console.log('🚀 ~ HomePage ~ song:', song)
    return (
        <div className={classes.container}>
            <header>
                <h1>{'Welcome to your music player (:'}</h1>
            </header>
            <section>
                <h3
                    onClick={() => {
                        song.play()
                        // navigate('/song/:example')
                    }}
                >
                    play a song
                </h3>
            </section>
        </div>
    )
}
