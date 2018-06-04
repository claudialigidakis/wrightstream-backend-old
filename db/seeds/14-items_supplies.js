
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items_supplies').del()
    .then(function () {
      // Inserts seed entries
      return knex('items_supplies').insert([
        {stock_qty: 4, stock_qty_measure: 'oz', item_id: '1', supplies_id: 1},
        {stock_qty: 6, stock_qty_measure: 'oz', item_id: '1', supplies_id: 2},
        {stock_qty: 3, stock_qty_measure: 'oz', item_id: '1', supplies_id: 3},
      ])
    })
};
