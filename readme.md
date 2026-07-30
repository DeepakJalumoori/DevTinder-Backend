# DevTinder

DevTinder is a Node.js/Express backend for a developer-focused social networking app. It supports user authentication, profile management, connection requests, a discover feed, chat history, and email notifications.

## Features

- User signup, login, and logout
- JWT-based authentication with cookie storage
- Profile viewing and editing
- Send and review connection requests
- View received requests, accepted connections, and a user feed
- Chat history retrieval for conversations between users
- Email notifications through AWS SES

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Socket.IO for real-time features
- AWS SES for sending emails

## Project Structure

- src/app.js: application entry point
- src/routes/: API route handlers for auth, profiles, requests, users, and chat
- src/models/: Mongoose models for users, chats, and connection requests
- src/utils/: helper modules for validation, email, and socket setup
- Middlewares/auth.js: authentication middleware

## Prerequisites

- Node.js (v18 or newer recommended)
- MongoDB instance
- AWS SES credentials for email sending

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the project root with the following variables:
   ```env
   PORT=3000
   DB_CONNECTION_SECRET=mongodb://localhost:27017/devtinder
   AWS_ACCESS_KEY=your_aws_access_key
   AWS_SECRET_KEY=your_aws_secret_key
   ```

## Running the Project

Start the server in development mode:

```bash
npm run dev
```

Or run it normally:

```bash
npm start
```

The server will run on the port defined in your .env file.

## API Overview

### Authentication

- POST /signup
- POST /login
- POST /logout

### Profile

- GET /profile
- PATCH /edit

### Requests

- POST /request/send/:status/:toUserId
- POST /request/review/:status/:requestId

### User Data

- GET /user/requests/received
- GET /user/connections
- GET /user/feed?page=1&limit=20

### Chat

- GET /chat/:targetUserId

## Notes

- CORS is configured for a frontend running at http://localhost:5173.
- The app uses cookies for authentication, so the frontend should allow credentials in requests.

## License

This project is licensed under ISC.
