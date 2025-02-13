import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  borrowBook,
  returnBook,
} from '../controllers/userController.js';
import {
  validateCreateUser,
  validateIdParams,
  validateBorrowParams,
  validateReturnBook,
} from '../middlewares/validation.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', validateIdParams, getUserById);
router.post('/', validateCreateUser, createUser);
router.post('/:userId/borrow/:bookId', validateBorrowParams, borrowBook);
router.post(
  '/:userId/return/:bookId',
  validateBorrowParams,
  validateReturnBook,
  returnBook
);

export default router; 