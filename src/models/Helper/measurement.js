const knex = require('../../../db');
var convert = require('convert-units')


function predictor(body){
  let items = body.items
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
  .then(suppliesList => {
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
  })
  .then(addedSupplies => {
    let data = {}
    for(var i in addedSupplies){
    convertedSupplies = convert(addedSupplies[i].neededSupplies).from(addedSupplies[i].new_measure).toBest({exclude: ['fl-oz', 'ft3', 'yd3', 'in3']})
    convertedSupplies.val = convertedSupplies.val.toPrecision(3);
    convertedSupplies.val <= 1 ? data[addedSupplies[i].name] = `${convertedSupplies.val} ${convertedSupplies.singular}` : null
    convertedSupplies.val > 1 ? data[addedSupplies[i].name] = `${convertedSupplies.val} ${convertedSupplies.plural}` : null
    }
    return data
  })
}



module.exports = {
  predictor
}
