# Movie Watchlist API

RESTful API backend for a movie watchlist application. Users can register, log in, and manage a personal list of movies with watch status, ratings, and notes.

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js 5
- **Database**: PostgreSQL via [Neon](https://neon.tech) serverless
- **ORM**: Prisma 7 with Neon adapter
- **Auth**: JWT (httpOnly cookies)
- **Password hashing**: bcrypt
- **Validation**: Zod

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file at the root:

```env
PORT=5000
DATABASE_URL="postgresql://..."
DATABASE_URL_UNPOOLED="postgresql://..."
NODE_ENV="development"
JWT_SECRET="your-32-char-secret"
JWT_EXPIRES_IN="7d"
```

`DATABASE_URL` → pooled connection (runtime queries)
`DATABASE_URL_UNPOOLED` → direct connection (Prisma migrations)

### 3. Run database migrations

```bash
npx prisma migrate dev
```

### 4. Seed sample movies (optional)

```bash
npm run seed:movie
```

Seeds 10 classic movies (The Matrix, Inception, The Dark Knight, etc.) for testing.

### 5. Start the dev server

```bash
npm run dev
```

Server starts on `http://localhost:5000` (or the port set in `.env`).

## API Endpoints

### Auth — `/auth`

| Method | Endpoint | Body | Description |
| --- | --- | --- | --- |
| POST | `/auth/register` | `{ name, email, password }` | Create account, returns JWT |
| POST | `/auth/login` | `{ email, password }` | Log in, returns JWT |
| POST | `/auth/logout` | — | Clears JWT cookie |

### Watchlist — `/watchlist`

All routes require authentication (JWT cookie or `Authorization: Bearer <token>`).

| Method | Endpoint | Body | Description |
| --- | --- | --- | --- |
| POST | `/watchlist/add` | see below | Add a movie to the watchlist |

**POST `/watchlist/add` body:**

```json
{
  "movieId": "uuid",
  "status": "PLANNED",
  "rating": 8,
  "notes": "Optional note"
}
```

`status` accepts: `PLANNED` | `WATCHING` | `COMPLETED` | `DROPPED` (default: `PLANNED`)
`rating` is an integer from 1 to 10 (optional)

## Database Schema

### User

| Field | Type | Notes |
| --- | --- | --- |
| id | UUID | primary key |
| name | String | |
| email | String | unique |
| password | String | bcrypt hashed |
| createdAt | DateTime | |

### Movie

| Field | Type | Notes |
| --- | --- | --- |
| id | UUID | primary key |
| title | String | |
| overview | String | optional |
| releaseYear | Int | |
| genres | String[] | |
| runtime | Int | minutes, optional |
| posterUrl | String | optional |
| createdBy | String | FK → User |

### WatchlistItems

| Field | Type | Notes |
| --- | --- | --- |
| id | UUID | primary key |
| userId | String | FK → User |
| movieId | String | FK → Movie |
| status | Enum | PLANNED / WATCHING / COMPLETED / DROPPED |
| rating | Int | 1–10, optional |
| notes | String | optional |

A user can only add a given movie once (`UNIQUE(userId, movieId)`).

## Project Structure

```
src/
├── config/
│   └── database.js          # Prisma client + Neon adapter
├── Controllers/
│   ├── auth.controller.js   # register, login, logout
│   ├── user.controller.js   # placeholder
│   └── watchlist.controller.js
├── Routes/
│   ├── auth.route.js
│   ├── user.route.js
│   └── watchlist.route.js
├── middlewares/
│   ├── auth.middleware.js   # JWT verification
│   └── validate.middleware.js # Zod validation
├── validators/
│   └── watchlist.validator..js
└── utils/
    └── generateToken.js     # JWT creation + cookie setup
prisma/
├── schema.prisma
└── seed.js
app.js                       # Express entry point
```

## Security

- Passwords hashed with bcrypt (salt rounds: 10)
- JWT stored in `httpOnly` cookie (not accessible via JavaScript)
- `sameSite: strict` for CSRF protection
- `secure: true` in production (HTTPS only)
- Token expiry configurable via `JWT_EXPIRES_IN`

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start server with nodemon (auto-reload) |
| `npm run seed:movie` | Seed 10 sample movies into the database |
