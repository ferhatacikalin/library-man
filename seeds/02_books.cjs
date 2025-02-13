/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Truncate all existing tables
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex('books').truncate();
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
  
  // Insert seed entries
  await knex('books').insert([
    { 
      id: 1, 
      name: 'The Hitchhiker\'s Guide to the Galaxy',
      is_available: true,
      average_score: 10.00,
      total_ratings: 1
    },
    { 
      id: 2, 
      name: 'I, Robot',
      is_available: true,
      average_score: 5.33,
      total_ratings: 3
    },
    { 
      id: 3, 
      name: 'Dune',
      is_available: true,
      average_score: 0,
      total_ratings: 0
    },
    { 
      id: 4, 
      name: '1984',
      is_available: true,
      average_score: 0,
      total_ratings: 0
    },
    { 
      id: 5, 
      name: 'Brave New World',
      is_available: false,
      average_score: 0,
      total_ratings: 0
    }
  ]);
}; 