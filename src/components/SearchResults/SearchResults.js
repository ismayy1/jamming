import React from 'react'
import './SearchResults.css'

import Tracklist from '../Tracklist/Tracklist'

class SearchResults extends React.Component {
    
    addTrack = (track) => {
        this.props.onAddTrack(track)
    }
    
    render() {
        
        const searchResults = [
            { id: '1', name: 'Track 1', artist: 'Artist 1', album: 'Album 1' },
            { id: '2', name: 'Track 2', artist: 'Artist 2', album: 'Album 2' },
            { id: '3', name: 'Track 3', artist: 'Artist 3', album: 'Album 3' }
        ]

        return (
            <div>
                <h2>Search Results</h2>
                <Tracklist tracks={searchResults} onAdd={this.addTrack} isRemoval={false} />
            </div>
        )
    }

}

export default SearchResults;