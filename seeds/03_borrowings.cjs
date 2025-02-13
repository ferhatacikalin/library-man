/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Truncate all existing tables
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex('borrowings').truncate();
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
  
  const now = new Date();
  const pastDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

  // Insert seed entries
  await knex('borrowings').insert([
    {
      user_id: 2,
      book_id: 1,
      score: 10,
      borrowed_at: pastDate,
      returned_at: now
    },
    {
      user_id: 2,
      book_id: 2,
      score: 5,
      borrowed_at: pastDate,
      returned_at: now
    },
    {
      user_id: 2,
      book_id: 5,
      borrowed_at: now,
      returned_at: null
    }
  ]);
}; 