const knex = require('../../db');

function getAllBundles(shopId) {
    return (knex('bundles').where({shops_id: shopId}))
}

function getOneBundle(bundleId) {
    return (knex('bundles').where({id: bundleId}).first())
}

function createBundles(body, shopId) {
  //creating the initial relationship
  }

function removeBundles(bundleId) {
    return (knex('bundles').where({id: bundleId}).del())
}


function updateBundles(bundleId) {
//updating Item
}

module.exports = {
getOneBundle,
getAllBundles,
createBundles,
removeBundles,
updateBundles
}
