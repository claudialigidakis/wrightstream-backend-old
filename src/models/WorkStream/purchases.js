const knex = require('../../../db');
const PurchaseStatusModel = require('../WorkStream/purchases_statuses')
const PurchaseItemModel = require('../WorkStream/purchases_items')
const PurchaseBundleModel = require('../WorkStream/purchases_bundles')

function getOnePurchase(purchaseId) {
  return (knex('purchases').where({id: purchaseId}))
}

function getAllPurchases(shopId) {
  return knex('purchases')
  .where({shop_id: shopId})
  .then(purchases => {
    const promises = purchases.map(purchase => {
      return knex('purchases_statuses')
        .join('statuses', 'statuses.id', 'purchases_statuses.status_id')
        .where('purchases_statuses.purchase_id', purchase.id)
        .then(status => {
          purchase.statuses = status
          return purchase
        })
    })
    return Promise.all(promises)
  })
}

function getAllBundles(shopId) {
  return knex('bundles')
  .where({shop_id: shopId})
  .then(bundles => {
    const promises = bundles.map(bundle => {
      return knex('bundles_items')
        .join('items', 'items.id', 'bundles_items.item_id')
        .where('bundles_items.bundles_id', bundle.id)
        .then(item => {
          bundle.items = item
          return bundle
        })
      })
      return Promise.all(promises)
})
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
        let item_id = item.item_id
        let item_qty = item.item_qty
        let completed = null
        let staff_id = null
        return PurchaseItemModel.createPurchaseItem(newPurchase.createdPurchase[0].id, item_id, item_qty, completed, staff_id)
      })
      return Promise.all(itemPromises)
    } else
      return data
  })
  .then(itemsData => {
    if (bundles) {
      const bundlePromises = bundles.map(bundle => {
        let bundle_id = bundle.bundle_id
        let bundle_qty = bundle.bundle_qty
        let completed = null
        let staff_id = null
        return PurchaseBundleModel.createPurchaseBundle(newPurchase.createdPurchase[0].id, bundle_id, bundle_qty, completed, staff_id)
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