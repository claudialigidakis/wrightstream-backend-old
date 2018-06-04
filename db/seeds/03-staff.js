
exports.seed = function(knex, Promise) {
  return knex('staff').del()
    .then(function () {
      return knex('staff').insert([
        {id: 1, shops_id: 1, role_id: 1, first_name: 'Vikanda', last_name: 'Gonzales', email: 'test@test', password: '$2a$10$vj6rshiShRql5E0A5DxKWOW6Qso/8C/U4ycefHIp5I5Ua3GW1HESS', photo: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12222652/Yorkshire-Terrier-MP.jpg'}
      ]);
    });
};
