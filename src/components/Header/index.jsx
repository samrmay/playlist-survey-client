import React from 'react'
import styles from './styles.css'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.handleCreateSurvey = this.handleCreateSurvey.bind(this)
    }

    handleCreateSurvey() {
        this.props.handleChange('showSurveyModal', true)
    }

    render() {
        return(
            <div className={styles.headerContainer}>
                <a href={process.env.REDIRECT_URI} className={styles.headerLink}>
                    <h2>Playlist Survey App thing</h2>
                </a>
                <button onClick={this.handleCreateSurvey} >Create Survey</button>
            </div>
        )
    }
}

export default Header