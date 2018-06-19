exports.seed = function(knex, Promise) {
  return knex('supplies_status').del()
    .then(() => {
      return knex('supplies_status').insert(
        [
          {id:1, name: 'Needed'},
          {id:2, name: 'Pending'},
          {id:3, name: 'Delivered'}
        ]
      );
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('supplies_status_id_seq', (SELECT MAX(id) FROM supplies_status));"
      );
    });
};
