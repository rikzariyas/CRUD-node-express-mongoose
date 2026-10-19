# CRUD Node, Express, and MongoDB API

A REST API for registering users and managing user records. It is built with Node.js, Express, and Mongoose, and stores user passwords as bcrypt hashes.

## Features

- User registration
- Admin credential login
- List users without returning password hashes
- Update and delete user records
- Health-check endpoint
- CORS and Helmet middleware

## Requirements

- Node.js (ES modules supported)
- npm
- MongoDB running locally or a MongoDB connection URI

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and set the values for your environment:

   ```dotenv
   PORT=4200
   ADMIN_USERNAME=admin@example.com
   ADMIN_PASSWORD=replace-with-a-strong-password
   MONGODB_URI=mongodb://localhost:27017
   DATABASE=CRUD1
   ```

   `MONGODB_URI` is the MongoDB server URI, and `DATABASE` is the database name. Keep your `.env` file private and do not commit real credentials.

3. Start the API:

   ```bash
   npm run dev
   ```

   For a regular Node.js start without nodemon:

   ```bash
   npm start
   ```

The API listens on the configured `PORT` (4200 in the example). If `PORT` is unset, the server uses port `3000`.

## API

All request and response bodies use JSON unless noted otherwise.

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/health` | Check that the server is running. |
| `POST` | `/api/auth/register` | Register a user. |
| `POST` | `/api/auth/login` | Check the configured admin username and password. |
| `GET` | `/api/users` | Return all users without password hashes. |
| `PATCH` | `/api/users/:id` | Partially update a user's name. |
| `PUT` | `/api/users/:id` | Replace a user record. |
| `DELETE` | `/api/users/:id` | Delete a user. The handler currently reads `userId` from the JSON request body. |

### Health check

```http
GET /health
```

### Register a user

```http
POST /api/auth/register
Content-Type: application/json
```

```json
{
  "name": "Jane Doe",
  "age": 30,
  "email": "jane@example.com",
  "address": "123 Main Street",
  "password": "choose-a-password"
}
```

The user schema requires `name`, `age`, `email`, `address`, and `password`. Passwords are hashed before storage.

### Admin login

```http
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "username": "admin@example.com",
  "password": "replace-with-a-strong-password"
}
```

The credentials are compared against `ADMIN_USERNAME` and `ADMIN_PASSWORD` from `.env`. This endpoint does not authenticate registered user accounts or issue a token.

### List users

```http
GET /api/users
```

### Update and delete notes

The update routes are declared with an `:id` path parameter, but their handlers currently look up a `userId` parameter. As a result, `PATCH` and `PUT` may not find the requested user until the route and handler parameter names are aligned.

The delete handler reads `userId` from the JSON request body rather than from the `:id` path parameter. For example:

```http
DELETE /api/users/<user-id>
Content-Type: application/json
```

```json
{
  "userId": "<user-id>"
}
```

## Project structure

```text
src/
  config/       MongoDB connection
  controllers/  Authentication and user handlers
  models/       Mongoose user model
  routes/       Express API routes
  server.js     Application setup and startup
```
