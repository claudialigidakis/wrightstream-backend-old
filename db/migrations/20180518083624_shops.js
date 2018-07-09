exports.up = function(knex, Promise) {
  return knex.schema.createTable('shops', (table) => {
    table.increments();
    table.string('shop_name').notNullable();
    table.string('settings').defaultsTo('');
    table.boolean('archived').defaultsTo(false);
    table.string('logo').defaultsTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shops')
};
