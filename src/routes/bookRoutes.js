import { Router } from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
} from '../controllers/bookController.js';
import {
  validateCreateBook,
  validateIdParams,
} from '../middlewares/validation.js';

const router = Router();

router.get('/', getAllBooks);
router.get('/:id', validateIdParams, getBookById);
router.post('/', validateCreateBook, createBook);

export default router; 