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
            surveyCreated: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSurveyPost = this.handleSurveyPost.bind(this)
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
        await postSurvey(surveyName, selectedId, token)
        this.setState({goClicked: false})
    }

    render() {
        // Add close x in top left eventually
        const {token} = this.props
        const {userPlaylists, userInfo, selectedId, surveyName, goClicked} = this.state

        let displayName = 'loading...'
        let playlists = null
        try {
            displayName = userInfo.display_name
        } catch {}
        try {
            playlists = userPlaylists.items
        } catch{}

        if (token) {
            return(
            <div className={styles.modalContainer}>
                <div className={styles.modalWindow}>
                    Survey Owner: {displayName}
                    <CreateSurveyWindow 
                        playlists={playlists}
                        surveyName={surveyName}
                        goClicked={goClicked}
                        selectedId={selectedId}
                        handleChange={this.handleChange}
                        handleSurveyPost={this.handleSurveyPost}/>
                </div>
            </div>
            )
        }
        
        // If no token, show login window
        return(
            <div className={styles.modalContainer}>
                <div className={styles.modalWindow}>
                    <LoginPrompt />
                </div>
            </div>
        )
    }
}

export default SurveyModal