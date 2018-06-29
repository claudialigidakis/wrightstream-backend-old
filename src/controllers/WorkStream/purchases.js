const purchasesModel = require('../../models/WorkStream/purchases')

function getOnePurchase(req, res, next){
  if (!req.params.purchaseId) {
    return next({status: 400, message: 'Bad Request'})
  }
  purchasesModel.getOnePurchase(req.params.purchaseId)
  .then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllPurchases(req, res, next){
  purchasesModel.getAllPurchases(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createPurchases(req, res, next){
  if (!req.params.shopId) {
    return next({status: 400, message: 'Missing shop creation fields'})
  }
  purchasesModel.createPurchases(req.params.shopId, req.body.store_id, req.body.delivery_date, req.body.staff_id, req.body.purchase_date, req.body.order_id, req.body.service, req.body.tracking, req.body.items, req.body.bundles)
  .then(function(data) {
    console.log("back to purchase");
    return res.status(201).send({data})
  }).catch(next)
}

function removePurchases(req, res, next){
  if (!req.params.purchaseId) {
    return next({status: 400, message: 'Missing purchase id'})
  }
  purchasesModel.removePurchases(parseInt(req.params.purchaseId))
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}

function updatePurchases(req, res, next){
  if (!req.params.purchaseId|| !req.body) {
    return next({ status: 400, message: 'Bad request'})
  }
  purchasesModel.updatePurchases(req.params.purchaseId, req.body.delivery_date, req.body.store_id, req.body.shop_id, req.body.staff_id, req.body.quality_check, req.body.pick_up, req.body.purchase_date, req.body.service, req.body.tracking, req.body.notes)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}


module.exports = {
  getOnePurchase,
  getAllPurchases,
  createPurchases,
  removePurchases,
  updatePurchases
}
