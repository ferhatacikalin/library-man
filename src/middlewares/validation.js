import Joi from 'joi';

// User validation schemas
const createUserSchema = Joi.object({
  name: Joi.string().required().min(2).max(100),
});

// Book validation schemas
const createBookSchema = Joi.object({
  name: Joi.string().required().min(2).max(255),
});

// Borrowing validation schemas
const returnBookSchema = Joi.object({
  score: Joi.number().integer().min(1).max(10).required(),
});

// Validation middleware factory
const validate = (schema) => {
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      next({
        status: 400,
        message: error.details[0].message,
      });
    }
  };
};

// Parameter validation middleware
const validateParams = (params) => {
  return (req, res, next) => {
    const errors = [];

    params.forEach((param) => {
      const value = Number(req.params[param]);
      if (!value || isNaN(value)) {
        errors.push(`Invalid ${param} parameter`);
      }
    });

    if (errors.length > 0) {
      next({
        status: 400,
        message: errors.join(', '),
      });
      return;
    }

    next();
  };
};

export const validateCreateUser = validate(createUserSchema);
export const validateCreateBook = validate(createBookSchema);
export const validateReturnBook = validate(returnBookSchema);
export const validateIdParams = validateParams(['id']);
export const validateBorrowParams = validateParams(['userId', 'bookId']); 