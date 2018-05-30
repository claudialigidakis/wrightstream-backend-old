
exports.seed = function(knex, Promise) {
  return knex('staff').del()
    .then(function () {
      return knex('staff').insert([
        {id: 1, shops_id: 10, role_id: 1, first_name: 'Vikanda', last_name: 'Gonzales', email: 'testtesttest@gmail.com', password: 'password', photo: 'http://cdn.akc.org/600_YorkshireTerrier-coat.jpg'}
      ]);
    });
};
