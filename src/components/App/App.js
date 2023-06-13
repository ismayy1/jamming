import React from 'react'
import './App.css';

import Playlist from '../Playlist/Playlist'
import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'
import Track from '../Track/Track'
import Tracklist from '../Tracklist/Tracklist'
import Spotify from '../../util/Spotify'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: 'My Playlist',
      playlistTracks: []
      // { id: '1', name: 'Track 1', artist: 'Artist 1', album: 'Album 1', uri: 'https://open.spotify.com/playlist/37i9dQZF1DX4sWSpwq3LiO?si=9eb567bf40a24cde' },
      // { id: '2', name: 'Track 2', artist: 'Artist 2', album: 'Album 2', uri: 'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ?si=d5394b7546254a40' },
      // { id: '3', name: 'Track 3', artist: 'Artist 3', album: 'Album 3', uri: 'https://open.spotify.com/playlist/37i9dQZF1DX9sIqqvKsjG8?si=338c4b7570244688' }
    };
  }

  search = term => {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults })
    })
  }

  addTrackToPlaylist = (track) => {
    const newPlaylistTracks = [...this.state.playlistTracks, track];
    this.setState({ playlistTracks: newPlaylistTracks });
  }

  removeTrackFromPlaylist = (track) => {
    const newPlaylistTracks = this.state.playlistTracks.filter(t => t.id !== track.id);
    this.setState({ playlistTracks: newPlaylistTracks });
  }

  updatePlaylistName = (name) => {
    this.setState({ playlistName: name });
  }

  savePlaylist = () => {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    // TODO: Implement saving playlist to Spotify using the trackURIs
    console.log('Saving playlist:', trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: []
    });
  }

  render() {
    return (
      <div> 
        <h1>My Jammming Playlist</h1>
        <SearchBar onSearch={this.search} />
        <div >
          <SearchResults 
            searchResults={this.state.searchResults} 
            onAddTrack={this.addTrackToPlaylist} 
          />
          <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemoveTrack={this.removeTrackFromPlaylist}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist}
          />
        </div>
      </div>
    );
  }
}

export default App