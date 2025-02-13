import winston from 'winston';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Log level based on environment
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'development' ? 'debug' : 'warn';
};

// Log format
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Transport configuration
const transports = [
  // Write all logs to console
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }),
  // Write all error logs to error.log
  new winston.transports.File({
    filename: join(__dirname, '../../logs/error.log'),
    level: 'error',
  }),
  // Write all logs to combined.log
  new winston.transports.File({
    filename: join(__dirname, '../../logs/combined.log'),
  }),
];

// Create logger instance
export const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
}); 