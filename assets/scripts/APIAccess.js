function songSearch() {
  event.preventDefault()
  
  var searchQuery = $('#songName').val()
  var geniusToken = 'rZaFmyo9T2NFq1V9YhxMdXW2J2ESf8HVhYJR4DD0iyvNY-lby73p4dQIQIaUAGNH'
  var geniusURL = 'https://api.genius.com/search?access_token=' + geniusToken + '&q=' + searchQuery + '&per_page=1'

  $.ajax({
    url: geniusURL,
    method: "GET"
  }).then(function (response) {
    var lyricURL = response.response.hits[0].result.url
    var lyricLink = $('#lyricLink')

    lyricLink.attr('href', lyricURL)
    
    console.log(lyricURL)
    console.log(searchQuery)
  })
}

$('#search').click(function (){
  $('#submit').removeClass('hidden')
})

$('#submit').click(function (){
  $('#submit').addClass('hidden')
})




