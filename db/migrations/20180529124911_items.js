exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.integer('shop_id').notNullable().references('shops.id');
    table.boolean('archived').defaultsTo(false);
    table.decimal('stock_qty').defaultsTo('0');
    table.text('steps').defaultsTo('[]');
    table.integer('category_id').references('categories.id');
    table.integer('product_id').references('products.id');
    table.text('photo').defaultsTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items')
};
