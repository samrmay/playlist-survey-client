import React from 'react'
import TrackEntry from './TrackEntry'
import {getPlaylistById, getPlaylistTracks} from '../../../../services/backend'
import styles from './styles.css'

class SurveyPlaylist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playlist: null,
            tracks: []
        }
    }

    async componentDidMount() {
        const {playlistId} = this.props
        const response = await getPlaylistById(playlistId)
        if (response.playlist) {
            const playlist = response.playlist
            const tracksResponse = await getPlaylistTracks(playlistId)
            const tracks = tracksResponse.tracks.items
            this.setState({playlist, tracks})
        }
    }

    generateTrackArr(tracks) {
        let tracksEntryArr = null
        if (tracks.length > 0) {
            tracksEntryArr = []
            for (let i in tracks) {
                if (tracks[i] !== null) {
                    const track = tracks[i].track
                    tracksEntryArr.push(
                        <TrackEntry 
                            track={track} 
                            key={`${track.id}${Date.now()}${i}`} 
                            index={i} 
                            border={i != (tracks.length-1)}/>
                    )
                }
            }
        }
        return tracksEntryArr
    }

    render() {
        let tracksEntryArr = null
        const {tracks, trackRankings} = this.state
        if (tracks) {
            tracksEntryArr = this.generateTrackArr(tracks)
        }

        return(
            <div className={styles.playlistContainer}>
                {tracksEntryArr}
            </div>
        )
    }
}

export default SurveyPlaylist