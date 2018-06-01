
exports.seed = function(knex, Promise) {
  return knex('shops').del()
    .then(function () {
      return knex('shops').insert([
        {id: 1, shop_name: 'Galvanize'}
      ]);
    });
};
