# SanskritiX

SanskritiX is a cultural travel platform for discovering destinations, understanding local culture, planning journeys and arranging guide-led experiences.

## Full-stack edition

The project now contains both the existing React/Vite website and a FastAPI backend with a PostgreSQL-ready data layer.

See **FRONTEND_BACKEND_SETUP.md** for local setup, API details and publishing steps.

### Quick start

Frontend:

```bash
npm install
npm run dev
```

Backend:

```bash
cd backend
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Then open `http://localhost:5173`.
