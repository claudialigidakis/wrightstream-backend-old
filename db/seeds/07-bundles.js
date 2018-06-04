
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('bundles').del()
    .then(function () {
      // Inserts seed entries
      return knex('bundles').insert([
        {id: 1, name: 'Birthday Surprise', stock_qty: 2, steps: '[]', shop_id: 1, category_id: 6},
        {id: 2, name: 'Mothers Day', stock_qty: 3, steps: '[]', shop_id: 1, category_id: 3},
        {id: 3, name: 'Spring Refresh', stock_qty: 7, steps: '[]', shop_id: 1, category_id: 2}
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('bundles_id_seq', (SELECT MAX(id) FROM bundles));"
      );
    });
};
