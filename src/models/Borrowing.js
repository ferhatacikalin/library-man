import { db } from '../config/database.js';

class Borrowing {
  static tableName = 'borrowings';

  /**
   * Create a new borrowing record
   * @param {Object} borrowData - Borrowing data
   * @param {number} borrowData.user_id - User ID
   * @param {number} borrowData.book_id - Book ID
   * @param {Object} [trx] - Knex transaction object
   * @returns {Promise<Object>} Created borrowing record
   */
  static async createBorrowing(borrowData, trx) {
    const now = new Date();
    const query = (trx || db)(this.tableName)
      .insert({
        ...borrowData,
        borrowed_at: now,
      })
      .returning('id');

    const [id] = await query;
    return this.getBorrowingById(id, trx);
  }

  /**
   * Get borrowing record by ID
   * @param {number} id - Borrowing ID
   * @param {Object} [trx] - Knex transaction object
   * @returns {Promise<Object>} Borrowing record
   */
  static async getBorrowingById(id, trx) {
    return (trx || db)(this.tableName)
      .where({ id })
      .first();
  }

  /**
   * Get active borrowing record for a book
   * @param {number} bookId - Book ID
   * @param {Object} [trx] - Knex transaction object
   * @returns {Promise<Object>} Active borrowing record
   */
  static async getActiveBorrowingByBookId(bookId, trx) {
    return (trx || db)(this.tableName)
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
   * @param {Object} [trx] - Knex transaction object
   * @returns {Promise<Object>} Updated borrowing record
   */
  static async returnBook(userId, bookId, score, trx) {
    const now = new Date();
    
    await (trx || db)(this.tableName)
      .where({
        user_id: userId,
        book_id: bookId,
        returned_at: null,
      })
      .update({
        returned_at: now,
        score,
      });

    return this.getActiveBorrowingByBookId(bookId, trx);
  }

  /**
   * Check if user has any unreturned books
   * @param {number} userId - User ID
   * @param {Object} [trx] - Knex transaction object
   * @returns {Promise<boolean>} True if user has unreturned books
   */
  static async hasUnreturnedBooks(userId, trx) {
    const result = await (trx || db)(this.tableName)
      .where({
        user_id: userId,
        returned_at: null,
      })
      .first('id');
    
    return !!result;
  }
}

export default Borrowing; 