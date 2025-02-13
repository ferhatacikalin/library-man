/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Truncate all existing tables
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex('users').truncate();
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
  
  // Insert seed entries
  await knex('users').insert([
    { id: 1, name: 'Eray Aslan' },
    { id: 2, name: 'Enes Faruk Meniz' },
    { id: 3, name: 'Sefa Eren Şahin' },
    { id: 4, name: 'Kadir Mutlu' }
  ]);
};
