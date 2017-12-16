// On click event when submit button is clicked
$("#submitBtn").on("click", function() {
    event.preventDefault();

    // Variables for artist and song entered
    var artistName = $("#artistInput").val().trim();
    var songTitle = $("#songInput").val().trim();

    // Clear lyrics
    $("#lyricsSection").empty();
    getLyrics(artistName, songTitle, function(lyrics){
        console.log(lyrics);
    });
    $("#lyricsSection").text("hello");

    // Clear form
    $("#artistInput").val("");
    $("#songInput").val("");

    // Prepend artist and song to table
    $("#artistSongTable > tbody").prepend("<tr><td>" + artistName + "</td><td>" + songTitle + "</td></tr>");
});

function getLyrics(artistName, songTitle, cb) {
    var ret = "";
    console.log(artistName);
    console.log(songTitle);
    if (artistName !== null && artistName !== "" && songTitle !== null && songTitle !== "") {
        console.log("running");
        var queryURL = "https://api.lyrics.ovh/v1/" + artistName + "/" + songTitle;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) { // When data returns from API
            // Append to lyrics section
            ret = response.lyrics;
            //console.log(ret);
            //$("#lyricsSection").text(ret);
            console.log(ret);
            cb(ret);
        });
    }
    
    //return ret;
}

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

function SplayButton(uri) { //builds a iframe from a track url(uri) return jquery object
    if (uri.indexOf("/track/") !== -1) {
        var play = $("<iframe>");
        play.attr("src", "https://open.spotify.com/embed?uri=spotify:track:" + uri.slice(uri.lastIndexOf("/") + 1));
        play.attr("width", "300");
        play.attr("height", "380");
        play.attr("frameborder", "0");
        play.attr("allowtransparency", "true");
        return play;
    }
}

$("#playbutton").append(SplayButton("https://open.spotify.com/track/0eFvoRSTTaR2q8bSWVjwfp"));