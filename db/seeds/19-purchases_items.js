exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('purchases_items').del()
    .then(function () {
      // Inserts seed entries
      return knex('purchases_items').insert([
        {purchase_id: 1, item_id: 1, item_qty: 1, completed: false},
        {purchase_id: 1, item_id: 2, item_qty: 3, completed: false},
        {purchase_id: 2, item_id: 1, item_qty: 2, completed: false},
        {purchase_id: 3, item_id: 1, item_qty: 3, completed: false},
      ])
    })
};
