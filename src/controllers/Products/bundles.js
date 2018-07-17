const bundlesModel = require('../../models/Products/bundles')

function getOneBundle(req, res, next) {
  if (!req.params.bundleId) {
    return next({status: 400, message: 'No bundle indicated'})
  }
  bundlesModel.getOneBundle(req.params.bundleId).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllBundles(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: "Need specified shop to get the bundles"})
  }
  bundlesModel.getAllBundles(req.params.shopId).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllArchivedBundles(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: "Need specified shop to get the bundles"})
  }
  bundlesModel.getAllArchivedBundles(req.params.shopId).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function createBundles(req, res, next) {
  if (!req.params.shopId || !req.body) {
    return next({status: 400, message: 'Need proper bundle inputs'})
  }
  bundlesModel.createBundles(req.body, parseInt(req.params.shopId)).then(data => {
    res.status(201).send({data})
  }).catch(next)
}

function updateBundles(req, res, next) {
  if (!req.params.bundleId || !req.body) {
    return next({status: 400, message: 'Bad request'})
  }
  bundlesModel.updateBundles(req.params.bundleId, req.body.name, req.body.archived, req.body.stock, req.body.categoryId, req.body.productId, req.body.steps, req.body.items).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

module.exports = {
  getOneBundle,
  getAllArchivedBundles,
  getAllBundles,
  createBundles,
  updateBundles
}
