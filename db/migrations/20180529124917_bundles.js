exports.up = function(knex, Promise) {
  return knex.schema.createTable('bundles', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.integer('stock_qty').defaultsTo('0');
    table.string('steps').defaultsTo('[]');
    table.integer('shop_id').notNullable().references('shops.id');
    table.integer('category_id').references('categories.id');
    table.integer('product_id').references('products.id');
    table.text('photo').defaultsTo(null);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bundles')
};
