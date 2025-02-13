import User from '../models/User.js';
import Book from '../models/Book.js';
import Borrowing from '../models/Borrowing.js';
import { db } from '../config/database.js';

/**
 * Get all users with their basic information
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {Promise<void>}
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * Get user details by ID including borrowing history
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {Promise<void>}
 */
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.getUserById(id);

    if (!user) {
      return next({
        status: 404,
        message: 'User not found',
      });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new user
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {Promise<void>}
 */
export const createUser = async (req, res, next) => {
  try {
    const user = await User.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Borrow a book for a user
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {Promise<void>}
 */
export const borrowBook = async (req, res, next) => {
  const trx = await db.transaction();
  
  try {
    const { userId, bookId } = req.params;

    // Check if user exists
    const userExists = await User.exists(userId);
    if (!userExists) {
      await trx.rollback();
      return next({
        status: 404,
        message: 'User not found',
      });
    }

    // Check if book exists and is available
    const { exists, isAvailable } = await Book.checkAvailability(bookId);
    if (!exists) {
      await trx.rollback();
      return next({
        status: 404,
        message: 'Book not found',
      });
    }

    if (!isAvailable) {
      await trx.rollback();
      return next({
        status: 400,
        message: 'Book is not available',
      });
    }

    // Check if user has any unreturned books
    const hasUnreturned = await Borrowing.hasUnreturnedBooks(userId);
    if (hasUnreturned) {
      await trx.rollback();
      return next({
        status: 400,
        message: 'User has unreturned books',
      });
    }

    // Create borrowing record and update book availability
    await Borrowing.createBorrowing({ user_id: userId, book_id: bookId }, trx);
    await Book.updateAvailability(bookId, false, trx);

    await trx.commit();
    res.status(204).send();
  } catch (error) {
    await trx.rollback();
    next(error);
  }
};

/**
 * Return a book and add rating
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 * @returns {Promise<void>}
 */
export const returnBook = async (req, res, next) => {
  const trx = await db.transaction();
  
  try {
    const { userId, bookId } = req.params;
    const { score } = req.body;

    // Check if user exists
    const userExists = await User.exists(userId);
    if (!userExists) {
      await trx.rollback();
      return next({
        status: 404,
        message: 'User not found',
      });
    }

    // Check if book exists
    const { exists } = await Book.checkAvailability(bookId);
    if (!exists) {
      await trx.rollback();
      return next({
        status: 404,
        message: 'Book not found',
      });
    }

    // Check if user has borrowed this book
    const activeBorrowing = await Borrowing.getActiveBorrowingByBookId(bookId);
    if (!activeBorrowing || activeBorrowing.user_id !== parseInt(userId, 10)) {
      await trx.rollback();
      return next({
        status: 400,
        message: 'User has not borrowed this book',
      });
    }

    // Return book, update availability and rating
    await Borrowing.returnBook(userId, bookId, score, trx);
    await Book.updateAvailability(bookId, true, trx);
    await Book.updateRating(bookId, score, trx);

    await trx.commit();
    res.status(204).send();
  } catch (error) {
    await trx.rollback();
    next(error);
  }
}; 