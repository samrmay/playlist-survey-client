import React from 'react'
import styles from './styles.css'

class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className={styles.headerContainer}>
                <h2>Playlist Survey App thing</h2>
            </div>
        )
    }
}

export default Header