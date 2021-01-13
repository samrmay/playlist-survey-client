import React from 'react'

class SurveyItem extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        window.location.hash = 'surveyid=' + this.props.survey._id
        window.location.reload()
    }

    render() {
        const {survey} = this.props
        return(
            <div onClick={this.handleClick}>
                {survey.name}
            </div>
        )
    }
}


export default SurveyItem