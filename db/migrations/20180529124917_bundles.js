exports.up = function(knex, Promise) {
  return knex.schema.createTable('bundles', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.integer('stock_qty').defaultsTo('0');
    table.string('steps');
    table.integer('category_id').references('categories.id');
    table.integer('product_id').notNullable().references('products.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bundles')
};
