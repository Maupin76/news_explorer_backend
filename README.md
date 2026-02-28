NewsExplorer — Backend

NewsExplorer Backend is the server-side application that powers the NewsExplorer full-stack platform. It provides secure user authentication, per-user article persistence, and protected API routes using JWT and MongoDB.

The backend is designed with clean architecture, centralized error handling, validation middleware, and proper user data isolation.

🚀 Features
🔐 Secure user authentication (sign up / sign in)
🧠 Password hashing using Node crypto.scrypt
🪪 Custom JWT (HS256) implementation
🛡 Protected routes with authentication middleware
💾 Per-user saved article persistence
🗑 Secure article deletion with ownership verification
📦 Centralized error handling
✅ Request validation using Celebrate / Joi
🧼 Clean, modular backend structure

🛠️ Tech Stack

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Celebrate / Joi
- Validator
- Custom error classes
- Centralized error handler
- CORS
- JWT (custom HS256 implementation)
- Node crypto.scrypt for password hashing

📁 Project Structure

news_explorer_backend/
│
├── app.js
├── controllers/
│ ├── users.js
│ └── articles.js
│
├── models/
│ ├── user.js
│ └── article.js
│
├── routes/
│ ├── index.js
│ ├── users.js
│ └── articles.js
│
├── middlewares/
│ ├── auth.js
│ ├── error-handler.js
│ ├── logger.js
│ └── validation.js
│
├── utils/
│ ├── config.js
│ └── errors/
│
└── README.md

🔐 Authentication Flow

Sign Up

POST /signup

- Validates input using Celebrate/Joi
- Hashes password using crypto.scrypt
- Stores user in MongoDB

Sign In

- POST /signin
- Validates credentials
- Generates JWT token
- Returns token to client

Protected Routes

All routes below authentication middleware require a valid JWT:

- /articles
- /users

The middleware verifies the token and attaches req.user.

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

Each user only sees and manages their own saved articles.

⚙️ Environment Variables

Create a .env file (not committed):

PORT=3001
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

🧪 Running Locally

Install dependencies:
npm install

Ensure MongoDB is running locally.

Start the server:
npm run dev
or
npm start

Server runs at:
http://localhost:3001

🛡 Security & Architecture Notes

All request validation handled via Celebrate middleware

- Controllers do not send raw error responses
- Centralized error handler processes all errors
- Article deletion verifies ownership before removal
- Per-user isolation enforced at the database query level
- JWT authentication required for all protected routes

📌 Future Improvements

- Token expiration and refresh flow
- Pagination for saved articles
- Rate limiting
- Production deployment configuration
- Enhanced request logging
- Duplicate article prevention per user

👤 Author

Douglas Maupin
Software Engineer
Full-Stack Development
Node • Express • MongoDB • JWT • React
