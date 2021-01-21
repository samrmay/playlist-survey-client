import React from 'react'
import styles from './styles.css'

class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className={styles.footerContainer}>
                WIP! See github: <a href='https://github.com/samrmay/playlist-survey-client'>https://github.com/samrmay/playlist-survey-client</a>
            </div>
        )
    }
}

export default Footer