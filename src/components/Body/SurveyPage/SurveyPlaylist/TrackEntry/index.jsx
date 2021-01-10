import React from 'react'
import styles from './styles.css'

class TrackEntry extends React.Component {
    constructor(props) {
        super(props)
    }

    stringifyArtists(artists) {
        if (artists.length == 0) {
            return artists[0].name
        }
        let result = artists[0].name
        for (let i=1;i<artists.length;i++) {
            result = `${result}, ${artists[i].name}`
        }
        return result
    }

    render() {
        const {track, border} = this.props
        const {name, artists, album} = track
        const albumLink = album.images[2].url
        const externalLink = track.external_urls.spotify
        const artistsString = this.stringifyArtists(artists)
        return (
        <div className={styles.rootContainer}>
            <div className={styles.songEntryContainer}>
                <div className={styles.coverContainer}>
                    <a href={externalLink} target='_blank'><img src={albumLink} alt='loading...'/></a>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.songName}>{name}</div>
                    <div className={styles.artistsString}>
                        {artistsString}
                    </div>
                </div>
            </div>
            {border ? <hr className={styles.border}/> : null}
        </div>)

    }
}

export default TrackEntry

TrackEntry.defaultProps = {
    header: false,
    index: -1,
    border: true
}