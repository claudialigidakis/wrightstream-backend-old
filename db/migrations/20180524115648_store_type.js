exports.up = function(knex, Promise) {
  return knex.schema.createTable('store_type', (table) => {
    table.increments();
    table.integer('name').notNullable()
    table.string('store_logo').defaultsTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('store_type')
};
