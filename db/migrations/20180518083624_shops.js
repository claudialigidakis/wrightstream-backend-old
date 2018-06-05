exports.up = function(knex, Promise) {
  return knex.schema.createTable('shops', (table) => {
    table.increments();
    table.string('shop_name').notNullable();
    table.string('settings').defaultsTo('');
    table.string('logo').defaultsTo(null)
    table.timestamp('true', 'true');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shops')
};
