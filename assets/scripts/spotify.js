<script>
window.onSpotifyWebPlaybackSDKReady = () => {
  const token = 'BQDK1vR48j68bTaCCOmOOUVjChln906MzA9YiH1ftpQAmdkWeP3YwRATKruAdcjlPpn2yDCsr5xD4tVBsw2hds7ttG5cCattlemGWmZHL4m5v2wVWl1EXbSWT7mVmHOR7d_RZ5CVzm4lXi7IMUVzIbobpDxNXfSn';
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => { cb(token); }
  });
//token BQBt3hsudfK6nr7x_Yi8YBfUU1AinYcyE-rIoYDUT97Xdu-_mql-ZLpFap8q7oVtUb3zqHGbByKLl73zVxh5OTiGDQXeP6x0tZ3G8YBYHTsmKrvg-iUx-5Nw0VCfcz1wcqFGLzdqCwq9j4wFsYHsl2yCSIyb_KLX

  // Error handling
  player.addListener('initialization_error', ({ message }) => { console.error(message); });
  player.addListener('authentication_error', ({ message }) => { console.error(message); });
  player.addListener('account_error', ({ message }) => { console.error(message); });
  player.addListener('playback_error', ({ message }) => { console.error(message); });

  var song;
  // Playback status updates
  player.addListener('player_state_changed', state => { 
    player.getCurrentState().then(state => {
        if (!state) {
            console.error('User is not playing music through the Web Playback SDK');
            return;
        }

        let {
            current_track,
            next_tracks: [next_track]
        } = state.track_window;

        //console.log('Currently Playing', current_track);
        var songUri = current_track;
        var songName = current_track.name;
        
        //console.log(songUri.id);
        //console.log(songName);
        song = songUri.id;
       // console.log('Playing Next', next_track);
        });
      //console.log(state); 
      var token = 'BQDK1vR48j68bTaCCOmOOUVjChln906MzA9YiH1ftpQAmdkWeP3YwRATKruAdcjlPpn2yDCsr5xD4tVBsw2hds7ttG5cCattlemGWmZHL4m5v2wVWl1EXbSWT7mVmHOR7d_RZ5CVzm4lXi7IMUVzIbobpDxNXfSn';
        //console.log(song);
        //https://api.spotify.com/spotify:track:6rqhFgbbKwnb9MLmUQDhG6
        $.ajax({        
            
            url: 'https://api.spotify.com/v1/tracks/'+song,
            headers: {
                'Authorization': 'Bearer ' + token
            },
            success: function(response) {
                console.log(response.name);
                console.log(response.artists[0].name);
            }
        });
  
  });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();

    
};

</script>