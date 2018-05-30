
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bundles_items', (table) => {
    table.increments();
    table.integer('item_qty').notNullable();
    table.integer('bundles_id').references('bundles.id');
    table.integer('item_id').notNullable().references('items.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bundles_items')
};
