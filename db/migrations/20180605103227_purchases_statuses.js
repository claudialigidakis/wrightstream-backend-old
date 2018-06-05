exports.up = function(knex, Promise) {
  return knex.schema.createTable('purchases_statuses', (table) => {
    table.integer('purchase_id').nullable().references('purchases.id');
    table.integer('status_id').notNullable().references('statuses.id');
    table.integer('priority')
    table.string('completed').nullable();
    table.integer('staff_id').references('staff.id');
    table.timestamps('true', 'true');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('purchases_statuses')
};
