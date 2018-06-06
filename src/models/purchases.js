const knex = require('../../db');
const PurchaseStatusModel = require('../models/purchases_statuses')
const PurchaseItemModel = require('../models/purchases_items')
const PurchaseBundleModel = require('../models/purchases_bundles')

function getOnePurchase(purchaseId) {
  return (knex('purchases').where({id: purchaseId}))
}

function getAllPurchases(shopId) {
  return (knex('purchases').where({shop_id: shopId}))
}

function createPurchases(shop_id, store_id, delivery_date, staff_id, purchase_date, order_id, service, tracking, items, bundles) {
  const toCreate = {}
  const newPurchase = {}
  shop_id ? toCreate.shop_id = shop_id : null
  delivery_date ? toCreate.delivery_date = delivery_date : null
  store_id ? toCreate.store_id = store_id : null
  staff_id ? toCreate.staff_id = staff_id : null
  purchase_date ? toCreate.purchase_date = purchase_date : null
  service ? toCreate.service = service : null
  tracking ? toCreate.tracking = tracking : null

  return (
    knex('purchases')
  .insert(toCreate)
  .returning('*'))
  .then(purchase => {
    newPurchase.createdPurchase = purchase
    return PurchaseStatusModel.createPurchaseStatus(purchase[0].id, null)
  }).then(data => {
    if (items) {
      const itemPromises = items.map(item => {
        return PurchaseItemModel.createPurchaseStatus(purchase.id, {item_id, item_qty, completed, staff_id})
      })
      return Promise.all(itemPromises)
    } else
      return data
  })
  .then(itemsData => {
    if (bundles) {
      const bundlePromises = bundles.map(bundle => {
        return PurchaseBundleModel.createPurchaseStatus(purchase.id, {bundle_id, bundle_qty, completed, staff_id})
      })
      return Promise.all(bundlePromises)
    } else
      return itemsData
  })
  .then(purchaseItemsBundles => {
    console.log(purchaseItemsBundles);
    return newPurchase
  })
}

function removePurchases(purchaseId) {
  return (knex('purchases').where({id: purchaseId}).del())
}

function updatePurchases(purchaseId, delivery_date, store_id, shop_id, staff_id, purchase_date, service, tracking) {
  const toUpdate = {}
  delivery_date
    ? toUpdate.delivery_date = delivery_date
    : null
  store_id
    ? toUpdate.store_id = store_id
    : null
  shop_id
    ? toUpdate.shop_id = shop_id
    : null
  staff_id
    ? toUpdate.staff_id = staff_d
    : null
  purchase_date
    ? toUpdate.purchase_date = purchase_date
    : null
  service
    ? toUpdate.service = service
    : null
  tracking
    ? toUpdate.tracking = tracking
    : null
  console.log(toUpdate);
  return (knex('purchases').update(toUpdate).where({id: purchaseId}).returning('*'))
}

module.exports = {
  getOnePurchase,
  getAllPurchases,
  createPurchases,
  removePurchases,
  updatePurchases
}
