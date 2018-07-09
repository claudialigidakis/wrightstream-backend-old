const {etsyOAuth} = require('../../../config/oauth.js')

module.exports.getSelf = (accessToken, accessTokenSecret) => {
  return new Promise((resolve, reject) => {
    etsyOAuth.get('https://openapi.etsy.com/v2/users/__SELF__', accessToken, accessTokenSecret, function(err, data, response) {
      if (err) return reject(err)
      resolve(JSON.parse(data).results)
    })
  })
}

module.exports.getStore = (userId, accessToken, accessTokenSecret) => {
  return new Promise((resolve, reject) => {
    etsyOAuth.get(`https://openapi.etsy.com/v2/users/${userId}/shops`, accessToken, accessTokenSecret,
    function(err, data, response) {
      if (err) return reject(err)
      resolve(JSON.parse(data).results)
    })
  })
}
