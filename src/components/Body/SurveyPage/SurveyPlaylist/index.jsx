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

        this.incrementIndex = this.incrementIndex.bind(this)
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
                            border={i != (tracks.length-1)}
                            incrementIndex={this.incrementIndex}/>
                    )
                }
            }
        }
        return tracksEntryArr
    }

    incrementIndex(index, increment) {
        this.setState(prevState => {
            const tracks = prevState.tracks
            const item = tracks[index]
            const newIndex = parseInt(index)+parseInt(increment)
            tracks.splice(index, 1)
            tracks.splice(newIndex, 0, item)
            return {tracks}
        })
    }

    render() {
        let tracksEntryArr = null
        if (this.state.tracks) {
            tracksEntryArr = this.generateTrackArr(this.state.tracks)
        }

        return(
            <div className={styles.playlistContainer}>
                {tracksEntryArr}
            </div>
        )
    }
}

export default SurveyPlaylist