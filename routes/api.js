var express = require('express');
var router = express.Router();

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

/* GET users listing. */
router.get('/vodlist', function(req, res, next) {
  mixerClient.request('GET', 'channels/'+channelID+'/recordings').then( response => {
    res.send(response.body);
  });
});

module.exports = router;
