exports.up = function(knex, Promise) {
  return knex.schema.createTable('purchases_items', (table) => {
    table.integer('purchase_id').nullable().references('purchases.id');
    table.integer('item_id').notNullable().references('items.id');
    table.integer('item_qty').notNullable()
    table.boolean('completed').notNullable().defaultsTo(false);
    table.integer('staff_id').nullable().references('staff.id');
    table.timestamps('true', 'true');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('purchases_items')
};
