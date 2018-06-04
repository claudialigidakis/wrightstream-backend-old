
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('type').del()
    .then(function () {
      // Inserts seed entries
      return knex('type').insert([
        {id: 1, shop_id: 1, name: 'email'},
        {id: 2, shop_id: 1, name: 'url'},
        {id: 3, shop_id: 1, name: 'custom'}
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('type_id_seq', (SELECT MAX(id) FROM type));"
      );
    });
};
