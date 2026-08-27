# URL Shortener & Analytics Service

A backend-focused URL shortening service (inspired by Bitly) built with **Node.js**, **Express**, and **MongoDB**. It takes a long URL, generates a short version, and tracks how many times each short link is clicked — along with authenticated user sessions using JWT.

> **Note:** This project is primarily a backend implementation. The frontend (built with EJS) is intentionally minimal, since the focus of this project was designing the backend architecture, authentication flow, and click-analytics logic.

## Features

- 🔗 **Shorten any valid URL** into a compact, shareable link
- 📊 **Click tracking** — records the number of times each short URL has been visited
- 🔐 **User authentication** — signup/login system using JWT-based sessions (stored via cookies)
- 🧩 **MVC-style architecture** — clean separation between routes, controllers, models, and services
- 🍪 **Cookie-based session handling** via `cookie-parser`
- 🌱 **Environment-based configuration** using `.env` for secrets and config values

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Database | MongoDB (via Mongoose) |
| Authentication | JSON Web Tokens (`jsonwebtoken`) |
| Views (basic frontend) | EJS |
| Short ID Generation | `nanoid` / `uuid` |
| Session Handling | `cookie-parser` |
| Dev Tooling | `nodemon` |

## Project Structure

```
├── controllers/     # Request handlers — business logic for URLs and users
├── middleware/       # Auth middleware — verifies JWT on protected routes
├── models/           # Mongoose schemas (URL, User)
├── routes/           # Express route definitions (url routes, user routes)
├── service/           # Core services — JWT creation & verification (auth.js)
├── views/             # EJS templates for basic frontend (home, login, signup)
├── public/            # Static CSS files for the basic views
├── .postman / postman/ # Postman collection for testing API endpoints
├── app.js             # Application entry point
├── connect.js         # MongoDB connection setup
└── package.json
```

## How It Works

1. **User Authentication**
   - Users sign up / log in through basic EJS-rendered forms.
   - On successful login, the server generates a JWT (`service/auth.js → setUser()`) containing the user's `_id` and `email`, and sends it back as a cookie.
   - Protected routes use middleware to verify this token (`getUser()`) before allowing access — attaching the authenticated user's info to the request.

2. **URL Shortening**
   - A user submits a long URL.
   - The server generates a unique short identifier (using `nanoid`/`uuid`) and stores a mapping between the short ID and the original URL in MongoDB.

3. **Redirection & Click Tracking**
   - When someone visits a short URL, the server looks up the original URL in the database, logs/increments the click count, and redirects the visitor to the original destination.

4. **Analytics**
   - Each URL document tracks how many times it has been visited, giving users basic insight into link performance.

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB running locally or a MongoDB Atlas connection string

### Installation

```bash
git clone https://github.com/Jashnoor2206/URL-Shortner-and-Analytical-Services.git
cd URL-Shortner-and-Analytical-Services
npm install
```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
SECRET=your_jwt_secret_here
DB_URL=your_mongodb_connection_string
```

### Running the App

```bash
npm start
```
or, for auto-restart during development:
```bash
npx nodemon app.js
```

The app should now be running at `http://localhost:3000` (or whatever port you set in `.env`).

## API Testing

A Postman collection is included in the `.postman` / `postman` directory — import it into Postman to quickly test the authentication and URL-shortening endpoints without going through the UI.

## Future Improvements

- Expand the frontend with a more polished, responsive UI
- Add per-user dashboards showing analytics for all their shortened URLs
- Add custom alias support (user-defined short codes instead of auto-generated ones)
- Add rate limiting to prevent abuse of the shortening endpoint
- Add link expiration functionality

## Author

**Jashnoor Singh**
[GitHub Profile](https://github.com/Jashnoor2206)
