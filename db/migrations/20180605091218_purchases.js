exports.up = function(knex, Promise) {
  return knex.schema.createTable('purchases', (table) => {
    table.increments();
    table.integer('store_id').nullable().references('stores.id');
    table.integer('shop_id').notNullable().references('shops.id');
    table.integer('staff_id').notNullable().references('staff.id');
    table.string('purchase_date').nullable();
    table.integer('order_id').nullable()
    table.string('service').nullable();
    table.string('tracking').nullable();
    table.date('delivery_date').nullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('purchases')
};