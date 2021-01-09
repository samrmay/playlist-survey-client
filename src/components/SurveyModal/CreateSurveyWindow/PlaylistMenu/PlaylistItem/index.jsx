import React from 'react'
import styles from './styles.css'

class PlaylistItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.handleSelect(this.props.playlist.id)
    }

    render() {
        const {playlist, border, selected} = this.props
        const style = {}
        if (selected) {
            style.color = 'red'
        }
        return(
            <div className={styles.playlistItem} style={style} onClick={this.handleClick}>
                <div className={styles.nameContainer}>{playlist.name}</div>
                {border ? <hr className={styles.border} /> : null}
            </div>
        )
    }
}

export default PlaylistItem