exports.up = function(knex, Promise) {
  return knex.schema.createTable('lists', (table) => {
    table.increments();
    table.boolean('deleted').defaultsTo(false);
    table.integer('shop_id').references('shops.id');
    table.string('name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('lists')
};
