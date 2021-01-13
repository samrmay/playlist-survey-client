import React from 'react'
import styles from './styles.css'

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
            <div onClick={this.handleClick} className={styles.itemContainer}>
                {survey.name}
            </div>
        )
    }
}


export default SurveyItem