import React from 'react'
import Body from './components/Body'
import Header from './components/Header'
import Footer from './components/Footer'
import SurveyModal from './components/SurveyModal'
import styles from './styles.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSurveyModal: false,
            userAccessToken: null,
            surveyId: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        if (window.location.hash) {
            const tokenMatch = window.location.hash.match(/access_token=(.+)&token_type/)
            if (tokenMatch && tokenMatch[1]) {
                this.setState({userAccessToken: tokenMatch[1], showSurveyModal: true})
                return
            }

            const surveyMatch = window.location.hash.match(/surveyid=(.+)/)
            if (surveyMatch && surveyMatch[1]) {
                this.setState({surveyId: surveyMatch[1]})
            }
        }
    }

    handleChange(name, value) {
        this.setState({[name]: value})
    }

    render() {
        const {showSurveyModal, userAccessToken, surveyId} = this.state
        return(
            <div className={styles.root}>
                {showSurveyModal ? <SurveyModal token={userAccessToken} handleChange={this.handleChange}/> : null}
                <div>
                    <Header handleChange={this.handleChange}/>
                    <Body surveyId={surveyId}/>
                </div>
                <Footer />
            </div>
        )
    }
}

export default App