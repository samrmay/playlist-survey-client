import React from 'react'
import styles from './styles.css'

class Footer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className={styles.footerContainer}>Footer</div>
        )
    }
}

export default Footer