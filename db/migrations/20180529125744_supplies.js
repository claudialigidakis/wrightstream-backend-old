exports.up = function(knex, Promise) {
  return knex.schema.createTable('supplies', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.decimal('stock_qty').defaultsTo('0');
    table.string('stock_qty_measure_type');
    table.string('measure_type');
    table.integer('shop_id').notNullable().references('shops.id');
    table.integer('source_id').references('sources.id');
    table.integer('kind_id').references('kinds.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('supplies')
};
