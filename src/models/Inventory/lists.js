const knex = require('../../../db');

function getAllLists(shopId) {
  return knex('lists')
  .where({shop_id: shopId})
  .then(lists => {
    const promises = lists.map(list => {
      return knex('lists_items')
        .join('items', 'items.id', 'lists_items.item_id')
        .select('lists_items.item_id', 'lists_items.item_qty', 'items.name')
        .where('lists_items.list_id', list.id)
        .then(items => {
          list.item = items
            return list
        })
      })
      return Promise.all(promises)
})
}


function getOneList(listId) {
  return knex('lists')
  .where({id: listId})
  .first()
  }

function createList(body, shopId) {
  return (
    knex('lists')
    .insert({
    name: body.name,
    shop_id: shopId,
  })
  .returning('*'))
  .then(lists => {
    if(body.items){
      const itemArray = body.items
      const itemPromise = itemArray.map(ele => {
        return (
          knex('lists_items')
        .insert({list_id: lists[0].id, item_id: ele.item_id, item_qty: ele.item_qty})
        .returning('*')
      )
      })
      return Promise.all(itemPromise)
    }
    else {
      return lists
    }
  })
}

function removeList(listId) {
  return (
    knex('lists_items')
    .where({list_id: listId})
    .del()
  )
    .then(data => {
      return (knex('lists')
      .where({id: listId})
      .del())
    })
}

function updateList(listId, body) {
  const toUpdate = {}
  body.name ? toUpdate.name = body.name : null
  body.deleted ? toUpdate.deleted = body.deleted : null
  return (
    knex('lists')
    .update(toUpdate)
    .where({id: listId})
    .returning('*'))
    .then(data => {
      if (body.items) {
      return (knex('lists_items')
      .where({list_id: listId})
      .del())
      .then(newdata => {
        const newItems = body.items
          const promiseItems = newItems.map(ele => {
              return (
                knex('lists_items')
              .insert({list_id: listId, item_id: ele.item_id, item_qty: ele.item_qty})
              .returning('*')
            )
            })
            return Promise.all(promiseItems)
          })
    }
    else return data
  })
}


module.exports = {
  getOneList,
  getAllLists,
  createList,
  removeList,
  updateList
}
