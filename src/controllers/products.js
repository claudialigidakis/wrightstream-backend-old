const productsModel = require('../models/products')

function getOneProduct(req, res, next){

}

function getAllProducts(req, res, next){
  if (!req.params.shopId) {
    return next({status: 400, message: 'Missing product item fields'})
  }
  productsModel.getAllProducts(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function updateProducts(req, res, next){

}

module.exports = {
  getOneProduct,
  getAllProducts,
  updateProducts
}
