
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shops', (table) => {
    table.increments();
    table.string('shop_name').notNullable();
    table.string('settings')defaultsTo('');
    table.text('logo_url')defaultsTo('');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shops')
};
