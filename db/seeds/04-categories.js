
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {id: 1, name: 'Cupcakes'},
        {id: 2, name: 'Cakes'},
        {id: 3, name: 'Cookies'},
        {id: 4, name: 'Supplies'},
        {id: 5, name: 'Muffins'},
        {id: 6, name: 'Donuts'}
      ]);
    });
};
