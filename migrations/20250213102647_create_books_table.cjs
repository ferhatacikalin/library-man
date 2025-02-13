/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('books', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.boolean('is_available').defaultTo(true);
    table.decimal('average_score', 4, 2).defaultTo(0);
    table.integer('total_ratings').defaultTo(0);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('books');
}; 