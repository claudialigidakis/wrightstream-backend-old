const sourcesModel = require('../../models/Products/sources')

function getOneSource(req, res, next) {
  if (!req.params.sourceId) {
    return next({status: 400, message: 'No source indicated'})
  }
  sourcesModel.getOneSource(req.params.sourceId).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllSources(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: "Need specified shop to get the sources"})
  }
  sourcesModel.getAllSources(req.params.shopId).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function createSource(req, res, next) {
  if (!req.params.shopId || !req.body) {
    return next({status: 400, message: 'Need proper source inputs'})
  }
  sourcesModel.createSource(req.body, parseInt(req.params.shopId)).then(data => {
    res.status(201).send({data})
  }).catch(next)
}

function removeSource(req, res, next) {
  if (!req.params.sourceId) {
    return next({status: 400, message: 'Need to know indicated source'})
  }
  sourcesModel.removeSource(parseInt(req.params.sourceId)).then(function(data) {
    res.status(200).send({data})
  }).catch(next)
}

function updateSource(req, res, next) {
  if (!req.params.sourceId || !req.body) {
    return next({status: 400, message: 'Bad request'})
  }
  sourcesModel.updateSource(req.params.sourceId, req.body.name, req.body.link, req.body.type_id).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

module.exports = {
  getOneSource,
  getAllSources,
  createSource,
  removeSource,
  updateSource
}
