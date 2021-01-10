import React from 'react'

class SurveyPlaylist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playlist: null
        }
    }

    componentDidMount() {
        this.setState({})
    }

    render() {
        return(
            <div>PLaylist go here</div>
        )
    }
}

export default SurveyPlaylist