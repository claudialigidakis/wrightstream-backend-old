const {etsyOAuth} = require('../../../config/oauth.js')
const knex = require('../../../db');

const AllListingActive = (accessToken, accesTokenSecret, shop_id) => {
  let userId;
  let storeId;
  let store_id;
  return findEtsyStore(shop_id)
  .then(store => {
    store_id = store.id
    return getSelf(accessToken, accesTokenSecret)
  })
  .then(self => {
    userId = self[0].user_id
    return getStore(userId, accessToken, accesTokenSecret)
  })
  .then(storeInfo => {
    storeId = storeInfo[0].shop_id
    return etsyOAuthGet(`/shops/${storeId}/listings/active`, accessToken, accesTokenSecret)
  })
  .then(listingData => {
    listingData = listingData.results
    const products = listingData.map(productListing => {
      const product = {}
      product.listing_id = productListing.listing_id
      product.title = productListing.title
      product.quantity = productListing.quantity
      return new Promise((resolve, reject) => {
        etsyOAuth.get(`https://openapi.etsy.com/v2/listings/${productListing.listing_id}/images`, accessToken, accesTokenSecret, function(err, data, response) {
          if (err)
            reject(err)
          const photoUrl = JSON.parse(data)
          product.photo = photoUrl.results.map(photos => photos.url_fullxfull)
          resolve(product)
        })
      })
    })
    return Promise.all(products)
  })
  .then(products => {
    return addProducts(products, store_id)
  })
}


const findAllPurchases = (accessToken, accesTokenSecret, shop_id) => {
  let userId;
  let storeId;
  let wrightStore;
  return findEtsyStore(shop_id)
  .then(store => {
    wrightStore = store.id
    return getSelf(accessToken, accesTokenSecret)
  })
  .then(self => {
    userId = self[0].user_id
    return getStore(userId, accessToken, accesTokenSecret)
  })
  .then(storeInfo => {
    storeId = storeInfo[0].shop_id
    return etsyOAuthGet(`/shops/${storeId}/transactions`, accessToken, accesTokenSecret)
  })
  .then(data => {
    const purchase = {}
    purchase.order_id = data.results[0].transaction_id
    purchase.shop_id = shop_id
    purchase.store_id = wrightStore
    purchase.purchase_date = null
    purchase.service = null
    purchase.tracking = null
    purchase.delivery_date = null
    return new Promise((resolve, reject) => {
      etsyOAuth.get(`https://openapi.etsy.com/v2/transactions/${purchase.order_id}`, accessToken, accesTokenSecret, function(err, data, response) {
        if (err) return reject(err)
        console.log(data);
        resolve(purchase)
      })
    })
    Promise.all(purchase)
  })
    .then(purchases => {
      return purchases
    })
  }

/////////////////////////////////////////////////////////////////////////////////////////////
///////////Helper Functions
////////////////////////////////////////////////////////////////////////////////////////////
const addProducts = (products, store_id) => {
  const filteredProducts = products
  const promises = filteredProducts.map(filteredProduct => {
    return (knex('products').insert({
      name: "Etsy",
      image: filteredProduct.photo[0],
      listing_id: filteredProduct.listing_id,
      quantity: filteredProduct.quantity,
      title: filteredProduct.title,
      store_id: store_id
    }).returning('*'))
  })
  return Promise.all(promises)
  .then(products => products.reduce((acc, ele) => [...acc, ...ele], []))
}

const findEtsyStore = (shops_id) => {
  return knex('stores').where({shops_id, name: 'Etsy'}).first()
}

const getSelf = (accessToken, accessTokenSecret) => {
  return new Promise((resolve, reject) => {
    etsyOAuth.get('https://openapi.etsy.com/v2/users/__SELF__', accessToken, accessTokenSecret, function(err, data, response) {

      if (err) return reject(err)

      resolve(JSON.parse(data).results)
    })
  })
}

const getStore = (userId, accessToken, accessTokenSecret) => {
  return new Promise((resolve, reject) => {
    etsyOAuth.get(`https://openapi.etsy.com/v2/users/${userId}/shops`, accessToken, accessTokenSecret, function(err, data, response) {
      if (err)
        return reject(err)
      resolve(JSON.parse(data).results)
    })
  })
}

const etsyOAuthGet = (path, accessToken, accesTokenSecret) =>
  new Promise((resolve, reject) => {
    etsyOAuth.get(`https://openapi.etsy.com/v2${path}`, accessToken, accesTokenSecret, function(err, data, response) {
      if(err) return reject(err)
      resolve(JSON.parse(data))
    })
  })


module.exports = {
  getSelf,
  AllListingActive,
  findAllPurchases
}
