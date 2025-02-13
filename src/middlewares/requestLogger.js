import { logger } from '../config/logger.js';

const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Log when response is finished
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    logger.http({
      method: req.method,
      path: req.path,
      params: req.params,
      query: req.query,
      body: req.body,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    });
  });

  next();
};

export default requestLogger; 