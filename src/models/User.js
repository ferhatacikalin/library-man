import { db } from '../config/database.js';
import moment from 'moment';

class User {
  static tableName = 'users';

  /**
   * Get all users with their IDs and names
   * @returns {Promise<Array>} Array of users
   */
  static async getAllUsers() {
    return db(this.tableName)
      .select('id', 'name')
      .orderBy('name');
  }

  /**
   * Get user by ID with their borrowing history
   * @param {number} id - User ID
   * @returns {Promise<Object>} User details with borrowing history
   */
  static async getUserById(id) {
    // First check if user exists
    const user = await db(this.tableName)
      .where({ id })
      .first('id', 'name');

    if (!user) return null;

    // Get all borrowings in a single query
    const borrowings = await db('borrowings')
      .join('books', 'borrowings.book_id', 'books.id')
      .where('borrowings.user_id', id)
      .select(
        'books.name',
        'borrowings.score as userScore',
        'borrowings.borrowed_at',
        'borrowings.returned_at'
      );

    // Separate and format past and present borrowings
    const { past, present } = borrowings.reduce(
      (acc, borrowing) => {
        const formatted = {
          name: borrowing.name,
          borrowedAt: moment(borrowing.borrowed_at).format('YYYY-MM-DD HH:mm:ss'),
        };

        if (borrowing.returned_at) {
          // Past borrowing
          acc.past.push({
            ...formatted,
            userScore: borrowing.userScore,
            returnedAt: moment(borrowing.returned_at).format('YYYY-MM-DD HH:mm:ss'),
            duration: moment(borrowing.returned_at).diff(moment(borrowing.borrowed_at), 'days'),
          });
        } else {
          // Present borrowing
          acc.present.push({
            ...formatted,
            duration: moment().diff(moment(borrowing.borrowed_at), 'days'),
          });
        }

        return acc;
      },
      { past: [], present: [] }
    );

    return {
      ...user,
      books: {
        past,
        present,
      },
    };
  }

  /**
   * Create a new user
   * @param {Object} userData - User data
   * @param {string} userData.name - User name
   * @returns {Promise<Object>} Created user
   */
  static async createUser(userData) {
    const [id] = await db(this.tableName)
      .insert({
        ...userData,
        created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: moment().format('YYYY-MM-DD HH:mm:ss'),
      })
      .returning('id');
    
    return this.getUserById(id);
  }

  /**
   * Check if user exists
   * @param {number} id - User ID
   * @returns {Promise<boolean>} True if user exists
   */
  static async exists(id) {
    const result = await db(this.tableName)
      .where({ id })
      .first('id');
    return !!result;
  }
}

export default User; 