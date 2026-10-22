# CRUD Node, Express, and MongoDB API

A JSON REST API for registering and authenticating users and managing user records. It uses Node.js, Express, MongoDB, and Mongoose, with bcrypt password hashing and JWT-based authentication.

## Features

- User registration and login
- Admin login
- User record listing, updating, and deletion
- Request validation with Joi
- MongoDB persistence with Mongoose
- CORS, Helmet, and Morgan middleware
- Health-check endpoint

## Requirements

- Node.js with ES module support
- npm
- A MongoDB instance (local or hosted)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root. You can use `.env.example` as a starting point:

   ```dotenv
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017
   DATABASE=your_database_name
   JWT_SECRET=replace-with-a-long-random-secret
   ```

   `PORT` is optional; the server defaults to `3000`. `MONGODB_URI`, `DATABASE`, and `JWT_SECRET` should be set for your environment. Keep `.env` private and do not commit credentials or secrets.

3. Start the server:

   ```bash
   npm run dev
   ```

   `npm run dev` starts the server with nodemon. For a regular start, use:

   ```bash
   npm start
   ```

The API is available at `http://localhost:<PORT>`.

## API

Request and response bodies use JSON. Protected endpoints expect a JWT in the `Authorization` header:

```http
Authorization: Bearer <token>
```

| Method | Path | Access | Description |
| --- | --- | --- | --- |
| `GET` | `/health` | Public | Check server status and connected database name. |
| `POST` | `/api/auth/register` | Public | Register a user. |
| `POST` | `/api/users/login` | Public | Log in as a user and receive a JWT. |
| `POST` | `/api/admin/login` | Public | Log in as an admin and receive a JWT. |
| `PATCH` | `/api/users/:id` | Authenticated | Update a user's name. |
| `PUT` | `/api/users/:id` | Authenticated | Replace a user's editable record fields. |
| `GET` | `/api/admin/users` | Admin | List users; password hashes are excluded. |
| `PUT` | `/api/admin/:id` | Admin | Replace a user's editable record fields. |
| `DELETE` | `/api/admin/:id` | Admin | Delete a user. |

### Health check

```http
GET /health
```

Example response:

```json
{
  "status": "OK",
  "message": "The server is running",
  "database": "your_database_name"
}
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
  "password": "StrongPassword1!",
  "role": "user"
}
```

`role` may be `user` or `admin`; if omitted, the model defaults it to `user`. The registration validator makes `age` and `address` optional, but the database model requires both, so include them. Passwords are hashed before storage.

### Log in

User login:

```http
POST /api/users/login
Content-Type: application/json
```

Admin login:

```http
POST /api/admin/login
Content-Type: application/json
```

Both endpoints accept an email and password:

```json
{
  "email": "jane@example.com",
  "password": "StrongPassword1!"
}
```

Successful login returns a JWT token. User tokens expire after one hour; admin tokens expire after one day.

### Update a user

Update a name:

```http
PATCH /api/users/<user-id>
Authorization: Bearer <token>
Content-Type: application/json
```

```json
{
  "name": "Jane Smith"
}
```

`PUT /api/users/<user-id>` and `PUT /api/admin/<user-id>` replace the record and require `name`, `age`, `email`, `address`, and `password`.

### Delete a user

```http
DELETE /api/admin/<user-id>
Authorization: Bearer <admin-token>
```

The `id` in user and admin record routes is the MongoDB document ID.

## Important implementation notes

- The registration endpoint currently allows clients to submit `"role": "admin"`. Restrict admin account creation before exposing the API publicly.
- Admin login issues a token with the role value `admin`, while admin authorization currently checks for `Admin`. Consequently, requests to admin-protected routes are rejected until those role values are aligned.
- User update routes require a valid token but currently do not check that the token belongs to the user being updated.

## Project structure

```text
src/
  config/       MongoDB connection
  controllers/  Authentication and user handlers
  middleware/   Authentication and request validation
  models/       Mongoose user model
  routes/       Express API routes
  validators/   Joi request schemas
  server.js     Application setup and startup
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the API with Node.js. |
| `npm run dev` | Start the API with nodemon. |
| `npm run format` | Format the project with Prettier. |
| `npm run format:check` | Check formatting with Prettier. |
