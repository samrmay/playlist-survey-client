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
            showSurveyModal: false,
            userAccessToken: null
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        if (window.location.hash) {
            const matchObj = window.location.hash.match(/access_token=(.+)&token_type/)
            if (matchObj[1]) {
                this.setState({userAccessToken: matchObj[1], showSurveyModal: true})
            }
        }
    }

    handleChange(name, value) {
        this.setState({[name]: value})
    }

    render() {
        const {showSurveyModal, userAccessToken} = this.state
        return(
            <div className={styles.root}>
                {showSurveyModal ? <SurveyModal token={userAccessToken}/> : null}
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