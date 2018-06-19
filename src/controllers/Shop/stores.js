const storeModel = require('../../models/Shop/stores')

function getOneStore(req, res, next) {
  if (!req.params.storeId) {
    return next({status: 400, message: 'No store indicated'})
  }
  storeModel.getOneStore(req.params.storeId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getAllStore(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: "Need specified shop to get the stores"})
  }
  storeModel.getAllStore(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createStore(req, res, next) {
  //need to know what I  need to make sure I have
  // if (!req.params.shopId || !req.body.fname || !req.body.lname || !req.body.password || !req.body.email || !req.body.photo) {
  //   return next({status: 400, message: 'Need proper staff inputs'})
  // }
  storeModel.createStore(req.body, parseInt(req.params.shopId))
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function updateStore(req, res, next) {

}

function removeStore(req, res, next) {
  if (!req.params.storeId) {
    return next({status: 400, message: 'Need to know indicated store'})
  }
  storeModel.removeStore(parseInt(req.params.storeId))
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}


module.exports = {
  getAllStore,
  getOneStore,
  createStore,
  removeStore,
  updateStore
}
