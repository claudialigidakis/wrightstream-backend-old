const adminModel = require('../../models/Admin/products')


function getPastProducts(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: 'Need specified shop to get the past products'})
  }
  adminModel.getPastProducts(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}






module.exports = {
getPastProducts,
}
