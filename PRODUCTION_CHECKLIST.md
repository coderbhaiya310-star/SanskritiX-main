# SanskritiX production checklist

Before accepting real payments or real customer data:

- Change `JWT_SECRET` to a long random secret.
- Use managed PostgreSQL, not local SQLite.
- Set the exact frontend URL in `CORS_ORIGINS`.
- Put all API keys on the backend; never in React source.
- Add payment gateway webhooks and verify payment signatures server-side.
- Add email/WhatsApp confirmation only after consent and provider setup.
- Add rate limiting and request logging.
- Add database migrations with Alembic.
- Add backups and error monitoring.
- Review privacy, refund, cancellation and guide-verification policies.
- Do not claim live maps, live transport, real-time availability or verified guides until those services are actually connected.
