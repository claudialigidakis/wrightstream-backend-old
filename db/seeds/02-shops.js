
exports.seed = function(knex, Promise) {
  return knex('shops').del()
    .then(function () {
      return knex('shops').insert([
        {id: 1, shop_name: 'Galvanize'},
        {id: 2, shop_name: 'Roger\'s Amazing Company' }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('shops_id_seq', (SELECT MAX(id) FROM shops));"
      );
    });
};
