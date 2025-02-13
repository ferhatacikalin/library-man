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
      .first('id', 'name', 'average_score as score');

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
   * @returns {Promise<Object>} Created book
   */
  static async createBook(bookData) {
    const [id] = await db(this.tableName)
      .insert(bookData)
      .returning('id');
    
    return this.getBookById(id);
  }

  /**
   * Check if book exists and is available
   * @param {number} id - Book ID
   * @returns {Promise<Object>} Book availability status
   */
  static async checkAvailability(id) {
    const book = await db(this.tableName)
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
   * @returns {Promise<void>}
   */
  static async updateAvailability(id, isAvailable) {
    await db(this.tableName)
      .where({ id })
      .update({ is_available: isAvailable });
  }

  /**
   * Update book rating
   * @param {number} id - Book ID
   * @param {number} newScore - New rating score
   * @returns {Promise<void>}
   */
  static async updateRating(id, newScore) {
    const book = await db(this.tableName)
      .where({ id })
      .first('total_ratings', 'average_score');

    const newTotalRatings = book.total_ratings + 1;
    const newAverageScore = (
      (book.average_score * book.total_ratings + newScore) /
      newTotalRatings
    ).toFixed(2);

    await db(this.tableName)
      .where({ id })
      .update({
        total_ratings: newTotalRatings,
        average_score: newAverageScore,
      });
  }
}

export default Book; 