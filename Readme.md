# Todo App

A full-stack MERN application for managing your daily tasks. This project features a React frontend and a Node.js/Express backend with JWT authentication.

---

## Features

- User registration and login with JWT authentication
- Create, Read, Update, and Delete (CRUD) functionality for todos
- A responsive and user-friendly interface

---

## Technologies Used

- **Frontend:** React, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v14 or later)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)

---

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Install backend dependencies:**

    ```bash
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd client
    npm install
    cd ..
    ```

4.  **Create a `.env` file in the root directory and add the following environment variables:**

    ```env
    PORT=8000
    MONGODB_URI=your_mongodb_connection_string
    CORS_ORIGIN=http://localhost:3000
    ACCESS_TOKEN_SECRET=your_access_token_secret
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    REFRESH_TOKEN_EXPIRY=10d
    ```

---

## Running the Application

1.  **Start the backend server:**

    ```bash
    npm run dev
    ```

2.  **Start the frontend development server:**

    ```bash
    cd client
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

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
