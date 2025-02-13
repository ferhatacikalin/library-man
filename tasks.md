# Library Management System - Project Tasks

## Project Overview
A Node.js based library management system with REST API endpoints for managing users, books, and book borrowing operations. The system will be built using Express.js and modern JavaScript (ES5+) features.

## Tech Stack
- Node.js & Express.js
- ES5+ JavaScript
- MySQL (Relational Database)
- Knex.js (Query Builder)
- Joi (Request Validation)
- Winston (Logging)
- Moment.js (Date Handling)
- Lodash (Utility Functions)

## Project Structure
```
├── src/
│   ├── config/
│   │   ├── database.js
│   │   └── logger.js
│   ├── controllers/
│   │   ├── userController.js
│   │   └── bookController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Book.js
│   │   └── Borrowing.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   └── bookRoutes.js
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── utils/
│   │   └── helpers.js
│   └── app.js
├── migrations/
├── seeds/
├── knexfile.js
├── package.json
└── README.md
```

## Tasks Breakdown

### 1. Project Setup (Priority: High)
- [x] Initialize Git repository
- [x] Create project structure
- [x] Initialize npm project
- [x] Install required dependencies
- [x] Configure ESLint with provided rules
- [x] Create basic README.md

### 2. Database Setup (Priority: High)
- [x] Configure Knex.js
- [x] Create migrations for:
  - [x] Users table
  - [x] Books table
  - [x] Borrowings table
- [x] Create seed data for testing
- [x] Set up database connection

### 3. API Endpoints Implementation (Priority: High)

#### User Management
- [ ] GET /users
  - List all users
  - Return user IDs and names
- [ ] GET /users/:id
  - Get user details
  - Include past and present borrowed books
- [ ] POST /users
  - Create new user
  - Validate request body

#### Book Management
- [ ] GET /books
  - List all books
  - Return book IDs and names
- [ ] GET /books/:id
  - Get book details
  - Calculate and return average rating
- [ ] POST /books
  - Create new book
  - Validate request body

#### Borrowing Operations
- [ ] POST /users/:userId/borrow/:bookId
  - Implement borrow logic
  - Add validation for existing user/book
  - Check if book is available
- [ ] POST /users/:userId/return/:bookId
  - Implement return logic
  - Handle book rating
  - Update book average score

### 4. Error Handling & Validation (Priority: High)
- [x] Implement global error handler
- [ ] Create Joi validation schemas for:
  - [ ] User creation
  - [ ] Book creation
  - [ ] Book rating
- [ ] Handle common error scenarios:
  - [ ] Non-existing user/book
  - [ ] Already borrowed book
  - [ ] Invalid input data

### 5. Logging & Monitoring (Priority: Medium)
- [ ] Set up Winston logger
- [ ] Implement request logging
- [ ] Add error logging
- [ ] Configure different log levels

### 6. Testing & Documentation (Priority: Medium)
- [x] Test all endpoints with Postman collection
- [x] Document API endpoints in README
- [x] Add setup instructions
- [x] Document error codes and responses

### 7. Code Quality & Optimization (Priority: Medium)
- [ ] Implement proper code comments
- [ ] Add JSDoc documentation
- [ ] Optimize database queries
- [ ] Add input sanitization

### 8. Final Steps (Priority: Low)
- [ ] Review and refactor code
- [ ] Ensure all endpoints match Postman collection
- [ ] Verify error handling
- [ ] Final testing and documentation review

## Success Criteria
- All endpoints working as specified in Postman collection
- Proper error handling and validation
- Clean and maintainable code structure
- Complete documentation
- Efficient database queries
- Proper logging implementation

## Notes
- Follow provided code style guidelines
- Use ES5+ features appropriately
- Maintain consistent error handling
- Keep performance in mind for book viewing operations
- Regular commits with meaningful messages 