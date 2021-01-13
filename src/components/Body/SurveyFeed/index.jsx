import React from 'react'
import {getTopSurveys} from '../../../services/backend'

class SurveyFeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            surveys: null
        }
    }

    async componentDidMount() {
        const surveys = await getTopSurveys()
        this.setState({surveys})
    }

    render() {
        return(
            <div>Survey feed coming soon! Say goodbye to dumb links
                that seemed like a good idea when I started.
            </div>
        )
    }
}

export default SurveyFeed