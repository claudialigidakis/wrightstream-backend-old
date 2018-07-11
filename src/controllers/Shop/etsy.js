const {etsyOAuth} = require('../../../config/oauth.js')
const knex = require('../../../db');
const etsyModel = require('../../models/Shop/etsy')

function getSelf(req, res, next) {
  const { accessToken, accessTokenSecret } = req.etsyTokens
  etsyModel.getSelf(accessToken, accessTokenSecret)
  .then(response => {
    res.send(response)
  })
  .catch(next)
}

function AllListingActive(req, res, next) {
  const shop_id = req.claim.shops_id
  const { accessToken, accessTokenSecret } = req.etsyTokens
  etsyModel.AllListingActive(accessToken, accessTokenSecret, shop_id)
  .then(response => {
    res.send(response)
  })
  .catch(next)
}


function findAllPurchases(req, res, next) {
  const shop_id = req.claim.shops_id
  const { accessToken, accessTokenSecret } = req.etsyTokens
  etsyModel.findAllPurchases(accessToken, accessTokenSecret, shop_id)
  .then(response => {
    console.log(response);
    res.send(response)
  })
  .catch(next)
}

module.exports = {
  getSelf,
  AllListingActive,
  findAllPurchases
}
