const adminModel = require('../../models/Admin/supplies')


function mostUsed(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: 'Need specified shop to get the supplies'})
  }
  adminModel.mostUsed(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}

function mostOrdered(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: "Need specified shop to get the supplies"})
  }
  adminModel.mostOrdered(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}


module.exports = {
mostUsed,
mostOrdered
}
