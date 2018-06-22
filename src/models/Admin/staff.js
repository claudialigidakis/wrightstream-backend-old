const knex = require('../../../db');

function getPastStaff(shopId) {
  return knex('staff')
  .where({shops_id: shopId})
  .then(staff => {
    const promises = staff.map(employee => {
      return knex('purchases')
        .join('purchases_statuses', 'purchases_statuses.purchase_id', 'purchases.id')
        .where({'purchases_statuses.staff_id': employee.id, 'purchases_statuses.completed': true})
        .select('id', 'purchase_date', 'order_id', 'status_id', 'created_at', 'updated_at')
        .then(status => {
          employee.completed = status
            return employee
        })
      })
      return Promise.all(promises)
})
}


function getCurrentStaff(shopId) {
  return knex('staff')
  .where({shops_id: shopId})
  .then(staff => {
    const promises = staff.map(employee => {
      return knex('staff')
        .join('purchases', 'purchases.staff_id', 'staff.id')
        .where({'purchases.staff_id': employee.id})
        .select('purchases.id', 'purchase_date', 'order_id')
        .then(purchase => {
          employee.completed = purchase
            return employee
        })
      })
      return Promise.all(promises)
})
  }


module.exports = {
getCurrentStaff,
getPastStaff,
}
