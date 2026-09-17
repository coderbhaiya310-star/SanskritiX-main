# SanskritiX — Full-stack setup

## What is included

- React + Vite + TypeScript + Tailwind frontend
- FastAPI backend
- PostgreSQL-ready SQLAlchemy database
- JWT authentication
- Tours and group/private experience API
- Booking API
- Ask SanskritiX API
- Search API
- Seed data from the existing SanskritiX content
- Docker Compose for local PostgreSQL + API
- Render configuration for backend + database

## Folder structure

```text
SanskritiX/
├── src/                 # existing frontend
├── backend/
│   ├── app/
│   │   ├── main.py     # API routes
│   │   ├── models.py   # database tables
│   │   ├── schemas.py  # request/response validation
│   │   ├── security.py # password hashing + JWT
│   │   └── seed.py     # initial SanskritiX data
│   ├── seed_data/      # states, destinations, places, guides
│   └── requirements.txt
├── docker-compose.yml
├── render.yaml
└── .env.example
```

## Local option A — easiest

### 1. Frontend

```bash
npm install
npm run dev
```

Frontend: `http://localhost:5173`

### 2. Backend with SQLite

Open a second terminal:

```bash
cd backend
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

API: `http://localhost:8000`
Swagger: `http://localhost:8000/docs`

The backend uses SQLite by default if `DATABASE_URL` is not set.

## Local option B — PostgreSQL with Docker

From the project root:

```bash
docker compose up --build
```

This starts PostgreSQL and the FastAPI API.

Frontend still runs separately:

```bash
npm install
npm run dev
```

## Environment variables

Create `.env` in the project root:

```env
VITE_API_URL=http://localhost:8000/api
```

For the backend, copy `backend/.env.example` to `backend/.env` if you are running the API outside Docker.

Never commit real JWT secrets, database passwords or third-party API keys.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | health check |
| GET | `/api/states` | states |
| GET | `/api/destinations` | destinations |
| GET | `/api/destinations/{id}` | one destination |
| GET | `/api/places` | places/search |
| GET | `/api/guides` | professional guides |
| GET | `/api/tours` | group/private tours |
| GET | `/api/search?q=` | search |
| POST | `/api/auth/signup` | create account |
| POST | `/api/auth/login` | login + JWT |
| GET | `/api/auth/me` | current user |
| POST | `/api/bookings` | book a tour |
| GET | `/api/bookings/me` | user's bookings |
| POST | `/api/ai/ask` | Ask SanskritiX |

## What is already connected

- Login / signup can use the FastAPI API.
- Experiences page reads tour data from the API and falls back to local data if the server is unavailable.
- Ask SanskritiX calls the backend and falls back to the local assistant if the API is unavailable.
- The original frontend content remains available, so the site does not become blank while backend work is in progress.

## Next production integrations

Add these only when the corresponding business requirement is ready:

1. Payment gateway for real tour payments.
2. Maps provider for live routing and place search.
3. Email/WhatsApp notifications for booking confirmations.
4. Real AI provider key on the backend only.
5. Object storage/CDN for large images and videos.
6. Admin dashboard for managing destinations, guides, tours and bookings.
7. Database migrations with Alembic before schema changes become frequent.

## Deployment plan

Recommended simple split:

```text
Vercel / static host
        ↓
React frontend
        ↓ HTTPS
Render
        ↓
FastAPI API
        ↓
PostgreSQL
```

Set the frontend environment variable `VITE_API_URL` to the deployed API URL ending in `/api`.

For the backend on Render, use the `backend` directory as the root directory, build command `pip install -r requirements.txt`, and start command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Set `DATABASE_URL`, `JWT_SECRET` and `CORS_ORIGINS` in the backend service environment.
