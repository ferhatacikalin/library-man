import { logger } from '../config/logger.js';

const errorHandler = (err, req, res, next) => {
  // Default error
  const error = {
    status: err.status || 500,
    message: err.message || 'Internal Server Error',
  };

  // Knex error handling
  if (err.code === 'ER_DUP_ENTRY') {
    error.status = 409;
    error.message = 'Duplicate entry';
  }

  // Log error with context
  logger.error({
    message: error.message,
    status: error.status,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
    body: req.body,
    params: req.params,
    query: req.query,
  });

  // Send error response
  res.status(error.status).json({
    error: {
      message: error.message,
    },
  });
};

export default errorHandler; 