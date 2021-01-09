import React from 'react'
import PlaylistItem from './PlaylistItem'
import styles from './styles.css'

class PlaylistMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    handleNext() {}

    render() {
        const {playlists} = this.props
        let playlistItems = null
        if (playlists) {
            playlistItems = playlists.map((item, index) => {
                return(
                    <PlaylistItem 
                        playlist={item} 
                        key={index} 
                        border={true}/>
                )
            })
        }
        return(
            <div className={styles.playlistMenu}>
                {playlistItems || 'loading...'}
            </div>
        )
    }
}

export default PlaylistMenu