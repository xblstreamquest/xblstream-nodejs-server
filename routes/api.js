var express = require('express');
var router = express.Router();

/* attach to the mixer api endpoint and get our channel */
const Mixer = require('beam-client-node');
const mixerClient = new Mixer.Client(new Mixer.DefaultRequestRunner());

var channelID = '';

mixerClient.use(new Mixer.OAuthProvider(mixerClient, {
    tokens: {
        access: 'km6ZDUoHVFHWv8QdGngnfAssY2tKyuOdyFaen8NfkioxJWIzPDTPuszn95gYFfyv',
        expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
    },
}));

/* Get channelID by channel name */
mixerClient.request('GET', 'channels/xbl_stream_ip').then( response => { channelID = response.body.id; });

/* GET vod list by channelID*/
router.get('/vods', function(req, res, next) {
  mixerClient.request('GET', 'channels/'+channelID+'/recordings?where=state:eq:AVAILABLE,order=createdAt:desc').then( response => {
    res.send(response.body);
  });
});

/* GET vod info by vodID */
router.get('/vods/:id', function(req, res, next) {
  mixerClient.request('GET', 'recordings/'+req.params.id).then( response => {
    res.send(response.body);
  });
});

/* GET thumbnail for vod by vodID */
router.get('/vods/:id/thumbnail', function(req, res, next){
  mixerClient.request('GET', 'recordings/'+req.params.id ).then( response => {
    var url = response.body.vods.id.baseUrl+'720.jpg';
    res.json({'url': url});
  });
});

/* GET actual video for vod */
router.get('/vod/:id/video', function(req, res, next){
  var url = '';
  if(req.params.id == 'latest'){
    mixerClient.request('GET', 'channels/'+channelID+'/recordings?where=state:eq:AVAILABLE,order=createdAt:desc').then( response => {
      // blob:https://mixer.com/c9db2dfd-0bc9-4689-b01d-7f45748048b

      //var url = 'blob:https://mixer.com/'+response.body[0].vods[0].baseUrl.split('/')[4];
      // var url = response.body[0].vods[0].baseUrl+'manifest.m3u8'
	var url = "";
      res.json({'url': url});
    });
  }else{
    mixerClient.request('GET', 'recordings/'+req.params.id ).then( response => {
      var url = response.body.vods[0].baseUrl+'source.mp4';
      res.json({'url': url});
    });
  }
});

module.exports = router;
