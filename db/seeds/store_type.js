exports.seed = function(knex, Promise) {
  return knex('store_type').del()
    .then(() => {
      return knex('store_type').insert(
        [
          {id:1, name: 'Custom', store_logo:'this'},
          {id:2, name: 'Etsy', store_logo:'this'},
          {id:3, name: 'Shopify', store_logo:'this'},
        ]
      );
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('store_type_id_seq', (SELECT MAX(id) FROM store_type));"
      );
    });
};
