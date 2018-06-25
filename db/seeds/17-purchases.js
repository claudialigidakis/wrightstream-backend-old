exports.seed = function(knex, Promise) {
  return knex('purchases').del()
    .then(function () {
      return knex('purchases').insert([
        {id: 1, shop_id: 1, staff_id: 1, purchase_date: '1/2/2'},
        {id: 2, shop_id: 1, staff_id: null, purchase_date: '1/2/2'},
        {id: 3, shop_id: 1, staff_id: 1, purchase_date: '1/2/2'},
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('purchases_id_seq', (SELECT MAX(id) FROM purchases));"
      );
    });
};
