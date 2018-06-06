exports.up = function(knex, Promise) {
  return knex.schema.createTable('stores', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.integer('refresh_token').notNullable();
    table.integer('access_token').notNullable();
    table.integer('shops_id').notNullable().references('shops.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('stores')
};
