import React from 'react'
import parseDate from '../../../../services/parseDate'
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
        const {survey, border} = this.props
        const dateFormat = new Date(survey.createdAt)
        const {year, month, day} = parseDate(dateFormat)
        const dateText = `${month}/${day}/${year}`
        return(
            <div className={styles.rootContainer}>
                <div onClick={this.handleClick} className={styles.itemContainer}>
                    <div className={styles.surveyName}>
                        {survey.name}
                    </div>
                    <div className={styles.surveyOwner}>
                        {survey.owner}
                    </div>
                    <div>
                        {dateText}
                    </div>
                </div>
                {border ? <hr className={styles.border} /> : null}
            </div>
        )
    }
}

SurveyItem.defaultProps = {
    border: true
}

export default SurveyItem