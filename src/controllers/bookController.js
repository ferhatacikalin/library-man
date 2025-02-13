import Book from '../models/Book.js';

/**
 * Get all books with their basic information
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {Promise<void>}
 */
export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

/**
 * Get book details by ID including average rating
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {Promise<void>}
 */
export const getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.getBookById(id);

    if (!book) {
      next({
        status: 404,
        message: 'Book not found',
      });
      return;
    }

    res.json(book);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new book
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {Promise<void>}
 */
export const createBook = async (req, res, next) => {
  try {
    const book = await Book.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
}; 