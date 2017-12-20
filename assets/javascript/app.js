var accessToken = "";
window.onload = function()
{
    var url = window.location.href;
    console.log(url);
    if(url.indexOf("#access_token=") !== -1)
    {
        accessToken = url.slice(url.indexOf("#access_token=") + 14, url.indexOf("&"));
        console.log(accessToken);
    }
}

var config = {
    apiKey: "AIzaSyCM0TWUJq7Z5tpL75pBGBIAXkxnAW8Ae54",
    authDomain: "dj-watson.firebaseapp.com",
    databaseURL: "https://dj-watson.firebaseio.com",
    projectId: "dj-watson",
    storageBucket: "",
    messagingSenderId: "596396478658"
};
firebase.initializeApp(config);
var database = firebase.database();

//onclick for song search
$("#searchBtn").on("click", function(){
    event.preventDefault();
    var search_str = $("#searchInput").val().trim();
    console.log(search_str);
    if(search_str !== null && search_str !== "")
    {
        Ssearch(accessToken, search_str);
        $("#searchInput").val("");
    }
});

// On click event when submit button is clicked
$("#submitBtn").on("click", function() {
    event.preventDefault();

    // Variables for artist and song entered
    var artistName = $("#artistInput").val().trim();
    var songTitle = $("#songInput").val().trim();

    // Clear lyrics
    $("#lyricsSection").empty();

    getLyrics(artistName, songTitle, function(lyrics) //get lyrics and display them on the page
        {
            console.log(lyrics);
            $("#lyricsSection").text(lyrics);
        });

    // Clear form
    $("#artistInput").val("");
    $("#songInput").val("");

    database.ref("recently_added").push({
        artist: artistName, 
        song: songTitle
    });

});

function getLyrics(artistName, songTitle, cb) //TO-DO add promise to this function and remove cb
{
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
/*
this function takes care of the spotify sign-in, add a button to the page with the id 'sign-in' in order to work
*/
$("#sign-in").on("click", function() {
    var base_url = "https://accounts.spotify.com/authorize?";
    base_url += $.param({
        client_id: "6618f4e3f19a4d4d8cc41c05297e911b",
        response_type: "token",
        redirect_uri: "https://devinlcollier.github.io/DJ-Watson/"
    });
    console.log(base_url);

    window.location.replace(base_url);
});

/*
this function searchs spotify for a song, query is the song title as a string
TO-DO add code to get the band name from the response JSON
*/
function Ssearch(accessToken, query) {
    if (accessToken !== null && accessToken !== "" && query !== null && query !== "") {
        var url = "https://api.spotify.com/v1/search?";
        url += $.param({
            q: query,
            type: "track,artist",
            market: "US"
        });

        $.ajax({
            url: url,
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            success: function(response) {
                console.log(response.tracks.items[0].artists[0].name);
                console.log(response.tracks.items[0].external_urls.spotify);
                $("#playbutton").html(SplayButton(response.tracks.items[0].external_urls.spotify));
            }
        });
    }
}

function SplayButton(uri) { //builds a iframe from a track url(uri) returns jquery object
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

$("#playbutton").html(SplayButton("https://open.spotify.com/track/0eFvoRSTTaR2q8bSWVjwfp")); //test code

database.ref("recently_added").on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
    var artistName = childSnapshot.val().artist;
    var songTitle = childSnapshot.val().song;
    console.log(artistName);
    console.log(songTitle);
    // Prepend artist and song to table
    $("#artistSongTable > tbody").prepend("<tr><td>" + artistName + "</td><td>" + songTitle + "</td></tr>");
});