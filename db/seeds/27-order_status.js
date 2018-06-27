exports.seed = function(knex, Promise) {
  return knex('order_status').del()
    .then(() => {
      return knex('order_status').insert(
        [
          {id:1, name: 'Needed'},
          {id:2, name: 'Pending'},
          {id:3, name: 'Delivered'}
        ]
      );
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('order_status_id_seq', (SELECT MAX(id) FROM order_status));"
      );
    });
};
