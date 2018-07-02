exports.up = function(knex, Promise) {
  return knex.schema.createTable('purchases_supplies', (table) => {
    table.integer('purchase_id').nullable().references('purchases.id');
    table.integer('supplies_id').notNullable().references('supplies.id');
    table.decimal('supplies_qty').notNullable()
    table.string('supplies_measurement').notNullable()
    table.boolean('completed').notNullable().defaultsTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('purchases_supplies')
};
