$(document).ready(function() {
    console.log("Latest VOD loading via AJAX");
    $.ajax({
        // url: "://xblstream.westus2.cloudapp.azure.com/"
        url: "http://10.10.10.2:8000/api/vod/latest/video"
    }).then(function(data) {
        console.log("Data returned");
        console.log(data.url);
        var video = $('#videoPlayer video')[0];
        video.src = data.url;
        video.load();
        video.play();
    });
});
