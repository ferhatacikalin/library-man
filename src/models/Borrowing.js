import { db } from '../config/database.js';

class Borrowing {
  static tableName = 'borrowings';

  /**
   * Create a new borrowing record
   * @param {Object} borrowData - Borrowing data
   * @param {number} borrowData.user_id - User ID
   * @param {number} borrowData.book_id - Book ID
   * @returns {Promise<Object>} Created borrowing record
   */
  static async createBorrowing(borrowData) {
    const now = new Date();
    const [id] = await db(this.tableName)
      .insert({
        ...borrowData,
        borrowed_at: now,
      })
      .returning('id');

    return this.getBorrowingById(id);
  }

  /**
   * Get borrowing record by ID
   * @param {number} id - Borrowing ID
   * @returns {Promise<Object>} Borrowing record
   */
  static async getBorrowingById(id) {
    return db(this.tableName)
      .where({ id })
      .first();
  }

  /**
   * Get active borrowing record for a book
   * @param {number} bookId - Book ID
   * @returns {Promise<Object>} Active borrowing record
   */
  static async getActiveBorrowingByBookId(bookId) {
    return db(this.tableName)
      .where({
        book_id: bookId,
        returned_at: null,
      })
      .first();
  }

  /**
   * Return a book and add rating
   * @param {number} userId - User ID
   * @param {number} bookId - Book ID
   * @param {number} score - Rating score
   * @returns {Promise<Object>} Updated borrowing record
   */
  static async returnBook(userId, bookId, score) {
    const now = new Date();
    
    await db(this.tableName)
      .where({
        user_id: userId,
        book_id: bookId,
        returned_at: null,
      })
      .update({
        returned_at: now,
        score,
      });

    return this.getActiveBorrowingByBookId(bookId);
  }

  /**
   * Check if user has any unreturned books
   * @param {number} userId - User ID
   * @returns {Promise<boolean>} True if user has unreturned books
   */
  static async hasUnreturnedBooks(userId) {
    const result = await db(this.tableName)
      .where({
        user_id: userId,
        returned_at: null,
      })
      .first('id');
    
    return !!result;
  }
}

export default Borrowing; 