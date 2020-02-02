window.onSpotifyWebPlaybackSDKReady = () => {
  const token = 'BQCYvZw4LHZ76YG4FdHifqEYmpegn6BloLT5E8rMTR71kJ0a7yyVG-CjRfFIG9MDzYlKWuMI-aHQO-LB1RHfj8Qdt19lAETz2henNG8ieCUFXCxWLvkHlQFjx1btlXc82t9Wgwb-cKcNp9B0BfXqclpMMvrF_qezSFAdSXqjaLnSGaZzHZYunJo';
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
      console.log(current_track.duration_ms)
      var songUri = current_track;
      var nextTrack = next_track.name;
      var nextArtist = next_track.artists[0].name
      var songLength = current_track.duration_ms / 1000
      $('#songLength').text('Remaining Time: ' + songLength.toFixed())
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
          console.log(response)
          var songID = response.message.body.track_list[0].track.track_id
          var APIKey = '8a4f881b9f9554cf189d47b557a72783'
          var songLyricsUrl = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + songID + '&apikey=' + APIKey;

          $.ajax({
            url: songLyricsUrl,
            method: "GET",
          }).then(function (response) {
            var lyrics = response.message.body.lyrics.lyrics_body.replace('******* This Lyrics is NOT for Commercial use *******', '')
            var lyrics1 = lyrics.replace('(1409619067986)', 'Lyrics powered by Musixmatch©')
            
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