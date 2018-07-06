const knex = require('../../../db');
const PurchaseStatusModel = require('../WorkStream/purchases_statuses')
const PurchaseItemModel = require('../WorkStream/purchases_items')
const PurchaseBundleModel = require('../WorkStream/purchases_bundles')
const Helper = require('../Helper/measurement')

function getOnePurchase(purchaseId) {
  return (knex('purchases').where({id: purchaseId}))
}

function getAllPurchases(shopId) {
  return knex('purchases').where({shop_id: shopId}).then(purchases => {
    const promises = purchases.map(purchase => {
      return knex('purchases_statuses').join('statuses', 'statuses.id', 'purchases_statuses.status_id').where('purchases_statuses.purchase_id', purchase.id).then(status => {
        purchase.statuses = status
        return purchase
      }).then(bundles => {
        return knex('purchases_bundles').join('bundles', 'bundles.id', 'purchases_bundles.bundle_id').select('bundles.id', 'bundle_qty', 'bundles.name', 'completed', 'archived', 'steps', 'photo', 'purchases_bundles.updated_at', 'purchases_bundles.created_at', 'staff_id').where('purchases_bundles.purchase_id', purchase.id).then(bundlesList => {
          purchase.bundles = bundlesList
          return purchase
        }).then(bundleItems => {
          const bundlepromises = bundleItems.bundles.map(bundless => {
            return knex('bundles_items').join('items', 'items.id', 'bundles_items.item_id').select('items.id', 'item_qty', 'items.name', 'bundles_id', 'steps', 'photo', 'stock_qty').where('bundles_items.bundles_id', bundless.id).then(bundle_items => {
              bundless.bundle_items = bundle_items
              return bundles
            })
          })
          return Promise.all(bundlepromises)
        }).then(supplies => {
          return knex('purchases_supplies').join('supplies', 'supplies.id', 'purchases_supplies.supplies_id').select('supplies_id', 'supplies_qty', 'supplies_measurement', 'completed', 'name').where('purchases_supplies.purchase_id', purchase.id).then(supplyList => {
            purchase.supplies = supplyList
            return purchase
          })
        }).then(items => {
          return knex('purchases_items').join('items', 'items.id', 'purchases_items.item_id').select('items.id', 'item_qty', 'items.name', 'completed', 'archived', 'steps', 'photo', 'purchases_items.updated_at', 'purchases_items.created_at', 'staff_id').where('purchases_items.purchase_id', purchase.id).then(itemsList => {
            purchase.items = itemsList
            return purchase
          })
        })
      })
    })
    return Promise.all(promises)
  })
}

function createPurchases(shop_id, store_id, delivery_date, staff_id, purchase_date, order_id, service, tracking, items, bundles) {
  const toCreate = {}
  const newPurchase = {}
  shop_id
    ? toCreate.shop_id = shop_id
    : null
  delivery_date
    ? toCreate.delivery_date = delivery_date
    : null
  store_id
    ? toCreate.store_id = store_id
    : null
  staff_id
    ? toCreate.staff_id = staff_id
    : null
  purchase_date
    ? toCreate.purchase_date = purchase_date
    : null
  service
    ? toCreate.service = service
    : null
  tracking
    ? toCreate.tracking = tracking
    : null
  return (knex('purchases').insert(toCreate).returning('*')).then(purchase => {
    newPurchase.createdPurchase = purchase
    return PurchaseStatusModel.createPurchaseStatus(purchase[0].id, null)
  }).then(data => {
    if (items) {
      const itemPromises = items.map(item => {
        let item_id = item.id
        let item_qty = item.item_qty
        let completed = null
        let staff_id = null
        return PurchaseItemModel.createPurchaseItem(newPurchase.createdPurchase[0].id, item_id, item_qty, completed, staff_id)
      })
      return Promise.all(itemPromises)
    } else
      return data
  }).then(itemsData => {
    if (bundles) {
      const bundlePromises = bundles.map(bundle => {
        let bundle_id = bundle.id
        let bundle_qty = bundle.bundle_qty
        let completed = null
        let staff_id = null
        return PurchaseBundleModel.createPurchaseBundle(newPurchase.createdPurchase[0].id, bundle_id, bundle_qty, completed, staff_id)
      })
      return Promise.all(bundlePromises)
    } else
      return itemsData
  }).then(purchaseItemsBundles => {
    return Helper.orderPredictor({items, bundles})
  }).then(supplies => {
    const purchaseSupplies = supplies.map(supply => {
      console.log("supply", supply);
      return knex('purchases_supplies').insert({
        'purchase_id': newPurchase.createdPurchase[0].id,
        'supplies_id': parseInt(supply.supply_id),
        'supplies_qty': parseInt(supply.supply_qty),
        'supplies_measurement': supply.supply_measure_type
      }).returning('*')
    })
    return Promise.all(purchaseSupplies)
  }).then(data => {
    return newPurchase
  })
}

function removePurchases(purchaseId) {
  return (knex('purchases').where({id: purchaseId}).del())
}

function updatePurchases(purchaseId, delivery_date, store_id, shop_id, staff_id, quality_check, pick_up, purchase_date, service, tracking, notes) {
  const toUpdate = {}
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
  quality_check || quality_check === false
    ? toUpdate.quality_check = quality_check
    : null
  pick_up || pick_up === false
    ? toUpdate.pick_up = pick_up
    : null
  delivery_date
    ? toUpdate.delivery_date = delivery_date
    : null
   tracking 
   ? toUpdate.tracking = tracking
  : null
  notes
    ? toUpdate.notes = notes
    : null
  return (knex('purchases').update(toUpdate).where({id: purchaseId}).returning('*'))
}

module.exports = {
  getOnePurchase,
  getAllPurchases,
  createPurchases,
  removePurchases,
  updatePurchases
}
