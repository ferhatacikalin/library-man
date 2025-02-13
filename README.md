# Library Management System

A RESTful API for managing a library system, built with Node.js and Express.

## Features

- User management (create, list, view details)
- Book management (create, list, view details)
- Book borrowing and returning system
- Book rating system
- Average book rating calculation

## Tech Stack

- Node.js & Express.js
- PostgreSQL
- Knex.js (Query Builder)
- Joi (Request Validation)
- Winston (Logging)
- Moment.js (Date Handling)
- Lodash (Utility Functions)

## Prerequisites

- Node.js (v12 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd library-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a PostgreSQL database

4. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the database configuration in `.env`

5. Run migrations:
   ```bash
   npm run migrate
   ```

6. (Optional) Run seeds:
   ```bash
   npm run seed
   ```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Users
- `GET /users` - List all users
- `GET /users/:id` - Get user details
- `POST /users` - Create a new user

### Books
- `GET /books` - List all books
- `GET /books/:id` - Get book details
- `POST /books` - Create a new book

### Borrowing Operations
- `POST /users/:userId/borrow/:bookId` - Borrow a book
- `POST /users/:userId/return/:bookId` - Return a book with rating

## Development

Linting:
```bash
npm run lint
```

Format code:
```bash
npm run format
```

## License

ISC 