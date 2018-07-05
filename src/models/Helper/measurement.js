const knex = require('../../../db');
var convert = require('convert-units')


function wrightStream(shopId){
 return knex('purchases')
 .where({shop_id: shopId})
 .select('id', 'store_id')
 .then(purchases => {
   const purchasePromise = purchases.map(purchase => {
     return knex('purchases_items')
     .innerJoin('items', 'purchases_items.item_id', 'items.id')
     .innerJoin('purchases_statuses', 'purchases_items.purchase_id', 'purchases_statuses.purchase_id')
     .select('purchases_items.item_id', 'purchases_items.item_qty', 'items.name', )
     .where({'purchases_items.purchase_id': purchase.id})
     .andWhere({'purchases_statuses.purchase_id': purchase.id, 'status_id': 1, 'purchases_statuses.completed':false})
     .then(items => {
       purchase.items = items
       return purchase
     })
     .then(bundles => {
       return knex('purchases_bundles')
       .innerJoin('bundles', 'bundles.id', 'purchases_bundles.bundle_id')
       .innerJoin('purchases_statuses', 'purchases_bundles.purchase_id', 'purchases_statuses.purchase_id')
       .select('bundle_id', 'bundle_qty', 'bundles.name')
       .where({'purchases_bundles.purchase_id': purchase.id})
       .andWhere({'purchases_statuses.purchase_id': purchase.id, 'status_id': 1, 'purchases_statuses.completed':false})
       .then(bundlesList => {
         purchase.bundles = bundlesList
         return purchase
       })
     })
   })
     return Promise.all(purchasePromise)
 })
}



///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
function predictor(body){
  const items = body.items
  const bundles = body.bundles
  let comBunSupp;

if(items && !bundles) {
    return itemSupplies(items)
  .then(suppliesList => {
    //create a supplies list from items
  return createItemsList(suppliesList)
  })
  .then(addedSupplies => {
    //send data to frontEnd in an organized way
  return presentData(addedSupplies)
  })
}

else if (bundles && !items){
  return bundleItems(bundles)
  .then(data => {
    //link bundle/items to supplies
    return bundleSupplies(data, bundles)
  })
  .then(bundleSupplies => {
    //create a supplies list that can be added together
    return createBundleSuppliesList(bundleSupplies)
  })
  .then(completedBundleSupplies => {
    //send data to frontEnd in an organized way
  return presentData(completedBundleSupplies)
  })
}

else if(items && bundles){
  return bundleItems(bundles)
  .then(data => {
    //link bundle/items to supplies
    return bundleSupplies(data, bundles)
  })
  .then(bundleSupplies => {
    //create a supplies list that can be added together
    return createBundleSuppliesList(bundleSupplies)
  })
  .then(completedBundleSupplies => {
    comBunSupp = completedBundleSupplies
    //link supplies and items
    return itemSupplies(items)
  })
  .then(suppliesList => {
    //create a supplies list from items
  return createItemsList(suppliesList)
  })
  .then(lists =>{
    //add together the bundles and the items
  return combine(lists, comBunSupp)
  })
  .then(addedSupplies => {
    //send data to frontEnd in an organized way
  return presentData(addedSupplies)
  })
}
}

function orderPredictor(body){
  const items = body.items
  const bundles = body.bundles
  let comBunSupp;

if(items && !bundles) {
    return itemSupplies(items)
  .then(suppliesList => {
    //create a supplies list from items
  return createItemsList(suppliesList)
  })
  .then(addedSupplies => {
    //send data to frontEnd in an organized way
  return orderData(addedSupplies)
  })
}

else if (bundles && !items){
  return bundleItems(bundles)
  .then(data => {
    //link bundle/items to supplies
    return bundleSupplies(data, bundles)
  })
  .then(bundleSupplies => {
    //create a supplies list that can be added together
    return createBundleSuppliesList(bundleSupplies)
  })
  .then(completedBundleSupplies => {
    //send data to frontEnd in an organized way
  return orderData(completedBundleSupplies)
  })
}

else if(items && bundles){
  return bundleItems(bundles)
  .then(data => {
    //link bundle/items to supplies
    return bundleSupplies(data, bundles)
  })
  .then(bundleSupplies => {
    //create a supplies list that can be added together
    return createBundleSuppliesList(bundleSupplies)
  })
  .then(completedBundleSupplies => {
    comBunSupp = completedBundleSupplies
    //link supplies and items
    return itemSupplies(items)
  })
  .then(suppliesList => {
    //create a supplies list from items
  return createItemsList(suppliesList)
  })
  .then(lists =>{
    //add together the bundles and the items
  return combine(lists, comBunSupp)
  })
  .then(addedSupplies => {
    //send data to frontEnd in an organized way
  return orderData(addedSupplies)
  })
}
}


