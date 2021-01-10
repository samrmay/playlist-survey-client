import React from 'react'
import PlaylistItem from './PlaylistItem'
import styles from './styles.css'

class PlaylistMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleNext() {}

    handleSelect(id) {
        this.props.handleChange('selectedId', id)
    }

    render() {
        // Currently only displays 20 most recent (and only public)
        const {playlists, selectedId} = this.props
        let playlistItems = null
        if (playlists) {
            playlistItems = playlists.map((item, index) => {
                if (item.public) {
                    return(
                        <PlaylistItem 
                            playlist={item} 
                            handleSelect={this.handleSelect}
                            key={index} 
                            border={true}
                            selected={item.id == selectedId}/>
                    )
                }
            })
            playlistItems = playlistItems.filter(item => item)
        }
        return(
            <div className={styles.playlistMenu}>
                <div>Header</div>
                {playlistItems || 'loading...'}
                <div>Footer menu</div>
            </div>
        )
    }
}

export default PlaylistMenu