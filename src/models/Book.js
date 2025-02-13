import { db } from '../config/database.js';

class Book {
  static tableName = 'books';

  /**
   * Get all books with their IDs and names
   * @returns {Promise<Array>} Array of books
   */
  static async getAllBooks() {
    return db(this.tableName)
      .select('id', 'name')
      .orderBy('name');
  }

  /**
   * Get book by ID with average score
   * @param {number} id - Book ID
   * @returns {Promise<Object>} Book details with average score
   */
  static async getBookById(id) {
    const book = await db(this.tableName)
      .where({ id })
      .first('id', 'name', 'is_available', 'average_score as score');

    if (!book) return null;

    // If book has no ratings yet, return score as -1
    if (book.score === 0) {
      book.score = -1;
    }

    return book;
  }

  /**
   * Create a new book
   * @param {Object} bookData - Book data
   * @param {string} bookData.name - Book name
   * @param {Object} [trx] - Knex transaction object
   * @returns {Promise<Object>} Created book
   */
  static async createBook(bookData, trx) {
    const query = (trx || db)(this.tableName)
      .insert({
        ...bookData,
        is_available: true,
        average_score: 0,
        total_ratings: 0,
      })
      .returning('id');

    const [id] = await query;
    return this.getBookById(id);
  }

  /**
   * Check if book exists and is available
   * @param {number} id - Book ID
   * @param {Object} [trx] - Knex transaction object
   * @returns {Promise<Object>} Book availability status
   */
  static async checkAvailability(id, trx) {
    const book = await (trx || db)(this.tableName)
      .where({ id })
      .first('id', 'is_available');

    return {
      exists: !!book,
      isAvailable: book?.is_available || false,
    };
  }

  /**
   * Update book availability status
   * @param {number} id - Book ID
   * @param {boolean} isAvailable - New availability status
   * @param {Object} [trx] - Knex transaction object
   * @returns {Promise<void>}
   */
  static async updateAvailability(id, isAvailable, trx) {
    await (trx || db)(this.tableName)
      .where({ id })
      .update({ is_available: isAvailable });
  }

  /**
   * Update book rating using a single query with raw SQL
   * @param {number} id - Book ID
   * @param {number} newScore - New rating score
   * @param {Object} [trx] - Knex transaction object
   * @returns {Promise<void>}
   */
  static async updateRating(id, newScore, trx) {
    const query = `
      UPDATE ${this.tableName}
      SET 
        total_ratings = total_ratings + 1,
        average_score = ROUND(
          (average_score * total_ratings + ?) / (total_ratings + 1),
          2
        )
      WHERE id = ?
    `;

    if (trx) {
      await trx.raw(query, [newScore, id]);
    } else {
      await db.raw(query, [newScore, id]);
    }
  }
}

export default Book; 