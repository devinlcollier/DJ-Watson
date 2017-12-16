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