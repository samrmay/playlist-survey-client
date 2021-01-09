import React from 'react'
import Body from './components/Body'
import Header from './components/Header'
import Footer from './components/Footer'

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <Header />
                <Body />
                <Footer />
            </div>
        )
    }
}

export default App