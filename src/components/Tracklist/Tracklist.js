import React from 'react'
import './Tracklist.css'

import Track from '../Track/Track'

class Tracklist extends React.Component {
    render() {
        return (
            <div>
                {this.props.tracks.map(track => (
                    <Track 
                        key={track.id} 
                        track={track} 
                        onAdd={this.props.onAdd} 
                        onRemove={this.props.onRemove} 
                        isRemoval={this.props.isRemoval} 
                    />
                ))}
            </div>
        )
    }
}

export default Tracklist;