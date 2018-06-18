exports.up = function(knex, Promise) {
  return knex.schema.createTable('stores', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('tokenSecret')
    table.string('accessToken')
    table.string('accessTokenSecret')
    table.integer('shops_id').notNullable().references('shops.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('stores')
};
