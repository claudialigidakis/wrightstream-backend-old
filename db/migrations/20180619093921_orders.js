exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', (table) => {
    table.increments();
    table.timestamps('true', 'true');
    table.integer('status_id').defaultsTo(1).references('order_status.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders')
};
