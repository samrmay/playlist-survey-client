import React from 'react'
import {getSurveyById} from '../../../services/backend'
import styles from './styles.css'

class SurveyPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {survey: null}
    }

    async componentDidMount() {
        const survey = await getSurveyById(this.props.surveyId)
        console.log(survey)
        this.setState({survey})
    }

    render() {
        return(
            <div>Survey!</div>
        )
    }
}

export default SurveyPage