# Todo Backend API

A secure, JWT-authenticated REST API for user management and todo tracking, built with Node.js, Express, and MongoDB.

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

####Consider adding "Response codes"
For each route, it's helpful to clarify when a 400, 401, or 404 might be returned.
For example:

markdown
Copy
Edit
#### Update Todo
- **200 OK:** todo updated successfully
- **400 Bad Request:** invalid data
- **401 Unauthorized:** invalid or missing JWT
- **404 Not Found:** todo not found