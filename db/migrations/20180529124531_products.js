exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('image').notNullable();
    table.integer('store_id').notNullable().references('stores.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products')
};
