exports.seed = function(knex, Promise) {
  return knex('categories').del().then(function() {
    return knex('categories').insert([
      {id: 1, shop_id: 1, name: 'Cupcakes'},
      {
        id: 2,
        shop_id: 1,
        name: 'Cakes'
      }, {
        id: 3,
        shop_id: 1,
        name: 'Cookies'
      }, {
        id: 4,
        shop_id: 1,
        name: 'Supplies'
      }, {
        id: 5,
        shop_id: 1,
        name: 'Muffins'
      }, {
        id: 6,
        shop_id: 1,
        name: 'Donuts'}
    ])
  })
  .then(() => {
    return knex.raw("SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories));");
  });
};
