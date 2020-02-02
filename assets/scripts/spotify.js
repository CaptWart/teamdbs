window.onSpotifyWebPlaybackSDKReady = () => {
  const token = 'BQAMRIGwsuWu8cZyXulpPQGDCeXX6pjBZv1j4ml5zscCehLdhl8FosKJDLC_hyWJFGftF_PT_8wVr4kHck2yhOvpzKsGsc8l-L7WOivdJbAF9bu1VAfYhEDWB5N2ERyALYnhWZgJEtKKd9Mr1LzdC6PAaE3rFXC4KCQL9E-FuwHO6ZihucXvRGU';
  const player = new Spotify.Player({
    name: 'Best Karaoke',
    getOAuthToken: cb => { cb(token); }
  });

  var song;
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
      var songUri = current_track;
      var nextTrack = next_track.name;
      var nextArtist = next_track.artists[0].name
      $('#nextSong').text('Next Song: ' + nextTrack + ' by ' + nextArtist)
      song = songUri.id;

    });

    $.ajax({
      url: 'https://api.spotify.com/v1/tracks/' + song,
      headers: {
        'Authorization': 'Bearer ' + token
      },
      success: function (response) {

        var artistName = response.artists[0].name
        var songName = response.name
        var searchQuery = artistName + " " + songName
        $('#currentSong').text('Current Song: ' + songName + ' by ' + artistName)

        var APIKey = 'd8787584df7098764cc35ab8cac2f60f'
        var songIdUrl = 'https://api.musixmatch.com/ws/1.1/track.search?s_track_rating=desc&q_track_artist=' + searchQuery + '&apikey=' + APIKey;

        $.ajax({
          url: songIdUrl,
          method: "GET",
        }).then(function (response) {
          var songID = response.message.body.track_list[0].track.track_id
          var APIKey = '8a4f881b9f9554cf189d47b557a72783'
          var songLyricsUrl = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + songID + '&apikey=' + APIKey;

          $.ajax({
            url: songLyricsUrl,
            method: "GET",
          }).then(function (response) {
            console.log(response)
            console.log(response.message.body.lyrics.lyrics_body)
            var lyrics = response.message.body.lyrics.lyrics_body.replace('******* This Lyrics is NOT for Commercial use *******', '')
            var lyrics1 = lyrics.replace('(1409619067986)', 'Lyrics powered by Musixmatch©')
            console.log(lyrics1)
            
            $('#lyrics').text(lyrics1)
          })
        })
      }
    });
  });
  
  player.connect();
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
  });
};