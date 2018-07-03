const knex = require('../../../db');

function purchaseStatuses(shopId) {
  return knex('purchases')
  .where({shop_id: shopId})
  .select('id', 'shop_id', 'purchase_date')
  .then(purchases => {
    const promises = purchases.map(purchase => {
      return knex('purchases_statuses')
        .where({'purchases_statuses.purchase_id': purchase.id}).whereNot({ 'purchases_statuses.completed': true })
        .select('purchase_id', 'status_id', 'created_at', 'updated_at', 'purchases_statuses.staff_id')
        .first()
        .then(status => {
          purchase.statuses = status
            return purchase
        })
      })
      return Promise.all(promises)
    })
  .then(currentStatus => {
    return createStatusList(currentStatus)
  })
}


function createStatusList(list){
  return list
  .map( list => list.statuses )
  .reduce((acc, ele) => {
    if(ele !== undefined && acc.hasOwnProperty(ele.status_id)){
      acc[ele.status_id].statusCount += 1
    }
    else if(ele !== undefined){
      acc[ele.status_id] = ele
      acc[ele.status_id].statusCount = 1
    }
    return acc
  }, {})
}



module.exports = {
purchaseStatuses
}
