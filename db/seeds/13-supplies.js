
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('supplies').del()
    .then(function () {
      // Inserts seed entries
      return knex('supplies').insert([
        {id: 1, name: 'Milk', stock_qty: 60, stock_qty_measure_type: 'oz', measure_type: 'volume', shop_id: 1, source_id: 1, kind_id: 1},
        {id: 2, name: 'Flour', stock_qty: 60, stock_qty_measure_type: 'length', measure_type: 'area', shop_id: 1, source_id: 3, kind_id: 4},
        {id: 3, name: 'Frosting', stock_qty: 20, stock_qty_measure_type: 'oz', measure_type: 'volume', shop_id: 1, source_id: 2, kind_id: 2},
        {id: 4, name: 'Candle Stick', stock_qty: 40, stock_qty_measure_type: 'unit', measure_type: 'unit', shop_id: 1, source_id: 3, kind_id: 3},
        {id: 5, name: 'Cutting Knife', stock_qty: 14, stock_qty_measure_type: 'unit', measure_type: 'unit', shop_id: 1, source_id: 3, kind_id: 3},
        {id: 6, name: 'Cupcake Wrapper', stock_qty: 6, stock_qty_measure_type: 'unit', measure_type: 'unit', shop_id: 1, source_id: 3, kind_id: 3}
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('supplies_id_seq', (SELECT MAX(id) FROM supplies));"
      );
    });
};
