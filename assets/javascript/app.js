// On click event when submit button is clicked
$("#submitBtn").on("click", function() {
  event.preventDefault();

  // Variables for artist and song entered
  var artistName = $("#artistInput").val().trim();
  var songTitle = $("#songInput").val().trim();

  // Variable to store object
  var newArtistSong = {
    artist: artistName,
    song: songTitle
  };

  // Clear form
  $("#artistInput").val("");
  $("#songInput").val("");

  console.log(newArtistSong.artist);
  console.log(newArtistSong.song);

  // Prepend artist and song to table
  $("#artistSongTable > tbody").prepend("<tr><td>" + newArtistSong.artist + "</td><td>" + newArtistSong.song + "</td></tr>");

  // URL construct to search lyrics.ovh for artist and song
  var queryURL = "https://api.lyrics.ovh/v1/" + newArtistSong.artist + "/" + newArtistSong.song;

  // AJAX GET request
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  // When data returns from API
  .done(function(response) {
      console.log(response);

    // Store array of results
    // var results = response.data;
      console.log(response.lyrics);

    // Append to lyrics section
    $("#lyricsSection").append(response.lyrics);
      
    
  });     
});


