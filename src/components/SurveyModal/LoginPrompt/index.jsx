import React from 'react'
import LoadingButton from '../../LoadingButton'
import {getRedirectURI} from '../../../services/backend'
import styles from './styles.css'

class LoginPrompt extends React.Component {
    constructor(props) {
        super(props)
    }

    async handleSpotifyAuth() {
        const redirectObj = await getRedirectURI()
        window.location = redirectObj.authURL
    }

    render() {
        return(
            <div>
                We need to log in to Spotify to create a playlist survey. Log in. or don't. 
                    Not like I care.
                    <LoadingButton 
                        handleClick={this.handleSpotifyAuth} 
                        content='log in'
                        width='150px'/>
            </div>
        )
    }
}

export default LoginPrompt