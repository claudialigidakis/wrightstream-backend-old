exports.up = function(knex, Promise) {
  return knex.schema.createTable('shops', (table) => {
    table.increments();
    table.string('shop_name').notNullable();
    table.string('settings').defaultsTo('');
    table.string('logo').defaultsTo(null);
    table.string('tokenSecret')
    // table.string('requestToken')
    // table.string('requestVerifier')
    table.string('accessToken')
    table.string('accessTokenSecret')
    table.timestamps('true', 'true');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shops')
};
