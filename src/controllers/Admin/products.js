const adminModel = require('../../models/Admin/products')


function getPastPurchases(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: 'Need specified shop to get the past products'})
  }
  adminModel.getPastPurchases(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getTotalProductSold(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: 'Need specified shop to get the past products'})
  }
  adminModel.getTotalProductSold(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getTotalBundleSold(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: 'Need specified shop to get the past products'})
  }
  adminModel.getTotalBundleSold(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getTotalItemSold(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: 'Need specified shop to get the past products'})
  }
  adminModel.getTotalItemSold(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

module.exports = {
  getPastPurchases,
  getTotalProductSold,
  getTotalBundleSold,
  getTotalItemSold
}
