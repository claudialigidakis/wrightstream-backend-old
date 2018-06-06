const { etsyOAuth } = require('../../config/oauth.js')

function getSelf(req, res, next){
  etsyOAuth.get('https://openapi.etsy.com/v2/users/__SELF__', req.etsyTokens.accessToken, req.etsyTokens.accessTokenSecret, function(err, data, response) {
      if (err) return next(err)

      res.send(data)
    })
}



module.exports = {
  getSelf
}
