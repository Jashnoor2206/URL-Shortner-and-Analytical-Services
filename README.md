# URL Shortener & Analytics Service

A backend-focused URL shortener (inspired by Bitly) built with **Node.js, Express and MongoDB**. Logged-in users can turn long URLs into short links, and every visit to a short link is recorded so click counts can be viewed through an analytics endpoint.

> The frontend (EJS) is intentionally minimal. The focus of this project was the backend design: authentication, URL generation, redirection and click tracking.

## Features

- **Shorten URLs:** generates an 8-character unique ID with `nanoid`. Submitting the same URL again returns the existing short ID instead of creating a duplicate.
- **Click analytics:** every redirect pushes a timestamp into the link's `visitHistory`. `GET /url/analytics/:shortID` returns the total click count.
- **Authentication:** signup and login with JWT sessions stored in cookies. Middleware protects the `/url` routes.
- **Per-user dashboard:** the home page lists only the short links created by the logged-in user.
- **MVC structure:** routes, controllers, models, middleware and services are separated.
- **Postman collection** included for testing the API.

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime / server | Node.js, Express 5 |
| Database | MongoDB with Mongoose |
| Auth | `jsonwebtoken`, `cookie-parser` |
| ID generation | `nanoid` |
| Views | EJS |

## Project Structure

```
├── app.js           # Express app, route mounting
├── connect.js       # MongoDB connection, then starts the server on port 3000
├── controllers/     # url.js (shorten, redirect, analytics), user.js (signup, login)
├── routes/          # url.js, user.js
├── models/          # url.js, user.js (Mongoose schemas)
├── middleware/      # auth.js (checks the JWT cookie)
├── service/         # auth.js (creates and verifies JWTs)
├── views/           # login, signup, homepage (EJS)
├── public/          # CSS
└── postman/         # Postman collection
```

## API Endpoints

All `/url` routes require a logged-in user (the JWT is sent as a cookie).

| Method | Route | Description |
|---|---|---|
| `POST` | `/user/createUser` | Sign up (`name`, `email`, `password`) |
| `POST` | `/user/login` | Log in (`email`, `password`) |
| `GET` | `/url` | Dashboard with your short links |
| `POST` | `/url` | Create a short link. Body: `{ "url": "https://example.com" }`. Returns `{ "id": "<shortID>" }` |
| `GET` | `/url/:shortID` | Redirects to the original URL and records the visit |
| `GET` | `/url/analytics/:shortID` | Returns `{ "totalClicks": <number> }` |

## Getting Started

### Prerequisites
- Node.js 18+
- A MongoDB instance (local or MongoDB Atlas)

### Installation

```bash
git clone https://github.com/Jashnoor2206/URL-Shortner-and-Analytical-Services.git
cd URL-Shortner-and-Analytical-Services
npm install
```

### Environment variables

Create a `.env` file in the project root:

```env
MONGO_URL=your_mongodb_connection_string
SECRET=your_jwt_secret
```

### Run

```bash
npx nodemon app.js
```

The server runs at **http://localhost:3000**. Sign up at `/user/signup`, then create links from `/url`.

### Try it with Postman

Import the collection from the `postman/` folder, log in first so the cookie is set, then send `POST http://localhost:3000/url` with `{ "url": "https://google.com" }`.

## Future Improvements

- Per-link analytics dashboard (clicks over time, using the stored timestamps)
- Custom aliases and link expiry
- Rate limiting on link creation
- Public redirects (currently the redirect route also requires login)
- Automated tests

## Author

**Jashnoor Singh**: [GitHub](https://github.com/Jashnoor2206)
