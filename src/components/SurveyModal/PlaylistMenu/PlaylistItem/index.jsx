import React from 'react'
import styles from './styles.css'

class PlaylistItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {playlist, border} = this.props
        console.log(playlist)
        return(
            <div className={styles.playlistItem}>
                <div className={styles.nameContainer}>{playlist.name}</div>
                {border ? <hr className={styles.border} /> : null}
            </div>
        )
    }
}

export default PlaylistItem