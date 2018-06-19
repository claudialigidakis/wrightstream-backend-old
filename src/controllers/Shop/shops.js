const shopModel = require('../../models/Shop/shops')
const {etsyOAuth} = require('../../../config/oauth.js')

function getOneShop(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: 'Bad Request'})
  }
  shopModel.getOneShop(req.params.shopId).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function getAllShops(req, res, next){
  shopModel.getAllShops()
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function createShop(req, res, next) {
  if (!req.body.shop_name) {
    return next({status: 400, message: 'Missing shop creation fields'})
  }
  shopModel.createShop(req.body)
  .then(function(data) {
    return res.status(201).send({data})
  }).catch(next)
}

function updateShop(req, res, next) {
  if (!req.body.shop_name || !req.body.logo || !req.body.settings) {
    return next({ status: 400, message: 'Bad request'});
  }
  shopModel.updateShop(parseInt(req.params.shopId), req.body.shop_name, req.body.logo, req.body.settings)
  .then(data => {
    res.status(200).send({ data });
  })
  .catch(next);
}

function removeShop(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: 'Missing shop id'})
  }
  shopModel.removeShop(parseInt(req.params.shopId))
  .then(function(data) {
    res.status(200).send({data})
  })
  .catch(next)
}

//staff routes

function getOneStaff(req, res, next) {
  if (!req.params.staffId || !req.params.shopId) {
    return next({status: 400, message: 'No staff ID or Shop Id'})
  }
  shopModel.getOneStaff(req.params.staffId, req.params.shopId)
  .then(data => {
    delete data.password
    res.status(200).send({data})
  })
  .catch(next)
}

function getAllStaff(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: "No shop body"})
  }
  shopModel.getAllStaff(req.params.shopId)
  .then(data => {
    delete data.password
    res.status(200).send({data})
  })
  .catch(next)
}

function createStaff(req, res, next) {
  if (!req.params.shopId || !req.body.first_name || !req.body.last_name || !req.body.password) {
    return next({status: 400, message: 'Need proper staff inputs'})
  }
  shopModel.createStaff(req.body, parseInt(req.params.shopId))
  .then(data => {
    delete data.password
    res.status(200).send({data})
  })
  .catch(next)
}

function updateStaff(req, res, next) {
  if (!req.body.password) {
    return next({ status: 400, message: 'Bad request'});
  }
  shopModel.updateShop(parseInt(req.params.staffId), req.body.first_name, req.body.last_name, req.body.password, req.body.email, req.body.photo, req.body.role)
  .then(data => {
    res.status(200).send({ data });
  })
  .catch(next);
}

function removeStaff(req, res, next) {
  if (!req.params.staffId) {
    return next({status: 400, message: 'Missing staff member'})
  }
  shopModel.removeStaff(parseInt(req.params.staffId))
  .then(function(data) {
    delete data.password
    res.status(200).send({data})
  }).catch(next)
}

module.exports = {
  getAllShops,
  getOneShop,
  createShop,
  removeShop,
  updateShop,
  getAllStaff,
  getOneStaff,
  createStaff,
  updateStaff,
  removeStaff
}
