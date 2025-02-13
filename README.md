# Library Management System

A Node.js based library management system with REST API endpoints for managing users, books, and book borrowing operations. The system is built using Express.js and modern JavaScript (ES6+) features.

## Features

- User Management
  - List all users
  - Get user details with borrowing history
  - Create new users
- Book Management
  - List all books
  - Get book details with average rating
  - Create new books
- Borrowing Operations
  - Borrow books
  - Return books with ratings
  - Track book availability
  - Calculate book ratings

## Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **Query Builder:** Knex.js
- **Validation:** Joi
- **Logging:** Winston
- **Date Handling:** Moment.js
- **Utility Functions:** Lodash

## Project Structure

```
├── src/
│   ├── config/
│   │   ├── database.js     # Database configuration
│   │   └── logger.js       # Winston logger configuration
│   ├── controllers/
│   │   ├── userController.js   # User-related operations
│   │   └── bookController.js   # Book-related operations
│   ├── models/
│   │   ├── User.js        # User model and queries
│   │   ├── Book.js        # Book model and queries
│   │   └── Borrowing.js   # Borrowing model and queries
│   ├── routes/
│   │   ├── userRoutes.js  # User endpoints
│   │   └── bookRoutes.js  # Book endpoints
│   ├── middlewares/
│   │   ├── errorHandler.js # Global error handling
│   │   └── validation.js   # Request validation
│   ├── utils/
│   │   └── helpers.js      # Utility functions
│   └── app.js              # Express application setup
├── migrations/             # Database migrations
├── seeds/                  # Database seed data
├── knexfile.js            # Knex configuration
└── package.json
```

## API Endpoints

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get user details with borrowing history
- `POST /users` - Create a new user
- `POST /users/:userId/borrow/:bookId` - Borrow a book
- `POST /users/:userId/return/:bookId` - Return a book with rating

### Books

- `GET /books` - Get all books
- `GET /books/:id` - Get book details with average rating
- `POST /books` - Create a new book

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   NODE_ENV=development
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=library_db
   ```
4. Run database migrations:
   ```bash
   npm run migrate
   ```
5. (Optional) Seed the database with test data:
   ```bash
   npm run seed
   ```
6. Start the server:
   ```bash
   npm start
   ```

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:

```json
{
  "error": {
    "message": "Error message here"
  }
}
```

Common status codes:
- `400` - Bad Request (invalid input)
- `404` - Not Found (resource doesn't exist)
- `409` - Conflict (e.g., book already borrowed)
- `500` - Internal Server Error

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Books Table
```sql
CREATE TABLE books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  is_available BOOLEAN DEFAULT true,
  average_score DECIMAL(4,2) DEFAULT 0,
  total_ratings INT DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Borrowings Table
```sql
CREATE TABLE borrowings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  book_id INT NOT NULL,
  score INT,
  borrowed_at DATETIME NOT NULL,
  returned_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);
```

## Features and Implementation Details

- **Transaction Support**: All borrowing and returning operations are wrapped in database transactions to ensure data consistency
- **Input Validation**: All requests are validated using Joi schemas
- **Logging**: Comprehensive logging system using Winston
  - Request logging
  - Error logging
  - Different log levels based on environment
- **Error Handling**: Global error handler for consistent error responses
- **Database Optimization**: 
  - Efficient queries using Knex.js
  - Proper indexing on foreign keys
  - Transaction support for data consistency

## Development

- **Code Style**: ESLint configured with recommended rules
- **Documentation**: JSDoc comments for all functions
- **Error Handling**: Consistent error handling across the application
- **Logging**: Different log levels for development and production

## Testing

The API can be tested using the provided Postman collection. Import the collection and run the requests to test different endpoints.

## License

MIT 