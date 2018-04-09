$(document).ready(function() {
    console.log("Latest VOD loading via AJAX");
    const CHANNEL_ID = '28189358';
    const MIXER_API_ENDPOINT = "https://mixer.com/api/v1/";
    const CHANNELS = 'channels/';
    const RECORDINGS = '/recordings';
    const VOD_LIST_SUFFIX = '?where=state:eq:AVAILABLE,order=createdAt:asc';
    const MIXER_VOD_PREFIX = 'https://mixer.com/xbl_stream_ip?vod=';
    const MIXER_THUMB_SUFFIX = '720.jpg';4
    $.ajax({
        url: MIXER_API_ENDPOINT+CHANNELS+CHANNEL_ID+RECORDINGS+VOD_LIST_SUFFIX
    }).then(function(response) {
      console.log("AJAX Data returned");
      console.log(response);
      $('#nowPlayingPlayer').attr('src', MIXER_VOD_PREFIX+response[0].id);
      response.forEach(function(cur, ind, arr){
        var baseUrl = cur.vods[0].baseUrl;
        var template = `
        <div class="" data-vodid="`+cur.id+`">
          <div class="">
            <a href="`+MIXER_VOD_PREFIX+cur.id+`" target="nowPlayingPlayer" id="vodLink" class="list-group-item list-group-item-action align-items-start">
              <img src="`+baseUrl+MIXER_THUMB_SUFFIX+`" class="img-thumbnail float-left" style="">
              <div id="vodlist" class="">&nbsp;</div><div class="h6">`+cur.id+': '+cur.name+`</div>
            </a>
          </div>
        </div>`;
        $('#vodPreview').append(template);
        });
      });
    });
/*
$.ajax({
  url: "http://10.10.10.2:8000/api/vods"
}).then(function(data) {
  console.log("Data returned");
  console.log(data.url)
  var response = JSON.parse(data);
  var vodind = 0;
  response.forEach(function(cur, ind, arr){
    $.ajax({
      url: "http://10.10.10.2:8000/api/vods/"+cur
    }).then(function(data){
      vods.innerHTML(data.url);
    })
    })
  })
})
})
*/
