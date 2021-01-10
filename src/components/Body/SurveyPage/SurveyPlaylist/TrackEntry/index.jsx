import React from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.css'

class TrackEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDragging: false,
            top: null,
            bottom: null,
            height: null
        }
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
    }

    componentDidMount() {
        const rect = ReactDOM.findDOMNode(this).getBoundingClientRect()
        this.setState({top: rect.top, bottom: rect.bottom, height: rect.height})
    }

    stringifyArtists(artists) {
        if (artists.length == 0) {
            return artists[0].name
        }
        let result = artists[0].name
        for (let i=1;i<artists.length;i++) {
            result = `${result}, ${artists[i].name}`
        }
        return result
    }

    handleMouseDown(e) {
        if (e.button !== 0) return
        this.setState({isDragging: true})
    }

    handleMouseUp(e) {
        this.setState({isDragging: false})
    }

    handleMouseMove(e) {
        if (this.state.isDragging) {
            const y = e.pageY
            const {height, top} = this.state
            const lowerBound = top + (height*.75)
            const upperBound = top + (height*.25)
            if (y > lowerBound) {
                this.handleEntryMove(1)
            }
            if (y < upperBound) {
                this.handleEntryMove(-1)
            }
        }
    }

    handleEntryMove(increment) {
        this.props.incrementIndex(this.props.index, increment)
    }

    render() {
        const {track, border} = this.props
        const {name, artists, album} = track
        const albumLink = album.images[2].url
        const externalLink = track.external_urls.spotify
        const artistsString = this.stringifyArtists(artists)
        return (
        <div 
            className={styles.rootContainer}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseMove}>
            <div className={styles.songEntryContainer}>
                <div className={styles.coverContainer}>
                    <a href={externalLink} target='_blank'><img src={albumLink} alt='loading...'/></a>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.songName}>{name}</div>
                    <div className={styles.artistsString}>
                        {artistsString}
                    </div>
                </div>
            </div>
            {border ? <hr className={styles.border}/> : null}
        </div>)

    }
}

export default TrackEntry

TrackEntry.defaultProps = {
    header: false,
    index: -1,
    border: true
}