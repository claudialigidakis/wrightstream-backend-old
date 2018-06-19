exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders_list', (table) => {
    table.integer('order_id').references('orders.id');
    table.integer('list_id').references('lists.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders_list')
};
