const categoiesModel = require('../models/categories')


function getOneCategory(req, res, next) {
  if (!req.params.categoryId) {
    return next({status: 400, message: 'No category indicated'})
  }
  categoiesModel.getOneCategory(req.params.categoryId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getAllCategories(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: "Need specified shop to get the category"})
  }
  categoiesModel.getAllCategories(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createCategories(req, res, next) {
  if (!req.params.shopId || !req.body.name) {
    return next({status: 400, message: 'Need proper staff inputs'})
  }
  categoiesModel.createCategories(req.body.name, parseInt(req.params.shopId))
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function updateCategories(req, res, next) {
  if (!req.params.categoryId|| !req.body) {
    return next({ status: 400, message: 'Bad request'})
  }
  categoiesModel.updateCategories(req.params.categoryId, req.body)
  .then(data => {
    res.status(200).send({ data })
  })
  .catch(next)
}

function removeCategories(req, res, next) {
  if (!req.params.categoryId) {
    return next({status: 400, message: 'Need to know indicated item'})
  }
  categoiesModel.removeCategories(parseInt(req.params.categoryId))
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}

module.exports = {
getOneCategory,
getAllCategories,
createCategories,
removeCategories,
updateCategories
}
