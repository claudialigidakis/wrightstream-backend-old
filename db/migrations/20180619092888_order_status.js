exports.up = function(knex, Promise) {
  return knex.schema.createTable('order_status', (table) => {
    table.increments();
    table.string('name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('order_status')
};
