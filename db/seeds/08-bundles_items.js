
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bundles_items').del()
    .then(function () {
      // Inserts seed entries
      return knex('bundles_items').insert([
        {id: 1, item_qty: 1, bundles_id: 1, item_id: 16},
        {id: 2, item_qty: 1, bundles_id: 2, item_id: 16},
        {id: 3, item_qty: 1, bundles_id: 3, item_id: 16},
        {id: 4, item_qty: 1, bundles_id: 1, item_id: 10},
        {id: 5, item_qty: 1, bundles_id: 2, item_id: 10},
        {id: 6, item_qty: 1, bundles_id: 3, item_id: 10},
        {id: 7, item_qty: 6, bundles_id: 1, item_id: 11},
        {id: 8, item_qty: 6, bundles_id: 1, item_id: 12},
        {id: 9, item_qty: 2, bundles_id: 2, item_id: 6},
        {id: 10, item_qty: 2, bundles_id: 2, item_id: 7},
        {id: 11, item_qty: 1, bundles_id: 3, item_id: 9},
        {id: 12, item_qty: 1, bundles_id: 3, item_id: 3},
        {id: 13, item_qty: 2, bundles_id: 1, item_id: 20},
      ]);
    });
};
