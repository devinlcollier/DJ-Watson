var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');
var http = require("http");
var url = require("url");

var text_to_speech = new TextToSpeechV1({
    username: "1105f215-a86f-48aa-8338-c5f1e31a7bde",
    password: "m51sXnXBJxXC"
});

const server = http.createServer(function(req, res) {
    console.log(req.url);
    if (req.url.includes("/speak?s=")) {
        var param = req.url.substring(req.url.indexOf("/speak?s=") + 9);
        if (param !== "" && param !== null) {
            param = param.replace("_", " ");
            console.log("param " + param);

            var params = {
                text: param,
                voice: "en-US_AllisonVoice",
                accept: "audio/mp3"
            };

            var d = new Date();
            var n = d.getTime();

            text_to_speech.synthesize(params).on('error', function(error) {
                console.log('Error:', error);
            }).pipe(fs.createWriteStream(n + ".mp3"));

            res.statusCode = 200;
            res.setHeader("Content-type", "text/plain");
            res.end("Success! " + param);
        }
    } else {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/plain");
        res.end("Hello World!");
    }
});

server.listen(3000, "127.0.0.1", function() {
    console.log("server started on port 3000");
});