function comparePredictor(body, shopId){
  const items = body.items
  const bundles = body.bundles
  let comBunSupp;

if(items && !bundles) {
    return itemSupplies(items)
  .then(suppliesList => {
    //create a supplies list from items
  return createItemsList(suppliesList)
  })
  .then(added => {
    return supplyCompare(added, shopId)
  })
  .then(addedSupplies => {
    //send data to frontEnd in an organized way
  return presentData(addedSupplies)
  })
}

else if (bundles && !items){
  return bundleItems(bundles)
  .then(data => {
    //link bundle/items to supplies
    return bundleSupplies(data, bundles)
  })
  .then(bundleSupplies => {
    //create a supplies list that can be added together
    return createBundleSuppliesList(bundleSupplies)
  })
  .then(added => {
    return supplyCompare(added, shopId)
  })
  .then(completedBundleSupplies => {
      //send data to frontEnd in an organized way
    return presentData(completedBundleSupplies)
  })
}

else if(items && bundles){
  return bundleItems(bundles)
  .then(data => {
    //link bundle/items to supplies
    return bundleSupplies(data, bundles)
  })
  .then(bundleSupplies => {
    //create a supplies list that can be added together
    return createBundleSuppliesList(bundleSupplies)
  })
  .then(completedBundleSupplies => {
    comBunSupp = completedBundleSupplies
    //link supplies and items
    return itemSupplies(items)
  })
  .then(suppliesList => {
    //create a supplies list from items
  return createItemsList(suppliesList)
  })
  .then(lists =>{
    //add together the bundles and the items
  return combine(lists, comBunSupp)
  })
  .then(addedSupply => {
    return supplyCompare(addedSupply, shopId)
  })
    .then(addedSupplies => {
    //send data to frontEnd in an organized way
  return presentData(addedSupplies)
  })
}
}


function compareOrderPredictor(body, shopId){
  const items = body.items
  const bundles = body.bundles
  let comBunSupp;

if(items && !bundles) {
    return itemSupplies(items)
  .then(suppliesList => {
    //create a supplies list from items
  return createItemsList(suppliesList)
  })
  .then(added => {
    return supplyCompare(added, shopId)
  })
  .then(addedSupplies => {
    //send data to frontEnd in an organized way
  return orderData(addedSupplies)
  })
}

else if (bundles && !items){
  return bundleItems(bundles)
  .then(data => {
    //link bundle/items to supplies
    return bundleSupplies(data, bundles)
  })
  .then(bundleSupplies => {
    //create a supplies list that can be added together
    return createBundleSuppliesList(bundleSupplies)
  })
  .then(added => {
    return supplyCompare(added, shopId)
  })
  .then(completedBundleSupplies => {
    //send data to frontEnd in an organized way
  return orderData(completedBundleSupplies)
  })
}

else if(items && bundles){
  return bundleItems(bundles)
  .then(data => {
    //link bundle/items to supplies
    return bundleSupplies(data, bundles)
  })
  .then(bundleSupplies => {
    //create a supplies list that can be added together
    return createBundleSuppliesList(bundleSupplies)
  })
  .then(completedBundleSupplies => {
    comBunSupp = completedBundleSupplies
    //link supplies and items
    return itemSupplies(items)
  })
  .then(suppliesList => {
    //create a supplies list from items
  return createItemsList(suppliesList)
  })
  .then(lists =>{
    //add together the bundles and the items
  return combine(lists, comBunSupp)
  })
  .then(addedSupply => {
    return supplyCompare(addedSupply, shopId)
  })
    .then(addedSupplies => {
      //send data to frontEnd in an organized way
    return orderData(addedSupplies)
  })
}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////Item helper functions/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function itemSupplies(items){
  const itemsArray = items.map(item => {
    return knex('items')
    .where({id: item.id})
    .select('items.id', 'items.name')
    .then(products => {
      const promises = products.map(product => {
        return knex('items_supplies')
        .join('supplies', 'supplies.id', 'items_supplies.supplies_id')
        .where('items_supplies.item_id', product.id)
        .select('items_supplies.qty', 'items_supplies.qty_measure', 'supplies.measure_type', 'supplies.name', 'supplies.id')
        .then(supplies => {
          product.supply = supplies.map(ele => ({...ele, item_qty: items.find(ele => ele.id === product.id).item_qty}))
          return product
        })
      })
      return Promise.all(promises)
    })
  })
  return Promise.all(itemsArray)
}


