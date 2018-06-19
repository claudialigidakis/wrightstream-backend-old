exports.up = function(knex, Promise) {
  return knex.schema.createTable('supplies_status', (table) => {
    table.increments();
    table.string('name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('supplies_status')
};
