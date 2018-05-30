exports.up = function(knex, Promise) {
  return knex.schema.createTable('items_supplies', (table) => {
    table.integer('stock_qty').defaultsTo('0');
    table.string('stock_qty_measure');
    table.integer('item_id').references('items.id');
    table.integer('supplies_id').references('supplies.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items_supplies')
};
