const {etsyOAuth} = require('../../config/oauth.js')
const knex = require('../../db');
let shopId;

function getSelf(req, res, next) {
  etsyOAuth.get('https://openapi.etsy.com/v2/users/__SELF__', req.etsyTokens.accessToken, req.etsyTokens.accessTokenSecret, function(err, data, response) {
    if (err)
      return next(err)
    const parsedUser = JSON.parse(data).results
    const userId = parsedUser[0].user_id
    etsyOAuth.get(`https://openapi.etsy.com/v2/users/${userId}/shops`, req.etsyTokens.accessToken, req.etsyTokens.accessTokenSecret, function(err, data, response) {
      if (err)
        return next(err)
      const parsedShop = JSON.parse(data).results
      shopId = parsedShop[0].shop_id
    })
    res.send(data)
  })
}

function AllListingActive(req, res, next) {
  etsyOAuth.get(`https://openapi.etsy.com/v2/shops/${shopId}/listings/active`, req.etsyTokens.accessToken, req.etsyTokens.accessTokenSecret, function(err, data, response) {
    if (err) return next(err)
    let listingData = JSON.parse(data)
    listingData = listingData.results
    const products = listingData.map(productListing => {
      const product = {}
      product.listing_id = productListing.listing_id
      product.title = productListing.title
      product.quantity = productListing.quantity
      return new Promise((resolve, reject) => {
        etsyOAuth.get(`https://openapi.etsy.com/v2/listings/${productListing.listing_id}/images`, req.etsyTokens.accessToken, req.etsyTokens.accessTokenSecret, function(err, data, response) {
          if (err) reject(err)
          const photoUrl = JSON.parse(data)
          product.photo = photoUrl.results.map(photos => photos.url_fullxfull)
          resolve(product)
        })
      })
    })
    Promise.all(products)
    .then(products => {
      const promises = products.map(product => {
        return (knex('products').insert({
          name: "Etsy",
          image: product.photo[0],
          listing_id: product.listing_id,
          quantity: product.quantity,
          title: product.title,
          store_id: req.claim.shops_id
        }).returning('*'))
      })
      return Promise.all(promises)
    }).then(finalData => {
      res.send(finalData)
    })
  })
}

function findAllPurchases(req, res, next) {
  etsyOAuth.get(`https://openapi.etsy.com/v2/shops/${shopId}/transactions`, req.etsyTokens.accessToken, req.etsyTokens.accessTokenSecret, function(err, data, response) {
    if (err)
      return next(err)
    const purchase = {}
    data = JSON.parse(data)
    purchase.order_id = data.results[0].transactions
    purchase.shop_id = req.claim.shops_id
    purchase.store_id = null
    purchase.purchase_date = null
    purchase.service = null
    purchase.tracking = null
    purchase.delivery_date = null
    console.log(purchase);
    return new Promise((resolve, reject) => {
      etsyOAuth.get(`https://openapi.etsy.com/v2/shops/transactions/${purchase.order_id}`, req.etsyTokens.accessToken, req.etsyTokens.accessTokenSecret, function(err, data, response) {
        if (err) return next(err)
        console.log(data);
        resolve(product)
      })
    })
    Promise.all(purchase)
    .then(purchases => {
      res.send(purchases)
    })
  })
}

module.exports = {
  getSelf,
  AllListingActive,
  findAllPurchases
}
