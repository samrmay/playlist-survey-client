import React from 'react'
import TrackEntry from './TrackEntry'
import styles from './styles.css'

class SurveyPlaylist extends React.Component {
    constructor(props) {
        super(props)
    }

    generateTrackArr(tracks, updatePoints) {
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
                            rank={trackObj.surveyRank}
                            updatePoints={updatePoints}/>
                    )
                }
            }
        }
        return tracksEntryArr
    }

    render() {
        let tracksEntryArr = null
        const {tracks, updatePoints} = this.props
        if (tracks) {
            tracksEntryArr = this.generateTrackArr(tracks, updatePoints)
        }

        return(
            <div className={styles.playlistContainer}>
                {tracksEntryArr}
            </div>
        )
    }
}

export default SurveyPlaylist