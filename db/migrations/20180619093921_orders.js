exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders', (table) => {
    table.increments();
    table.timestamps('true', 'true');
    table.integer('status_id').references('order_status.id').defaultsTo(1);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders')
};
