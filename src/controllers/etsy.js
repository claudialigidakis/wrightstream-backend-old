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

    ///results are empty -- need to fix ///
    let listingData = JSON.parse(data)
    console.log(listingData);
    listingData = listingData.results
    console.log("listingDataL", listingData);
    const products = listingData.map(productListing => {
      console.log(productListing);
      const product = {}
      product.listing_id = productListing.listing_id
      product.title = productListing.title
      product.quantity = productListing.quantity
      return new Promise((resolve, reject) => {
        etsyOAuth.get(`https://openapi.etsy.com/v2/listings/${productListing.listing_id}/images`, req.etsyTokens.accessToken, req.etsyTokens.accessTokenSecret, function(err, data, response) {
          if (err)
            reject(err)
          const photoUrl = JSON.parse(data)
          product.photo = photoUrl.results.map(photos => photos.url_fullxfull)
          resolve(product)
        })
      })
    })
    Promise.all(products)
  .then(products => {
    // console.log(products);
      const promises = products.map(product => {
        console.log(product.listing_id);
        return (
          knex('products')
          .insert({name: "Etsy", image:product.photo[0], listing_id:product.listing_id, quantity:product.quantity, title:product.title, store_id:req.claim.shops_id})
          .returning('*')
        )
      })
      return Promise.all(promises)
    })
    .then(finalData => {
      res.send(finalData)
    })
  })
}


function findAllPurchases(req, res, next){
  console.log("made it to find purchase controller");
  etsyOAuth.get(`https://openapi.etsy.com/v2/shops/${shopId}/transactions`, req.etsyTokens.accessToken, req.etsyTokens.accessTokenSecret, function(err, data, response) {
    console.log(err)
    if (err) return next(err)
    console.log("data", data)
    // return data
    res.send(data)
  })
}

module.exports = {
  getSelf,
  AllListingActive,
  findAllPurchases
}
