const Spotify = {
    accessToken: '',
  
    getAccessToken() {
      if (this.accessToken) {
        return this.accessToken;
      }
  
      // Check if the access token is in the URL hash
      const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
      const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
  
      if (accessTokenMatch && expiresInMatch) {
        this.accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
  
        // Clear the access token from the URL after it expires
        window.setTimeout(() => {
          this.accessToken = '';
        }, expiresIn * 1000);
  
        // Clear the URL hash
        window.history.pushState('Access Token', null, '/');
        return this.accessToken;
      } else {
        const redirectUri = 'http://localhost:3000/'; // Replace with your redirect URI
        const clientId = 'YOUR_CLIENT_ID'; // Replace with your client ID
        const scope = 'playlist-modify-public'; // Specify required scopes
  
        // Redirect the user to Spotify authorization endpoint
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;
      }
    },

    search(term) {
        const accessToken = this.getAccessToken();
        const searchEndpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    
        return fetch(searchEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Request failed.');
        })
        .then(data => {
            if (data.tracks) {
              return data.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
              }));
            }
            return [];
        })
        .catch(error => {
            console.log(error);
            return [];
        });
    },

    savePlaylist(playlistName, trackURIs) {
        if (!playlistName || !trackURIs.length) {
          return;
        }
    
        const accessToken = this.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;
    
        // Get the user's Spotify user ID
        return fetch('https://api.spotify.com/v1/me', { headers: headers })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error('Request failed.');
          })
          .then(data => {
            userId = data.id;
    
            // Create a new playlist
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
              method: 'POST',
              headers: headers,
              body: JSON.stringify({ name: playlistName })
            })
            .then(response => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error('Request failed.');
            })
            .then(data => {
                const playlistId = data.id;
    
                // Add tracks to the new playlist
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                  method: 'POST',
                  headers: headers,
                  body: JSON.stringify({ uris: trackURIs })
                })
                  .then(response => {
                    if (response.ok) {
                        return response.json();
                      }
                      throw new Error('Request failed.');
                    })
                    .then(data => {
                      console.log('Playlist saved successfully:', data);
                    });
                });
            })
            .catch(error => {
              console.log(error);
            });
    }
  };
  
  export default Spotify;
  