
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sources').del()
    .then(function () {
      // Inserts seed entries
      return knex('sources').insert([
        {id: 1, name: 'Georgias Dairy Farm', shop_id: 1, link: 'email@email', type_id: '1'},
        {id: 2, name: 'Charlies Frosting Factory', shop_id: 1, link: 'email@email', type_id: '1'},
        {id: 3, name: 'Amazon', link: 'amazon.com', shop_id: 1, type_id: '2'},
      ]);
    });
};
