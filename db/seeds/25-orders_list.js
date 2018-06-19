exports.seed = function(knex, Promise) {
  return knex('orders_list').del()
    .then(function () {
      return knex('orders_list').insert([
        {order_id: 1, list_id: 2},
        {order_id: 1, list_id: 3},
        {order_id: 2, list_id: 1}
      ]);
    });
};
