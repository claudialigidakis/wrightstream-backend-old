const adminModel = require('../../models/Admin/purchases')


function purchaseStatuses(req, res, next) {
  if (!req.params.shopId) {
    return next({status: 400, message: 'Need specified shop to get the current purchases'})
  }
  adminModel.purchaseStatuses(req.params.shopId)
  .then(data => {
    res.status(200).send({data})
  })
  .catch(next)
}





module.exports = {
purchaseStatuses
}
