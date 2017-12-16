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

    // var results = response.data;
      console.log(response.lyrics);

    // Replace \n with <br>
    // var str = response.lyrics;
    // var re = "\n";
    // var newstr = str.replace(re, "<br>");
    // console.log(newstr);

    // Append to lyrics section
    $("#lyricsSection").append(response.lyrics);

  });

  // Clear lyrics
  $("#lyricsSection").empty();

  // Clear form
  $("#artistInput").val("");
  $("#songInput").val("");

  console.log(newArtistSong.artist);
  console.log(newArtistSong.song);

  // Prepend artist and song to table
  $("#artistSongTable > tbody").prepend("<tr><td>" + newArtistSong.artist + "</td><td>" + newArtistSong.song + "</td></tr>");


});

$("#sign-in").on("click", function() {
    var base_url = "https://accounts.spotify.com/authorize?";
    base_url += $.param({
        client_id: "6618f4e3f19a4d4d8cc41c05297e911b",
        response_type: "token",
        redirect_uri: "https://www.google.com/"
    });
    console.log(base_url);

    window.location.replace(base_url);
});

function Ssearch(accessToken, query) {
    if (accessToken !== null && accessToken !== "" && query !== null && query !== "") {
        var params = {
            q: query,
            type: "track,artist",
            market: "US"
        }

        $.ajax({
            url: "https://api.spotify.com/v1/search",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            success: function(response) {
                console.log(response);
            }
        });
    }
}

function SplayButton(uri) {
    if (uri.indexof("/track/") !== -1) {
        var play = $("<iframe>");
        play.attr("src", "https://open.spotify.com/embed?uri=spotify:track:" + uri.slice(uri.lastIndexOf("/")));
        play.attr("width", "300");
        play.attr("height", "380");
        play.attr("frameborder", "0");
        play.attr("allowtransparency", "true");
        return play;
    }
}