const knex = require('../../../db');

function getTotalItemSold(shopId) {
  let totalItemsSold = 0
  return getPurchaseData(shopId).then(purchases => {
    return createItemsList(purchases)
  }).then(data => {
    const items = Object.entries(data)
    return items.reduce((acc, ele) => [
      ...acc,
      ...ele
    ]).reduce((acc, ele) => {
      if (typeof(ele) === 'object') {
        totalItemsSold += Number(ele.sold)
        return totalItemsSold
      }
    }, {})
  })
}

function getTotalBundleSold(shopId) {
  let totalBundlesSold = 0
  return getPurchaseData(shopId).then(purchases => {
    return createBundlesList(purchases)
  }).then(data => {
    const bundles = Object.entries(data)
    return bundles.reduce((acc, ele) => [
      ...acc,
      ...ele
    ]).reduce((acc, ele) => {
      if (typeof(ele) === 'object') {
        totalBundlesSold += Number(ele.sold)
        return totalBundlesSold
      }
    }, {})
  })
}

function getTotalProductSold(shopId) {
  let totalProductsSold = 0
  return getPurchaseData(shopId).then(purchases => {
    return getTotalItemSold(shopId)
  }).then(items => {
    totalProductsSold += items
    return getTotalBundleSold(shopId)
  }).then(data => {
    totalProductsSold += data
    return totalProductsSold
  })
}

function getItemQTY(shopId) {
  return getPurchaseData(shopId).then(purchaseList => {
    return purchaseList.map(purchaseList => purchaseList.items).reduce((acc, ele) => [
      ...acc,
      ...ele
    ]).reduce((acc, ele) => {
      if (acc.hasOwnProperty(ele.item_id)) {
        let newSuppliesNeeded = ele.item_qty
        acc[ele.item_id].neededSupplies += parseFloat(newSuppliesNeeded)
      } else {
        acc[ele.item_id] = ele
        let suppliesNeeded = acc[ele.item_id].item_qty
        acc[ele.item_id].neededSupplies = parseFloat(suppliesNeeded)
      }
      return acc
    }, {})
  })
}

function getBundleQTY(shopId) {
  return getPurchaseData(shopId).then(purchaseList => {
    return purchaseList.map(purchaseList => purchaseList.bundles).reduce((acc, ele) => [
      ...acc,
      ...ele
    ]).reduce((acc, ele) => {
      if (acc.hasOwnProperty(ele.bundle_id)) {
        let newSuppliesNeeded = ele.bundle_qty
        acc[ele.bundle_id].neededSupplies += parseFloat(newSuppliesNeeded)
      } else {
        acc[ele.bundle_id] = ele
        let suppliesNeeded = acc[ele.bundle_id].bundle_qty
        acc[ele.bundle_id].neededSupplies = parseFloat(suppliesNeeded)
      }
      return acc
    }, {})
  })
}

/////////////////////////////////////////////////////////////////////////////////////////////
////////HELPER FUNCTIONS
//////////////////////////////////////////////////////////////////////////////////////////////
function getPurchaseData(shopId) {
  return knex('purchases').where({shop_id: shopId}).select('purchases.id', 'store_id', 'purchases.purchase_date').then(purchases => {
    const promises = purchases.map(purchase => {
      return knex('purchases_items').innerJoin('items', 'purchases_items.item_id', 'items.id').select('purchases_items.item_id', 'purchases_items.item_qty', 'items.name',).where({'purchases_items.purchase_id': purchase.id}).then(items => {
        purchase.items = items
        return purchase
      }).then(bundles => {
        return knex('purchases_bundles').innerJoin('bundles', 'bundles.id', 'purchases_bundles.bundle_id').select('bundle_id', 'bundle_qty', 'bundles.name').where({'purchases_bundles.purchase_id': purchase.id}).then(bundlesList => {
          purchase.bundles = bundlesList
          return purchase
        })
      })
    })
    return Promise.all(promises)
  })
}

function createBundlesList(list) {
  return list.map(list => list.bundles).reduce((acc, ele) => [
    ...acc,
    ...ele
  ]).reduce((acc, ele) => {
    if (acc.hasOwnProperty(ele.bundle_id)) {
      let bundlesSold = ele.bundle_qty
      acc[ele.bundle_id].sold += parseFloat(bundlesSold)
    } else {
      acc[ele.bundle_id] = ele
      let bundlesSold = acc[ele.bundle_id].bundle_qty
      acc[ele.bundle_id].sold = parseFloat(bundlesSold)
    }
    return acc
  }, {})
}

function createItemsList(list) {
  return list.map(list => list.items).reduce((acc, ele) => [
    ...acc,
    ...ele
  ]).reduce((acc, ele) => {
    if (acc.hasOwnProperty(ele.item_id)) {
      let itemsSold = ele.item_qty
      acc[ele.item_id].sold += parseFloat(itemsSold)
    } else {
      acc[ele.item_id] = ele
      let itemsSold = acc[ele.item_id].item_qty
      acc[ele.item_id].sold = parseFloat(itemsSold)
    }
    return acc
  }, {})
}

module.exports = {
  // logger(getPastPurchases, 'getPastPurchases'),
  getItemQTY,
  getBundleQTY,
  getTotalProductSold,
  getTotalBundleSold,
  getTotalItemSold
}
