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
    const user = await db(this.tableName)
      .where({ id })
      .first('id', 'name');

    if (!user) return null;

    // Get past borrowings (returned books with scores)
    const pastBorrowings = await db('borrowings')
      .join('books', 'borrowings.book_id', 'books.id')
      .where({
        'borrowings.user_id': id,
      })
      .whereNotNull('borrowings.returned_at')
      .select(
        'books.name',
        'borrowings.score as userScore',
        'borrowings.borrowed_at',
        'borrowings.returned_at'
      );

    // Format dates for past borrowings
    const formattedPastBorrowings = pastBorrowings.map(borrowing => ({
      name: borrowing.name,
      userScore: borrowing.userScore,
      borrowedAt: moment(borrowing.borrowed_at).format('YYYY-MM-DD HH:mm:ss'),
      returnedAt: moment(borrowing.returned_at).format('YYYY-MM-DD HH:mm:ss'),
      duration: moment(borrowing.returned_at).diff(moment(borrowing.borrowed_at), 'days')
    }));

    // Get present borrowings (not returned yet)
    const presentBorrowings = await db('borrowings')
      .join('books', 'borrowings.book_id', 'books.id')
      .where({
        'borrowings.user_id': id,
      })
      .whereNull('borrowings.returned_at')
      .select('books.name', 'borrowings.borrowed_at');

    // Format dates for present borrowings
    const formattedPresentBorrowings = presentBorrowings.map(borrowing => ({
      name: borrowing.name,
      borrowedAt: moment(borrowing.borrowed_at).format('YYYY-MM-DD HH:mm:ss'),
      duration: moment().diff(moment(borrowing.borrowed_at), 'days')
    }));

    return {
      ...user,
      books: {
        past: formattedPastBorrowings,
        present: formattedPresentBorrowings,
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