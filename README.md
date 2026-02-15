# MERN JWT Authentication System

A full-stack authentication system built using the MERN stack (MongoDB, Express, React, Node.js).  
This project implements secure user authentication using JSON Web Tokens (JWT) and hashed passwords.

---

## Overview

This repository demonstrates a secure authentication flow including user registration, login, protected routes, and logout functionality.

The system ensures that user passwords are never stored in plain text. Instead, passwords are securely hashed before being stored in the database.

Authentication is handled using JWT tokens, allowing protected routes to be accessed only by verified users.

---

## Core Features

- User Registration (Signup)
- User Login
- Password Hashing using bcrypt
- JWT Token Generation
- Token-Based Authentication
- Protected Backend Routes
- Secure Middleware Verification
- Logout Functionality
- Dynamic UI Update After Login

---

## Security Implementation

### Password Protection

- User passwords are hashed using `bcrypt` before being stored.
- Plain text passwords are never saved in the database.
- During login, bcrypt compares the entered password with the hashed version stored in MongoDB.

### JWT Authentication

- Upon successful login, a JSON Web Token is generated.
- The token contains the user ID as payload.
- The token is signed using a secret key stored in environment variables.
- The token is sent to the client and stored securely.
- Protected routes verify the token using middleware.
- Invalid or expired tokens are rejected.

---

## Authentication Flow

1. User registers.
2. Password is hashed using bcrypt.
3. User logs in with credentials.
4. Server validates credentials.
5. JWT token is generated.
6. Token is stored on the client side.
7. Axios attaches the token automatically to protected requests.
8. Middleware verifies the token before granting access.

---

## Backend Architecture

- Express handles routing.
- Mongoose manages MongoDB models.
- Middleware verifies JWT tokens.
- Environment variables store sensitive keys.
- CORS is configured for secure cross-origin requests.

---

## Frontend Architecture

- React handles UI and state management.
- Axios is configured with a reusable instance.
- Axios interceptors attach the JWT token automatically.
- UI updates dynamically after successful authentication.
- Header reflects authenticated state without requiring a page refresh.

---

## Protected Route Example

Protected routes require:

```
Authorization: Bearer <token>
```

If the token is:
- Missing → request is rejected
- Invalid → request is rejected
- Valid → access is granted

---

## Learning Focus

This project focuses on:

- Secure password storage
- Stateless authentication using JWT
- Backend middleware protection
- Full authentication lifecycle
- Clean separation between frontend and backend logic
- Proper API structure and token handling



