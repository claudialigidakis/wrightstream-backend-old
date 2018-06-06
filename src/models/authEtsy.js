const db = require('../../db')
const { etsyOAuth } = require('../../config/oauth.js')

function getOAuthRequestToken(shops_id){
  return new Promise((resolve, reject) => {
    etsyOAuth.getOAuthRequestToken(function(err, token, tokenSecret, options){
      if(err) return reject(err)
      resolve({token, tokenSecret, options})
    })
  })
  .catch(err => {
    throw err
  })
}

async function getOAuthAccessToken(shops_id, requestToken, requestVerifier){
  try{
    const shop = await db('shops').where({id:shops_id}).first()

    return new Promise((resolve, reject) => {
      etsyOAuth.getOAuthAccessToken(requestToken, shop.tokenSecret, requestVerifier,
        function(err, oauth_access_token, oauth_access_token_secret, results) {
          if(err) return reject(err)
          resolve({ accessToken: oauth_access_token, accessTokenSecret: oauth_access_token_secret})
        })
      }
    ).catch(err => {
      throw err
    })
  }
  catch(err){
    throw err
  }
}

function setAccessToken(shops_id, accessToken, accessTokenSecret){
  return db('shops')
  .update({accessToken, accessTokenSecret})
  .where({ id: shops_id })
  .returning('*')
  .then(([data]) => {
    return data
  })
}

module.exports = {
  getOAuthRequestToken,
  getOAuthAccessToken,
  setAccessToken
}
