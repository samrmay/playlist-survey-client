import React from 'react'
import LoginPrompt from './LoginPrompt'
import CreateSurveyWindow from './CreateSurveyWindow'
import {getUserInfo, getUserPlaylists, postSurvey} from '../../services/backend'
import styles from './styles.css'

class SurveyModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            surveyName: '',
            userInfo: null,
            userPlaylists: null,
            selectedId: null,
            goClicked: false,
            surveyCreated: false,
            surveyId: null
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSurveyPost = this.handleSurveyPost.bind(this)
        this.goToSurvey = this.goToSurvey.bind(this)
    }

    async componentDidMount() {
        if (this.props.token) {
            const {token} = this.props
            const userInfo = await getUserInfo(token)
            const userPlaylists = await getUserPlaylists(token)
            if (!userInfo.error && !userPlaylists.error) {
                this.setState({
                    userInfo: userInfo.info, 
                    userPlaylists: userPlaylists.playlists
                })
            }
        }
    }

    handleChange(name, value) {
        this.setState({[name]: value})
    }

    async handleSurveyPost() {
        this.setState({goClicked: true})
        const {selectedId, surveyName} = this.state
        const {token} = this.props
        const response = await postSurvey(surveyName, selectedId, token)
        if (response.survey) {
            this.setState({
                goClicked: false, 
                surveyCreated: true,
                surveyId: response.survey._id
            })
        }
    }

    goToSurvey() {
        const newSurveyLink = process.env.REDIRECT_URI + '/#' + this.state.surveyId
        window.location = newSurveyLink
        window.location.reload()
    }

    render() {
        // Add close x in top left eventually
        const {token} = this.props
        const {
            userPlaylists, 
            userInfo, 
            selectedId, 
            surveyName, 
            goClicked,
            surveyCreated,
            surveyId} = this.state

        let displayName = 'loading...'
        let playlists = null
        try {
            displayName = userInfo.display_name
        } catch {}
        try {
            playlists = userPlaylists.items
        } catch{}

        if (!surveyCreated) {
            return(
                <div className={styles.modalContainer}>
                    <div className={styles.modalWindow}>
                        {token ? 
                            <div>Survey Owner: {displayName}
                                <CreateSurveyWindow 
                                    playlists={playlists}
                                    surveyName={surveyName}
                                    goClicked={goClicked}
                                    selectedId={selectedId}
                                    handleChange={this.handleChange}
                                    handleSurveyPost={this.handleSurveyPost}/>
                            </div> 
                        : <LoginPrompt />}
                    </div>
                </div>
            )
        }

        const newSurveyLink = process.env.REDIRECT_URI + '/#' + surveyId
        return(
            <div className={styles.modalContainer}>
                <div className={styles.modalWindow}>
                    Survey Created! Share the link below with whomever! 
                    The survey will also feature on the main feed.
                    <br />
                    <br />
                    {newSurveyLink}
                    <button onClick={this.goToSurvey}>go to survey</button>
                </div>
            </div>
        )
    }
}

export default SurveyModal