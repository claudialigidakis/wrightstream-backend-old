const knex = require('../../../db');
var convert = require('convert-units')


function mostUsed(shopId) {
  return knex('items')
  .where({shop_id: shopId, archived: false})
  .select('id', 'name')
  .then(items => {
    const promise = items.map(item => {
      return knex('items_supplies')
      .innerJoin('supplies', 'supplies.id', 'items_supplies.supplies_id')
      .where({'items_supplies.item_id': item.id})
      .select('qty', 'qty_measure', 'supplies_id', 'name', 'measure_type')
      .then(supply => {
        item.supplies = supply
        return item
      })
    })
    return Promise.all(promise)
  })
  .then(itemsSupplies => {
    return listedSupplies(itemsSupplies)
  })
  .then(data => {
    return data
  })
}

function listedSupplies(list){
  return list
  .map( list => list.supplies )
  .reduce((acc, ele) => [...acc, ...ele])
  .reduce((acc, ele) => {
    if(acc.hasOwnProperty(ele.supplies_id)){
      let measure_type;
      let newSuppliesNeeded = ele.qty
      if(ele.measure_type === 'volume') {
        newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.qty_measure).to('tsp')
      }
      else if(ele.measure_type === 'length'){
        newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.qty_measure).to('ft')
      }

      else if(ele.measure_type === 'mass'){
        newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.qty_measure).to('oz')
      }
      acc[ele.supplies_id].neededSupplies += parseFloat(newSuppliesNeeded)
    }
    else {
      acc[ele.supplies_id] = ele
      let suppliesNeeded = acc[ele.supplies_id].qty
      if(acc[ele.supplies_id].measure_type === 'volume') {
        suppliesNeeded = convert(suppliesNeeded).from(acc[ele.supplies_id].qty_measure).to('tsp')
        measure_type = 'tsp'
      }

      else if(acc[ele.supplies_id].measure_type === 'length'){
        suppliesNeeded = convert(suppliesNeeded).from(acc[ele.supplies_id].qty_measure).to('ft')
        measure_type = 'ft'
      }

      else if(acc[ele.supplies_id].measure_type === 'mass'){
        suppliesNeeded = convert(suppliesNeeded).from(acc[ele.supplies_id].qty_measure).to('oz')
        measure_type = 'oz'
      }
      acc[ele.supplies_id].neededSupplies = parseFloat(suppliesNeeded)
      acc[ele.supplies_id].new_measure = measure_type
    }
    return acc
  }, {})
}


function mostOrdered(shopId) {
  return knex('purchases')
  .where({shop_id: shopId})
  .select('id', 'purchase_date')
  .then(purchases => {
    const promises = purchases.map(purchase => {
      return knex('purchases_supplies')
        .where({'purchase_id': purchase.id})
        .select('supplies_id', 'supplies_qty as qty', 'supplies_measurement as qty_measure')
        .then(supply => {
          purchase.supplies = supply
            return purchase
        })
      })
      return Promise.all(promises)
  })
  .then(supplies => {
    return supplies
    .map( supplies => supplies.supplies )
    .reduce((acc, ele) => [...acc, ...ele])
    .reduce((acc, ele) => {
      if(acc.hasOwnProperty(ele.supplies_id)){
         ele.qty_measure !== 'unit' ? ele.measure_type = convert().describe(ele.qty_measure).measure : null

        let measure_type;
        let newSuppliesNeeded = ele.qty
        if(ele.measure_type === 'volume') {
          newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.qty_measure).to('tsp')
        }
        else if(ele.measure_type === 'length'){
          newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.qty_measure).to('ft')
        }

        else if(ele.measure_type === 'mass'){
          newSuppliesNeeded = convert(newSuppliesNeeded).from(ele.qty_measure).to('oz')
        }
        acc[ele.supplies_id].neededSupplies += parseFloat(newSuppliesNeeded)
      }
      else {
        ele.qty_measure !== 'unit' ? ele.measure_type = convert().describe(ele.qty_measure).measure : null
        acc[ele.supplies_id] = ele
        let suppliesNeeded = acc[ele.supplies_id].qty
        if(acc[ele.supplies_id].measure_type === 'volume') {
          suppliesNeeded = convert(suppliesNeeded).from(acc[ele.supplies_id].qty_measure).to('tsp')
          measure_type = 'tsp'
        }

        else if(acc[ele.supplies_id].measure_type === 'length'){
          suppliesNeeded = convert(suppliesNeeded).from(acc[ele.supplies_id].qty_measure).to('ft')
          measure_type = 'ft'
        }

        else if(acc[ele.supplies_id].measure_type === 'mass'){
          suppliesNeeded = convert(suppliesNeeded).from(acc[ele.supplies_id].qty_measure).to('oz')
          measure_type = 'oz'
        }
        acc[ele.supplies_id].neededSupplies = parseFloat(suppliesNeeded)
        acc[ele.supplies_id].new_measure = measure_type
      }
      return acc
    }, {})
  })
}


module.exports = {
mostUsed,
mostOrdered
}
