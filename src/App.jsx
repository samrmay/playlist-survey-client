import React from 'react'
import Body from './components/Body'
import Header from './components/Header'
import Footer from './components/Footer'
import styles from './styles.css'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className={styles.root}>
                <div>
                    <Header />
                    <Body />
                </div>
                <Footer />
            </div>
        )
    }
}

export default App