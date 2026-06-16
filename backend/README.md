# Backend — CGS WebX Selections 2026

A production-ready REST API built with Node.js, Express, and MongoDB. Features JWT-based authentication, password hashing, and a fully containerized Docker setup.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (via Mongoose)
- **Auth:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Containerization:** Docker + Docker Compose

---

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── models/
│   │   └── User.js          # User schema and password hashing
│   ├── routes/
│   │   ├── auth.js          # /signup and /signin routes
│   │   ├── user.js          # /me GET and PUT routes
│   │   └── index.js         # Combines all routes
│   ├── app.js               # Express app setup
│   └── server.js            # Entry point
├── .env.example             # Environment variable template
├── Dockerfile               # Multi-stage Docker build
├── docker-compose.yml       # Backend + MongoDB orchestration
├── package.json             # Project metadata, scripts, and dependencies
├── package-lock.json        # Exact dependency versions lockfile
└── README.md                # Project documentation and setup instructions
```

---

## Local Setup (Without Docker)

### Prerequisites
- Node.js v18+
- MongoDB running locally on port 27017

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/heyvarchas/cgs-webx-tasks.git
cd cgs-webx-tasks/backend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Open .env and fill in your values

# 4. Start the development server
npm run dev
```

The server will start at `http://localhost:5000`

---

## Local Setup (With Docker)

### Prerequisites
- Docker Desktop installed and running

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/heyvarchas/cgs-webx-tasks.git
cd cgs-webx-tasks/backend

# 2. Set up environment variables
cp .env.example .env
# Open .env and set JWT_SECRET to a strong random string

# 3. Build and start containers
docker compose up --build

# 4. To stop containers
docker compose down

# 5. To stop and delete all data (including database)
docker compose down -v
```

The server will start at `http://localhost:5000`

---

## API Endpoints

### Auth Routes

#### POST `/api/auth/signup`
Creates a new user account.

**Request Body:**
```json
{
  "username": "john",
  "password": "secret123"
}
```

**Response:**
```json
{
  "message": "Account created successfully",
  "token": "<jwt_token>"
}
```

---

#### GET `/api/auth/signin`
Logs in an existing user.

**Request Query:**
Make sure you add your username and password in the query part of the URL. I've used this because GET request doesn't have a Body. For example -
```
http://localhost:5000/api/auth/signin?username=usrnme&password=pwd
Replace usrnme with your username and pwd with your password
```

**Response:**
```json
{
  "message": "Signed in successfully",
  "token": "<jwt_token>"
}
```

---

### User Routes (Protected)

All protected routes require the following header:
```
Authorization: Bearer <jwt_token>
```

#### GET `/api/user/me`
Returns the logged-in user's profile.

**Response:**
```json
{
  "username": "john",
  "description": ""
}
```

---

#### PUT `/api/user/me`
Updates the logged-in user's description.

**Request Body:**
```json
{
  "description": "hey i'm john!"
}
```

**Response:**
```json
{
  "message": "Description updated successfully",
  "username": "john",
  "description": "hey i'm john!"
}
```

---

## Testing the API

You can test all endpoints using [Thunder Client](https://www.thunderclient.com/) (VS Code extension) or any HTTP client like Postman.

### 1. Signup
- Method: `POST`
- URL: `http://localhost:5000/api/auth/signup`
- Body (JSON):
```json
{
  "username": "testuser",
  "password": "test1234"
}
```
Copy the `token` from the response — you'll need it for the protected routes.

### 2. Signin
- Method: `GET`
- URL: `http://localhost:5000/api/auth/signin?username=testuser&password=test1234`
- No body needed — credentials are passed as query parameters.

### 3. Get Profile
- Method: `GET`
- URL: `http://localhost:5000/api/user/me`
- Headers:
```
Authorization: Bearer <your_token_here>
```

### 4. Update Description
- Method: `PUT`
- URL: `http://localhost:5000/api/user/me`
- Headers:
```
Authorization: Bearer <your_token_here>
```
- Body (JSON):
```json
{
  "description": "hey i'm testuser!"
}
```

---

## Architectural Decisions

### Why Express?
Minimal and unopinionated — gives full control over structure without forcing conventions.

### Why MongoDB + Mongoose?
The user schema is simple and document-oriented. Mongoose adds schema validation and the pre-save hook used for automatic password hashing.

### Why JWT?
Stateless authentication — the server doesn't need to store sessions. The token carries all the information needed to identify the user.

### Password Security
Passwords are never stored in plain text. bcryptjs hashes them with 10 salt rounds before they hit the database. Even if the database is compromised, passwords remain unreadable.

### Docker Setup
A multi-stage Dockerfile keeps the production image lean. Docker Compose orchestrates both the backend and MongoDB containers on a shared internal network, with a named volume for persistent database storage.

---

## Known Limitations

- No rate limiting on auth routes (bonus feature, not implemented)
- No input validation library (basic checks only)
- No test suite

---

*Built for CGS WebX Selections 2026*