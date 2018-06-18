const typesModel = require('../models/types')


function getOneType(req, res, next){
  if (!req.params.typeId) {
    return next({status: 400, message: 'No type indicated'})
  }
  typesModel.getOneType(req.params.typeId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getAllTypes(req, res, next){
  if (!req.params.shopId) {
    return next({status: 400, message: "Need specified shop to get the types"})
  }
  typesModel.getAllTypes(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createTypes(req, res, next){
  if (!req.params.shopId || !req.body) {
    return next({status: 400, message: 'Need proper type inputs'})
  }
  typesModel.createTypes(req.body, parseInt(req.params.shopId))
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function removeTypes(req, res, next){
  if (!req.params.typeId) {
    return next({status: 400, message: 'Need to know indicated type'})
  }
  typesModel.removeTypes(parseInt(req.params.typeId))
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}

function updateTypes(req, res, next){
  if (!req.params.typeId|| !req.body) {
    return next({ status: 400, message: 'Bad request'})
  }
  typesModel.updateTypes(req.params.typeId, req.body.name)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}

module.exports = {
  getOneType,
  getAllTypes,
  createTypes,
  removeTypes,
  updateTypes
}
