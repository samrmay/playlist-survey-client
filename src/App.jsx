import React from 'react'
import Body from './components/Body'
import Header from './components/Header'
import Footer from './components/Footer'
import SurveyModal from './components/SurveyModal'
import {getUserToken} from './services/backend'
import styles from './styles.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSurveyModal: false,
            userAccessToken: null,
            surveyId: null,
            hashPresent: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.checkHash = this.checkHash.bind(this)
    }

    componentDidMount() {
        this.checkHash()
    }

    async checkHash() {
        if (window.location.hash) {
            const surveyMatch = window.location.hash.match(/surveyid=(.+)/)
            if (surveyMatch && surveyMatch[1]) {
                this.setState({surveyId: surveyMatch[1]})
            }
        } else {
            this.setState({hashPresent: false})
        } 

        if (window.location) {
            const codeMatch = window.location.search.match(/code=(.+)/)
            if (codeMatch && codeMatch[1]) {
                const tokenResponse = await getUserToken(codeMatch[1])
                const {accessToken, refreshToken} = tokenResponse
                this.setState({userAccessToken: accessToken, refreshToken, showSurveyModal: true})
                return
            }
        } 
    }

    handleChange(name, value) {
        this.setState({[name]: value})
    }

    render() {
        const {showSurveyModal, userAccessToken, surveyId, hashPresent} = this.state
        return(
            <div className={styles.root}>
                {showSurveyModal ? <SurveyModal token={userAccessToken} handleChange={this.handleChange}/> : null}
                <div>
                    <Header handleChange={this.handleChange}/>
                    <Body 
                        surveyId={surveyId}
                        hashPresent={hashPresent}
                        checkHash={this.checkHash}/>
                </div>
                <Footer />
            </div>
        )
    }
}

export default App