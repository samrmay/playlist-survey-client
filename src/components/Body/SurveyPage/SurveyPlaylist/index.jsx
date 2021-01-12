import React from 'react'
import TrackEntry from './TrackEntry'
import styles from './styles.css'

class SurveyPlaylist extends React.Component {
    constructor(props) {
        super(props)
    }

    generateTrackArr(tracks) {
        let tracksEntryArr = null
        if (tracks.length > 0) {
            tracksEntryArr = []
            for (let i in tracks) {
                if (tracks[i] !== null) {
                    const trackObj = tracks[i]
                    const track = trackObj.track
                    tracksEntryArr.push(
                        <TrackEntry 
                            track={track} 
                            key={`${track.id}${Date.now()}${i}`} 
                            index={i} 
                            border={i != (tracks.length-1)}
                            points={trackObj.points}
                            rank={trackObj.surveyRank}/>
                    )
                }
            }
        }
        return tracksEntryArr
    }

    

    render() {
        let tracksEntryArr = null
        const {tracks} = this.props
        if (tracks) {
            tracksEntryArr = this.generateTrackArr(tracks)
        }

        return(
            <div className={styles.playlistContainer}>
                {tracksEntryArr}
            </div>
        )
    }
}

export default SurveyPlaylist