function createItemsList(suppliesList){
  return suppliesList
  .reduce((acc, ele) => [...acc, ...ele])
  .map( supply => supply.supply )
  .reduce((acc, ele) => [...acc, ...ele])
  .reduce((acc, ele) => {
    if(acc.hasOwnProperty(ele.id)){
      let measure_type;
      let newSuppliesNeeded = ele.qty * ele.item_qty
      if(ele.measure_type === 'volume') {
        newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.qty_measure).to('tsp')
      }
      else if(ele.measure_type === 'length'){
        newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.qty_measure).to('ft')
      }

      else if(ele.measure_type === 'mass'){
        newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.qty_measure).to('oz')
      }
      acc[ele.id].neededSupplies += parseFloat(newSuppliesNeeded)
    }
    else {
      acc[ele.id] = ele
      let suppliesNeeded = acc[ele.id].qty * acc[ele.id].item_qty
      if(acc[ele.id].measure_type === 'volume') {
        suppliesNeeded = convert(suppliesNeeded).from(acc[ele.id].qty_measure).to('tsp')
        measure_type = 'tsp'
      }

      else if(acc[ele.id].measure_type === 'length'){
        suppliesNeeded = convert(suppliesNeeded).from(acc[ele.id].qty_measure).to('ft')
        measure_type = 'ft'
      }

      else if(acc[ele.id].measure_type === 'mass'){
        suppliesNeeded = convert(suppliesNeeded).from(acc[ele.id].qty_measure).to('oz')
        measure_type = 'oz'
      }
      acc[ele.id].neededSupplies = parseFloat(suppliesNeeded)
      acc[ele.id].new_measure = measure_type
    }
    return acc
  }, {})
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////bundle helper functions//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function createBundleSuppliesList(bundleSupplies){
  return bundleSupplies
  .map( supply => supply.supply )
  .reduce((acc, ele) => [...acc, ...ele])
  .reduce((acc, ele) => {
    if(acc.hasOwnProperty(ele.id)){
      let measure_type;
      let newSuppliesNeeded = (ele.qty * ele.item_qty) * ele.bundle_qty

      if(ele.measure_type === 'volume') {
        newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.qty_measure).to('tsp')
      }
      else if(ele.measure_type === 'length'){
        newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.qty_measure).to('ft')
      }

      else if(ele.measure_type === 'mass'){
        newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.qty_measure).to('oz')
      }
      acc[ele.id].neededSupplies += parseFloat(newSuppliesNeeded)
    }
    else {
      acc[ele.id] = ele
      let measure_type;
      let suppliesNeeded = (acc[ele.id].qty * acc[ele.id].item_qty) * acc[ele.id].bundle_qty

      if(acc[ele.id].measure_type === 'volume') {
        suppliesNeeded = convert(suppliesNeeded).from(acc[ele.id].qty_measure).to('tsp')
        measure_type = 'tsp'
      }

      else if(acc[ele.id].measure_type === 'unit') {
        suppliesNeeded = suppliesNeeded
        measure_type = 'unit'
      }
      else if(acc[ele.id].measure_type === 'length'){
        suppliesNeeded = convert(suppliesNeeded).from(acc[ele.id].qty_measure).to('ft')
        measure_type = 'ft'
      }
      else if(acc[ele.id].measure_type === 'mass'){
        suppliesNeeded = convert(suppliesNeeded).from(acc[ele.id].qty_measure).to('oz')
        measure_type = 'oz'
      }
      acc[ele.id].neededSupplies = parseFloat(suppliesNeeded)
      acc[ele.id].new_measure = measure_type
    }
    return acc
  }, {})
}

