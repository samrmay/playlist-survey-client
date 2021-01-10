import React from 'react'
import PlaylistMenu from './PlaylistMenu'
import TextField from '../../TextField'
import LoadingButton from '../../LoadingButton'
import styles from './styles.css'

class CreateSurveyWindow extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {surveyName, playlists, selectedId, goClicked} = this.props

        return(
            <div>
                <div className={styles.inputContainer}>
                    <TextField 
                        name='surveyName' 
                        value={surveyName}
                        handleChange={this.props.handleChange}
                        width='300px'
                        placeholder='Survey name'/>
                </div>
                Don't see your playlist? Make it public!
                    Only public playlists work right now.
                    (Maybe eventually put a button to do that here)
                <PlaylistMenu 
                    playlists={playlists}
                    handleChange={this.props.handleChange}
                    selectedId={selectedId} />
                <LoadingButton 
                    content='create survey' 
                    width='150px'
                    handleClick={this.props.handleSurveyPost}
                    wasClicked={goClicked}/>
            </div>
        )
    }
}

export default CreateSurveyWindow