const bundlesModel = require('../models/bundles')


function getOneBundle(req, res, next) {
  if (!req.params.bundleId) {
    return next({status: 400, message: 'No item indicated'})
  }
  itemsModel.getOneItem(req.params.bundleId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getAllBundles(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: "Need specified shop to get the items"})
  }
  bundlesModel.getAllItems(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createBundles(req, res, next) {
  //need to know what I  need to make sure I have
  // if (!req.params.shopId || !req.body.fname || !req.body.lname || !req.body.password || !req.body.email || !req.body.photo) {
  //   return next({status: 400, message: 'Need proper staff inputs'})
  // }
  bundlesModel.createItem(req.body, parseInt(req.params.shopId))
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function updateBundles(req, res, next) {

}

function removeBundles(req, res, next) {
  if (!req.params.bundleId) {
    return next({status: 400, message: 'Need to know indicated item'})
  }
  bundlesModel.removeItems(parseInt(req.params.bundleId))
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}

module.exports = {
getOneBundle,
getAllBundles,
createBundles,
removeBundles,
updateBundles
}
