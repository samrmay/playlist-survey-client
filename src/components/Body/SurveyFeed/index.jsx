import React from 'react'
import SurveyItem from './SurveyItem'
import {getTopSurveys} from '../../../services/backend'
import styles from './styles.css'

class SurveyFeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            surveys: null
        }
        this.generateSurveyItems = this.generateSurveyItems.bind(this)
    }

    async componentDidMount() {
        const surveys = await getTopSurveys()
        this.setState({surveys: surveys.surveys})
    }

    generateSurveyItems(surveys) {
        return surveys.map((item, i) => {
            return <SurveyItem 
                survey={item}
                key={i}/>
        })
    }

    render() {
        const {surveys} = this.state
        let surveyElems = <div>Loading...</div>
        if (surveys) {
            surveyElems = this.generateSurveyItems(surveys)
        }
        return(
            <div className={styles.surveyFeedContainer}>
                <div className={styles.surveyFeed}>
                    <div className={styles.headerContainer}>
                        <h3>Surveys:</h3>
                    </div>
                    <div className={styles.itemsContainer}>
                        {surveyElems}
                    </div>
                </div>
            </div>
        )
    }
}

export default SurveyFeed