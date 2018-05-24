const shopModel = require('../models/shops')

function getOneShop(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: 'Bad Request'})
  }
  shopModel.getOneShop(req.params.shopId).then(data => {
    res.status(200).send({data})
  }).catch(next)
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

function updateShop(req, res, next) {}

function removeShop(req, res, next) {
  console.log(req.params)
  if (!req.params.shopId) {
    return next({status: 400, message: 'Missing shop id'})
  }
  shopModel.removeShop(parseInt(req.params.shopId)).then(function(data) {
    res.status(200).send({data})
  }).catch(next)
}

//staff routes

function getOneStaff(req, res, next) {
  console.log("made it to get one staff controller")
  if (!req.params.staffId || !req.params.shopId) {
    return next({status: 400, message: 'No staff ID or Shop Id'})
  }
  shopModel.getOneStaff(req.params.staffId, req.params.shopId).then(data => {
    console.log("made it back to get one staff models");
    delete data.password
    res.status(200).send({data})
  }).catch(next)
}

function getAllStaff(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: "No shop body"})
  }
  shopModel.getAllStaff(req.params.shopId).then(data => {
    res.status(200).send({data})
  }).catch(next)
}

function createStaff(req, res, next) {
  console.log("made it to create staff controller");
  if (!req.params.shopId || !req.body.fname || !req.body.lname || !req.body.password || !req.body.email || !req.body.photo) {
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
