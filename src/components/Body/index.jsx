import React from 'react'
import SurveyFeed from './SurveyFeed'
import SurveyPage from './SurveyPage'
import styles from './styles.css'

class Body extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {surveyId} = this.props
        return(
            <div className={styles.bodyContainer}>
                {surveyId 
                    ? <SurveyPage surveyId={surveyId}/> 
                    : <SurveyFeed />}
            </div>
        )
    }
}

export default Body