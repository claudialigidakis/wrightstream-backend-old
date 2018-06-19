const kindsModel = require('../../models/Products/kinds')

function getOneKind(req, res, next) {
  if (!req.params.kindId) {
    return next({status: 400, message: 'No kind indicated'})
  }
  kindsModel.getOneKind(req.params.kindId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getAllKinds(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: "Need specified shop to get the kinds"})
  }
  kindsModel.getAllKinds(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createKinds(req, res, next) {
  if (!req.params.shopId || !req.body) {
    return next({status: 400, message: 'Need proper kind inputs'})
  }
  kindsModel.createKinds(req.body, parseInt(req.params.shopId))
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function removeKinds(req, res, next) {
  if (!req.params.kindId) {
    return next({status: 400, message: 'Need to know indicated kind'})
  }
  kindsModel.removeKinds(parseInt(req.params.kindId))
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}

function updateKinds(req, res, next) {
  if (!req.params.kindId|| !req.body) {
    return next({ status: 400, message: 'Bad request'})
  }
  kindsModel.updateKinds(req.params.kindId, req.body)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}

module.exports = {
  getOneKind,
  getAllKinds,
  createKinds,
  removeKinds,
  updateKinds
}
