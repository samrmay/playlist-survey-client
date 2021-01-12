import React from 'react'
import SurveyPlaylist from './SurveyPlaylist'
import {getSurveyById} from '../../../services/backend'
import styles from './styles.css'

class SurveyPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            survey: null,
            points: []
        }
    }

    async componentDidMount() {
        const response = await getSurveyById(this.props.surveyId)
        if (response.survey) {
            const newPoints = this.state.points
            for (let i in survey.trackRankings) {
                newPoints.push(0)
            }
            this.setState({survey: response.survey, points: newPoints})
        }
    }

    updatePoints(i, points) {
        this.setState(prevState => {
            const newPoints = prevState.points
            newPoints[i] = points
            return {points: newPoints}
        })
    }

    render() {
        const {survey} = this.state
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
                    playlistId={survey.playlistSpotifyId}
                    rankings={survey.trackRankings}/>
            </div>
        )
    }
}

export default SurveyPage