function bundleItems(bundles){
  const bundlesArray = bundles.map(bundle => {
    const bundleId = bundle.id || bundle.bundle_id
    return knex('bundles')
    .where({id: bundleId})
    .select('bundles.id', 'bundles.name')
    .then(packages => {
      const promises = packages.map(package => {
        return knex('bundles_items')
        .join('items', 'items.id', 'bundles_items.item_id')
        .where('bundles_items.bundles_id', package.id)
        .select('stock_qty', 'name', 'item_id', 'item_qty', 'bundles_id')
        .then(items => {
          package.item = items
          return package
        })
      })
      return Promise.all(promises)
    })
  })
  return Promise.all(bundlesArray)
  .then(data => {
    return data
    .reduce((acc, ele) => [...acc, ...ele])
  })
}


function bundleSupplies(bundleItems, bundles){
let bundledItems = bundleItems.map( ele => ele.item )
.reduce((acc, ele) => [...acc, ...ele])
return Promise.resolve(bundledItems)
.then(items => {
  const promises = items.map(item => {
    return knex('items_supplies')
    .join('supplies', 'supplies.id', 'items_supplies.supplies_id')
    .where('items_supplies.item_id', item.item_id)
    .select('items_supplies.qty', 'items_supplies.qty_measure', 'supplies.measure_type', 'supplies.name', 'supplies.id')
    .then(supplies => {
      item.supply = supplies.map(ele => ({...ele, item_qty: items.find(ele => ele.item_id === item.item_id).item_qty, bundle_qty:bundles.find(ele => ele.bundle_id === bundles.id).bundle_qty}))
      return item
    })
  })
  return Promise.all(promises)
    })
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Clean up code and send it//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function combine(lists, comBunSupp){
  let items = lists
  let bundles = comBunSupp

  let arrayItems = Object.values(items)
  let arrayBundles = Object.values(bundles)
  let result = arrayItems.concat(arrayBundles);
  return result
  .reduce((acc, ele) => {
    if(acc.hasOwnProperty(ele.id)){
      let newSuppliesNeeded = ele.neededSupplies
      acc[ele.id].neededSupplies += parseFloat(newSuppliesNeeded)
    }
    else {
      acc[ele.id] = ele
      let suppliesNeeded = acc[ele.id].neededSupplies
      acc[ele.id].neededSupplies = parseFloat(suppliesNeeded)
    }
    return acc
  }, {})
}


function presentData(addedSupplies){
  let data = {}
  for(var i in addedSupplies){
    if(addedSupplies[i].new_measure !== 'unit'){
  convertedSupplies = convert(addedSupplies[i].neededSupplies).from(addedSupplies[i].new_measure).toBest({exclude: ['fl-oz', 'ft3', 'yd3', 'in3']})
  convertedSupplies.val = Number(convertedSupplies.val.toPrecision(3))
  convertedSupplies.val <= 1 ? data[addedSupplies[i].name] = `${convertedSupplies.val} ${convertedSupplies.singular}` : null
  convertedSupplies.val > 1 ? data[addedSupplies[i].name] = `${convertedSupplies.val} ${convertedSupplies.plural}` : null
    }
    else {
      data[addedSupplies[i].name] = Number(addedSupplies[i].neededSupplies)
      addedSupplies[i].neededSupplies <= 1 ? data[addedSupplies[i].name] = `${Number(addedSupplies[i].neededSupplies)} unit` : null
      addedSupplies[i].neededSupplies > 1 ? data[addedSupplies[i].name] = `${Number(addedSupplies[i].neededSupplies)} units` : null
    }
  }
  return data
}

function orderData(addedSupplies){
 let supplies = []
 let data = {}
 for(var i in addedSupplies){
   data = {}
   if(addedSupplies[i].new_measure !== 'unit'){
     convertedSupplies = convert(addedSupplies[i].neededSupplies).from(addedSupplies[i].new_measure).toBest({exclude: ['fl-oz', 'ft3', 'yd3', 'in3']})
     convertedSupplies.val = convertedSupplies.val.toPrecision(3);
     data.supply_qty = Number(convertedSupplies.val)
     data.supply_measure_type = convertedSupplies.unit
     data.supply_id = addedSupplies[i].id
    supplies.push(data)
    }
    else {
      data.supply_qty = Number(addedSupplies[i].neededSupplies)
      data.supply_measure_type = 'unit'
      data.supply_id = addedSupplies[i].id
     supplies.push(data)
    }
   }
 return supplies
}

function supplyCompare(addedSupply, shopId){
  console.log("added", addedSupply, shopId);
  return addedSupply
}


module.exports = {
  wrightStream,
  predictor,
  orderPredictor,
  comparePredictor,
  compareOrderPredictor
}
