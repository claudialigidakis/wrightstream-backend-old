
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('kinds').del()
    .then(function () {
      // Inserts seed entries
      return knex('kinds').insert([
        {id: 1, name: 'Dairy'},
        {id: 2, name: 'Frosting'},
        {id: 3, name: 'Supplies'},
        {id: 4, name: 'Baking Goods'}
      ]);
    });
};
