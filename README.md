# Book API

A simple Node.js and Express-based API for managing books, using MongoDB as the database.

## Features

- Add a new book
- Retrieve all books
- Retrieve a book by ID
- Delete a book by ID
- Input validation using `express-validator`

## Prerequisites

- Node.js (v16 or later)
- MongoDB (local or cloud instance)
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/book-api.git
   cd book-api
2. Install dependencies:
```bash
    npm install
```

3. Create a .env file in the root directory and add the following:
```bash
    MONGO_URI=mongodb://localhost:27017/bookdb
    PORT=3000
```
4. Start the application:
```bash
    npm start
```
## Running with Docker
1. Build and run the Docker containers:
``` bash
        docker compose up --build
```
2. The API will be available at http://localhost:3000.

## API Endpoints

### GET /books
Retrieve all books.

### POST /books
Add a new book. Example request body:
``` bash
    {
    "title": "Book Title",
    "author": "Author Name",
    "year": 2023
    }
```
### GET /books/:id
Retrieve a book by its ID.

### DELETE /books/:id
Delete a book by its ID.


