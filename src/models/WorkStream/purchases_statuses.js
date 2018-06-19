const knex = require('../../../db');


function getOnePurchaseStatus(purchase_id, status_id) {
    return (
      knex('purchases_statuses')
    .where({purchase_id: purchase_id, status_id: status_id})
  )
}

function getAllPurchaseStatuses(purchase_id) {
    return (
      knex('purchases_statuses')
    .where({purchase_id: purchase_id})
  )
}

function createPurchaseStatus(purchase_id, staff_id) {
  const purchase_statuses = [1, 2, 3, 4, 5]
  const promises = purchase_statuses.map(status_id => {
    let toCreate = {}
    toCreate.purchase_id = purchase_id
    toCreate.status_id = status_id
    staff_id ? toCreate.staff_id = staff_id : null
    return knex('purchases_statuses')
    .insert(toCreate)
    .returning('*')
    })
    return Promise.all(promises)
}

function removePurchaseStatuses(purchase_id, status_id) {
  console.log(purchase_id, status_id);
    return (
      knex('purchases_statuses')
      .where({purchase_id: purchase_id, status_id: status_id})
      .del()
    )
}

function updatePurchaseStatus(purchase_id, status_id, priority, completed, staff_id) {
  const toUpdate = {}
  priority ? toUpdate.priority = priority : null
  completed ? toUpdate.completed = completed : null
  staff_id ? toUpdate.staff_id = staff_id : null
  return (knex('purchases_statuses')
  .update(toUpdate)
  .where({purchase_id: purchase_id, status_id: status_id})
  .returning('*'))
}


module.exports = {
  getOnePurchaseStatus,
  getAllPurchaseStatuses,
  createPurchaseStatus,
  removePurchaseStatuses,
  updatePurchaseStatus
}
