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

mixerClient.request('GET', 'channels/xbl_stream_ip').then( response => { channelID = response.body.id; });

/* GET vod list */
router.get('/vodlist', function(req, res, next) {
  mixerClient.request('GET', 'channels/'+channelID+'/recordings?where=state:eq:AVAILABLE,order=createdAt:desc').then( response => {
    res.send(response.body);
  });
});

/* GET vod info */
router.get('/vod/:id', function(req, res, next) {
  mixerClient.request('GET', 'recordings/'+req.params.id).then( response => {
    res.send(response.body);
  });
});

/* GET actual thumbnail for vod */
router.get('/vod/:id/thumb', function(req, res, next){
  mixerClient.request('GET', 'recordings/'+req.params.id ).then( response => {
    var url = response.body.vods[0].baseUrl+'source.png';
    res.json({'url': url});
  });
});

/* GET actual video for vod */
router.get('/vod/:id/video', function(req, res, next){
  var url = '';
  if(req.params.id == 'latest'){
    mixerClient.request('GET', 'channels/'+channelID+'/recordings?where=state:eq:AVAILABLE,order=createdAt:desc').then( response => {
      // var url = response.body.vods[0].baseUrl+'source.mp4';
      var url = response.body[0];
      res.json(url);
    });
  }else{
    mixerClient.request('GET', 'recordings/'+req.params.id ).then( response => {
      var url = response.body.vods[0].baseUrl+'source.mp4';
      res.json({'url': url});
    });
  }
});

module.exports = router;
