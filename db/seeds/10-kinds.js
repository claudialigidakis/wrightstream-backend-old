
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('kinds').del()
    .then(function () {
      // Inserts seed entries
      return knex('kinds').insert([
        {id: 1, shop_id: 1, name: 'Dairy'},
        {id: 2, shop_id: 1, name: 'Frosting'},
        {id: 3, shop_id: 1, name: 'Supplies'},
        {id: 4, shop_id: 1, name: 'Baking Goods'}
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('kinds_id_seq', (SELECT MAX(id) FROM kinds));"
      );
    });
};
