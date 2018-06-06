const suppliesModel = require('../models/supplies')


function getOneSupply(req, res, next){
  if (!req.params.suppliesId) {
    return next({status: 400, message: 'No supply indicated'})
  }
  suppliesModel.getOneSupply(req.params.suppliesId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getAllSupplies(req, res, next){
  if (!req.params.shopId) {
    return next({status: 400, message: "Need specified shop to get the supplies"})
  }
  suppliesModel.getAllSupplies(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createSupplies(req, res, next){
  if (!req.params.shopId || !req.body) {
    return next({status: 400, message: 'Need proper supply inputs'})
  }
  suppliesModel.createSupplies(req.body, parseInt(req.params.shopId))
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function removeSupplies(req, res, next){
  if (!req.params.suppliesId) {
    return next({status: 400, message: 'Need to know indicated supply'})
  }
  suppliesModel.removeSupplies(parseInt(req.params.suppliesId))
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}

function updateSupplies(req, res, next){
  if (!req.params.suppliesId|| !req.body) {
    return next({ status: 400, message: 'Bad request'})
  }
  suppliesModel.updateSupplies(req.params.suppliesId, req.body.name, req.body.stock, req.body.measure_type, req.body.source_id, req.body.kind_id)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}

module.exports = {
  getOneSupply,
  getAllSupplies,
  createSupplies,
  removeSupplies,
  updateSupplies
}
