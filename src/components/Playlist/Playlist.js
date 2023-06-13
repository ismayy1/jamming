import React from 'react'
import './Playlist.css'

import Tracklist from '../Tracklist/Tracklist'

class Playlist extends React.Component {

    savePlaylist = () => {
        const trackURIs = this.props.playlistTracks.map(track => track.uri)
        // TODO: Implement saving playlist to Spotify using the trackURIs
        console.log('Saving playlist:', trackURIs)
    }

    resetPlaylist = () => {
        // TODO: Implement resetting the playlist in the web app
        console.log('Resetting playlist');
    }

    removeTrack = (track) => {
        this.props.onRemoveTrack(track)
    }

    handleNameChange = (e) => {
        this.props.onNameChange(e.target.value)
    }

    render() {
        
        // const playListTracks = [
        //     { id: '4', name: 'Playlist Track 1', artist: 'Artist 4', album: 'Album 4' },
        //     { id: '5', name: 'Playlist Track 2', artist: 'Artist 5', album: 'Album 5' },
        //     { id: '6', name: 'Playlist Track 3', artist: 'Artist 6', album: 'Album 6' }
        // ]

        return (
            <div>
                <input type='text' value={this.props.playlistName} onChange={this.handleNameChange} />
                
                <Tracklist tracks={this.props.playlistTracks} onRemove={this.removeTrack} isRemoval={true} />
                <button onClick={this.savePlaylist}>Save to Spotify</button>
                <button onClick={this.resetPlaylist}>Reset Playlist</button>
            </div>
        )
    }
}

export default Playlist;