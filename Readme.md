# Todo Backend API

A secure, JWT-authenticated REST API for user management and todo tracking, built with Node.js, Express, and MongoDB.

---

## Features
- User registration, login, and logout
- Secure JWT authentication (access & refresh tokens via HTTP-only cookies)
- CRUD operations for todos (create, read, update, delete)
- Password hashing with bcrypt
- CORS and cookie security best practices

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d
```

### Running the Server
```bash
npm start
```

---

## API Documentation

### Base URL
```
/api/v1
```

### Authentication & Security
- Most endpoints require authentication via JWT (HTTP-only cookies)
- CORS enabled for `CLIENT_URL` with credentials
- Passwords hashed, tokens signed with secrets
- Use HTTPS in production

---

## Endpoints

### User Endpoints

#### Register
- **POST** `/users/register`
- **Body:**
  ```json
  {
    "fullName": "string",
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** 201 Created, user info (without password)

#### Login
- **POST** `/users/login`
- **Body:**
  ```json
  {
    "username": "string", // or "email": "string"
    "password": "string"
  }
  ```
- **Response:** 200 OK, sets `accessToken` & `refreshToken` cookies, user info

#### Logout
- **POST** `/users/logout`
- **Headers:** Requires valid `accessToken` cookie
- **Response:** 200 OK, clears cookies

---

### Todo Endpoints (Authenticated)

#### Create Todo
- **POST** `/todos/`
- **Body:**
  ```json
  {
    "title": "string",
    "isCompleted": false
  }
  ```
- **Response:** 201 Created, todo item

#### Get All Todos
- **GET** `/todos/`
- **Response:** 200 OK, array of todos

#### Update Todo
- **PUT** `/todos/:todoId`
- **Body:**
  ```json
  {
    "title": "string", // optional
    "isCompleted": true // optional
  }
  ```
- **Response:** 200 OK, updated todo

#### Delete Todo
- **DELETE** `/todos/:todoId`
- **Response:** 200 OK, deleted todo

---

## Error Responses
All errors follow this format:
```json
{
  "statusCode": 400,
  "data": null,
  "message": "Error message",
  "success": false,
  "errors": []
}
```

---

## License
MIT