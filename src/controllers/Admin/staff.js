const adminModel = require('../../models/Admin/staff')


function getCurrentStaff(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: 'Need specified shop to get the current staff'})
  }
  adminModel.getCurrentStaff(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function getPastStaff(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: "Need specified shop to get the past staff"})
  }
  adminModel.getPastStaff(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}



module.exports = {
getCurrentStaff,
getPastStaff,
}
