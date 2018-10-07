const ngrok = require('ngrok');
(async () => {
    await ngrok.authtoken('YOUR_TUNNEL_AUTHTOKEN')
})
