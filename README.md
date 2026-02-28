📰 News Explorer — Backend

This repository contains the backend for the News Explorer full-stack application.

The backend provides secure authentication and per-user article persistence using MongoDB and JWT.

🚀 Overview

News Explorer allows users to:

Register and log in securely

Search real-time news (handled by frontend API integration)

Save articles to their personal account

View their saved articles

Delete saved articles

Each user only sees and manages their own saved articles.

🛠 Technologies Used
Backend Stack

Node.js

Express.js

MongoDB / Mongoose

Celebrate / Joi (request validation)

Custom error classes

Centralized error handling middleware

CORS

JWT authentication (custom HS256 implementation)

Password hashing using Node crypto.scrypt

🔐 Authentication Flow
Sign Up

POST /signup

Validates request body

Hashes password using scrypt

Stores user in MongoDB

Sign In

POST /signin

Validates credentials

Generates JWT

Returns token to client

Protected Routes

All article routes require a valid JWT.
The authentication middleware verifies the token and attaches req.user.

📡 API Endpoints
Auth
POST /signup
POST /signin
Users
GET /users/me
Articles (Protected)
GET /articles
POST /articles
DELETE /articles/:id
📁 Project Structure
news_explorer_backend/
│
├── app.js
├── controllers/
│ ├── users.js
│ └── articles.js
├── models/
│ ├── user.js
│ └── article.js
├── routes/
├── middlewares/
│ ├── auth.js
│ ├── error-handler.js
│ └── validation.js
├── utils/
│ ├── config.js
│ └── errors/
└── README.md
⚙️ Environment Variables

Create a .env file (not committed):

PORT=3001
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
🧪 Running Locally

Install dependencies

npm install

Make sure MongoDB is running locally.

Start the server

npm run dev

or

npm start

Server runs on:

http://localhost:3001
🧹 Project Notes

This backend was adapted from a previous project.
All unrelated models, routes, and item logic have been removed.

The codebase now strictly supports News Explorer functionality.

📌 Future Improvements

Token expiration and refresh flow

Pagination for saved articles

Rate limiting for security

Production deployment configuration

Enhanced logging strategy
