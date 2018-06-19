const inventoryModel = require('../../models/Inventory/inventory')


function getAllInventorySupplies(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: "Need specified shop to get the inventory supplies"})
  }
  inventoryModel.getAllInventorySupplies(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getAllInventoryProducts(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: "Need specified shop to get the inventory products"})
  }
  inventoryModel.getAllInventoryProducts(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}



module.exports = {
  getAllInventorySupplies,
  getAllInventoryProducts,
}
