import React from 'react'
import LoadingButton from '../../LoadingButton'
import styles from './styles.css'

class LoginPrompt extends React.Component {
    constructor(props) {
        super(props)
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