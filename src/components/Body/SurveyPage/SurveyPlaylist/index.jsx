import React from 'react'
import {getPlaylistById, getPlaylistTracks} from '../../../../services/backend'

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
            const tracks = await getPlaylistTracks(playlistId)
            this.setState({playlist, tracks})
        }
    }

    render() {
        return(
            <div>
                Playlist go here
            </div>
        )
    }
}

export default SurveyPlaylist