exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stores').del()
    .then(function () {
      // Inserts seed entries
      return knex('stores').insert([
        {id: 1, name: 'Etsy', refresh_token: 60231, access_token: 231231, shops_id: 1},
      ])
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('stores_id_seq', (SELECT MAX(id) FROM stores));"
      );
    });
};
