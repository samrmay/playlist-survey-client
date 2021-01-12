import React from 'react'
import SurveyPlaylist from './SurveyPlaylist'
import {getPlaylistById, getPlaylistTracks, getSurveyById} from '../../../services/backend'
import styles from './styles.css'

class SurveyPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            survey: null,
            playlist: null,
            tracks: null
        }

        this.fillState = this.fillState.bind(this)
        this.updatePoints = this.updatePoints.bind(this)
    }

    async componentDidMount() {
        const result = await this.fillState(this.props.surveyId)
        if (!result) {
            console.log('state not filled correctly')
        }
    }

    async fillState(surveyId) {
        const response = await getSurveyById(surveyId)
        if (response.survey) {
            const survey = response.survey
            const playlistId = response.survey.playlistSpotifyId
            const playlistResponse = await getPlaylistById(playlistId)
            if (playlistResponse.playlist) {
                const playlist = playlistResponse.playlist
                const tracksResponse = await getPlaylistTracks(playlistId)
                const tracks = tracksResponse.tracks.items
                
                for (let i in tracks) {
                    const track = tracks[i]
                    track.surveyRank = survey.trackRankings.find(item => item.trackSpotifyId == track.track.id).trackRanking
                    track.points = 0
                }

                tracks.sort((a, b) => a.surveyRank - b.surveyRank)
                this.setState({survey, tracks, playlist})
                return true
            }
        }
    }

    updatePoints(i, points) {
        this.setState(prevState => {
            const newTracks = prevState.tracks
            newTracks[i].points = points
            return {tracks: newTracks}
        })
    }

    render() {
        const {survey, playlist, tracks} = this.state
        if (!survey) {
            return (
                <div>loading...</div>
            )
        }
        return(
            <div>
                <h3>{survey.name}</h3> 
                <h5>by: {survey.owner}</h5>
                <SurveyPlaylist 
                    survey={survey}
                    tracks={tracks}
                    playlist={playlist}
                    updatePoints={this.updatePoints}/>
            </div>
        )
    }
}

export default SurveyPage