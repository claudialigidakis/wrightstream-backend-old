exports.up = function(knex, Promise) {
  return knex.schema.createTable('purchases_bundles', (table) => {
    table.integer('purchase_id').nullable().references('purchases.id');
    table.integer('bundle_id').notNullable().references('bundles.id');
    table.integer('bundle_qty').notNullable()
    table.boolean('completed').nullable().defaultsTo(false);
    table.integer('staff_id').nullable().references('staff.id');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('purchases_bundles')
};
