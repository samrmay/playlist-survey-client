import React from 'react'
import SurveyFeed from './SurveyFeed'
import SurveyPage from './SurveyPage'
import styles from './styles.css'

class Body extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {surveyId, hashPresent} = this.props
        return(
            <div className={styles.bodyContainer}>
                {hashPresent 
                    ? surveyId ? <SurveyPage surveyId={surveyId}/> : <div>loading...</div>
                    : <SurveyFeed />}
            </div>
        )
    }
}

export default Body