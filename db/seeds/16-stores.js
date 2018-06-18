exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stores').del()
    .then(function () {
      // Inserts seed entries
      return knex('stores').insert([
        {id: 1, name: 'Etsy', shops_id: 1},
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('stores_id_seq', (SELECT MAX(id) FROM stores));"
      );
    });
};
