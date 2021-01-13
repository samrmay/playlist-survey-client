import React from 'react'
import SurveyPlaylist from './SurveyPlaylist'
import {getPlaylistById, getPlaylistTracks, getSurveyById, putRankings} from '../../../services/backend'
import LoadingButton from '../../LoadingButton'
import styles from './styles.css'

class SurveyPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            survey: null,
            playlist: null,
            tracks: null,
            submitted: false
        }

        this.fillState = this.fillState.bind(this)
        this.updatePoints = this.updatePoints.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
                    const rankObj = survey.trackRankings.find(item => item.trackSpotifyId == track.track.id)
                    track.surveyRank = rankObj.trackRanking
                    track.surveyRankId = rankObj._id
                    track.points = 0
                }

                tracks.sort((a, b) => b.surveyRank - a.surveyRank)
                this.setState({survey, tracks, playlist})
                return true
            }
        }
    }

    updatePoints(i, points) {
        this.setState(prevState => {
            const newTracks = prevState.tracks
            newTracks[i].points = parseInt(points)
            return {tracks: newTracks}
        })
    }

    async handleSubmit() {
        this.setState({submitted: true})
        const {survey, tracks} = this.state
        const rankings = tracks.map(item => {return {_id: item.surveyRankId, points: item.points}})
        const response = await putRankings(survey._id, rankings)
        if (response) {
            console.log(response)
            this.setState({submitted: false})
        }
    }

    render() {
        const {survey, playlist, tracks, submitted} = this.state
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
                <LoadingButton 
                    content="submit"
                    width='100px'
                    handleClick={this.handleSubmit}
                    wasClicked={submitted} />
            </div>
        )
    }
}

export default SurveyPage