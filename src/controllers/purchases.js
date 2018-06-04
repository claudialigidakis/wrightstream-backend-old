const purchasesModel = require('../models/purchases')

function getOnepurchase(req, res, next){}

function getAllPurchases(req, res, next){}

function createPurchases(req, res, next){}

function removePurchases(req, res, next){}

function updatePurchases(req, res, next){
  if (!req.params.purchaseId|| !req.body) {
    return next({ status: 400, message: 'Bad request'})
  }
  purhcaseModel.updatePurchases(req.params.purchaseId, req.body)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}


module.exports = {
  getOnepurchase,
  getAllPurchases,
  createPurchases,
  removePurchases,
  updatePurchases
}
