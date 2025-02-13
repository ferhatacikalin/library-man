import Book from '../models/Book.js';

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } catch (error) {
    next(error);
  }
};

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

export const createBook = async (req, res, next) => {
  try {
    const book = await Book.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
}; 