const productsModel = require('../../models/Products/products')

function getAllUnlinked(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: 'Missing product item fields'})
  }
  productsModel.getAllUnlinked(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllProducts(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: 'Missing product item fields'})
  }
  productsModel.getAllProducts(req.params.shopId).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

module.exports = {
  getAllProducts,
  getAllUnlinked
}
