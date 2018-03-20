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

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
