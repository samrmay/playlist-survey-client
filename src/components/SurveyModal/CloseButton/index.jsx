import React from 'react'
import styles from './styles.css'

class CloseButton extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {handleClose, width} = this.props
        const style = {width, height: width}

        return(
            <div 
                className={styles.buttonContainer} 
                style={style}
                onClick={handleClose}>
                x
            </div>
        )
    }
}

export default CloseButton

CloseButton.defaultProps = {
    handleClose: () => {},
    width: 30
}