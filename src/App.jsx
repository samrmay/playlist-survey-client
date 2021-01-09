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
            showSurveyModal: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(name, value) {
        this.setState({[name]: value})
    }

    render() {
        const {showSurveyModal} = this.state
        return(
            <div className={styles.root}>
                {showSurveyModal ? <SurveyModal /> : null}
                <div>
                    <Header handleChange={this.handleChange}/>
                    <Body />
                </div>
                <Footer />
            </div>
        )
    }
}

export default App