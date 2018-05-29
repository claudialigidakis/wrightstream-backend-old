exports.up = function(knex, Promise) {
  return knex.schema.createTable('sources', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.text('link').notNullable();
    table.integer('type_id').notNullable().references('type.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sources')
};
