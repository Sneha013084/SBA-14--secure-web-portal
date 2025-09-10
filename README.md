## Project Overview

This project implements a secure Express.js backend for Innovate Inc.’s user portal. It provides local and GitHub OAuth authentication, JWT-based authorization, and CRUD operations for user-specific bookmarks. The backend ensures that each user can only access their own data and integrates modern security practices like password hashing, token signing, and modular code design.

## Features

User Registration & Login

Local authentication with email/password.

Passwords hashed using bcrypt.

JWT tokens for session management.

GitHub OAuth Authentication

Login via GitHub using passport-github2.

New users are automatically created if logging in via GitHub for the first time.

JWT token is returned to the client after successful OAuth login.

Secure Bookmark Management

CRUD operations for personal bookmarks.

Authentication required for all bookmark endpoints.

Authorization ensures users can only access their own bookmarks.

Environment-based Configuration

Sensitive credentials stored in .env.

Database connection and OAuth credentials configurable via environment variables.

Backend: Node.js, Express.js

Database: MongoDB / Mongoose

Authentication: JWT, bcrypt, passport, passport-github2

Environment Management: dotenv

Testing: Postman or Insomnia

Authentication & Authorization Flow
1. User Registration (Local Auth)

Endpoint: POST /api/users/register

What happens:

User sends username, email, password.

Backend checks if the user exists → if not, hashes the password with bcrypt.

Stores new user in MongoDB (via User.js model).

Returns user info (without password).

Usage: Called when a new user signs up directly on your portal.

User Login (Local Auth)

Endpoint: POST /api/users/login

What happens:

User sends email and password.

Backend verifies email exists.

Uses user.isCorrectPassword(password) to validate.

If valid → generates JWT using jsonwebtoken.sign.

Sends { token, user } back to client.

Usage: Client stores this token in localStorage/cookie and attaches it to future API requests.
