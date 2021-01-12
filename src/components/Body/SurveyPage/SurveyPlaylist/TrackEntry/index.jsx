import React from 'react'
import Loading from '../../../../../assets/loading.svg'
import styles from './styles.css'

class TrackEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            localPoints: 0
        }
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handlePointsChange = this.handlePointsChange.bind(this)
    }

    componentDidMount() {
        this.setState({localPoints: this.props.points})
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

    handlePointsChange(e) {
        this.setState({localPoints: e.target.value})
    }

    handleMouseUp(e) {
        const {name, value} = e.target
        this.props.updatePoints(name, value)
    }

    render() {
        const {track, border, index, rank} = this.props
        const {name, artists, album} = track

        let albumImage = <Loading alt='loading'/>
        try {
            albumImage = <img src={album.images[2].url} alt='loading' />
        } catch {}
            
        const externalLink = track.external_urls.spotify
        const artistsString = this.stringifyArtists(artists)


        return (
        <div 
            className={styles.rootContainer}>
            <div className={styles.songEntryContainer}>
                <div className={styles.coverContainer}>
                    <a href={externalLink} target='_blank'>{albumImage}</a>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.songName}>{name}</div>
                    <div className={styles.artistsString}>
                        {artistsString}
                    </div>
                    <label>{rank}</label>
                    <input 
                        type='range' 
                        min='0' 
                        max='10' 
                        step='1'
                        name={index}
                        value={this.state.localPoints}
                        onChange={this.handlePointsChange}
                        onMouseUp={this.handleMouseUp}/>
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