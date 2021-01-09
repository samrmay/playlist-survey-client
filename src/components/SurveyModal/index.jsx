import React from 'react'
import LoadingButton from '../LoadingButton'
import TextField from '../TextField'
import PlaylistMenu from './PlaylistMenu'
import {getUserInfo, getUserPlaylists} from '../../services/backend'
import {getRedirectURI} from '../../services/backend'
import styles from './styles.css'

class SurveyModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            surveyName: '',
            userInfo: null,
            userPlaylists: null,
        }
    }

    async componentDidMount() {
        if (this.props.token) {
            const {token} = this.props
            const userInfo = await getUserInfo(token)
            const userPlaylists = await getUserPlaylists(token)
            if (!userInfo.error && !userPlaylists.error) {
                this.setState({
                    userInfo: userInfo.info, 
                    userPlaylists: userPlaylists.playlists
                })
            }
        }
    }

    async handleSpotifyAuth() {
        const redirectObj = await getRedirectURI()
        window.location = redirectObj.authURL
    }

    render() {
        // Add close x in top left eventually
        const {token} = this.props
        const {userPlaylists, userInfo} = this.state

        let displayName = 'loading...'
        let playlists = null
        try {
            displayName = userInfo.display_name
        } catch {}
        try {
            playlists = userPlaylists.items
        } catch{}

        if (token) {
            return(
                <div className={styles.modalContainer}>
                <div className={styles.modalWindow}>
                    Survey Owner: {displayName}
                    <PlaylistMenu playlists={playlists} border={true}/>
                </div>
            </div>
            )
        }
        return(
            <div className={styles.modalContainer}>
                <div className={styles.modalWindow}>
                    We need to log in to Spotify to create a playlist survey. Log in. or don't. 
                    Not like I care.
                    <LoadingButton handleClick={this.handleSpotifyAuth} content='log in'/>
                </div>
            </div>
        )
    }
}

export default SurveyModal