var express = require('express');
var router = express.Router();

const Mixer = require('beam-client-node');
const mixerClient = new Mixer.Client(new Mixer.DefaultRequestRunner());

mixerClient.use(new Mixer.OAuthProvider(mixerClient, {
    tokens: {
        access: 'km6ZDUoHVFHWv8QdGngnfAssY2tKyuOdyFaen8NfkioxJWIzPDTPuszn95gYFfyv',
        expires: Date.now() + (365 * 24 * 60 * 60 * 1000)
    },
}));

mixerClient.request('GET', 'channels/xbl_stream_ip').then( response => {
  console.log(response.body);
}
);

/* GET users listing. */
router.get('/vodlist', function(req, res, next) {
  // mixerClient.request('GET', 'channels//recordings')

  res.send('respond with a resource');
});

module.exports = router;
