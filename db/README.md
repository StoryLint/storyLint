# Database

This directory contains the database schema and migration history
for StoryLint services.

It is the **only** source of truth for database structure.

---

## What belongs here

- Schema definitions
- Versioned migrations
- Idempotent development seeds

---

## What does NOT belong here

- Production data
- Backups or dumps
- One-off SQL scripts
- Environment-specific changes

---

## Migrations

All schema changes must be applied via migrations.

Rules:
- Migrations are immutable once merged
- One logical change per migration
- Migrations must be forward-only

---

## Environments

- Local: applied automatically on startup
- Staging: applied via CI/CD
- Production: applied via controlled release

No schema changes are applied manually in production.

---

## Seeds

Seed data is for local development only.

Seeds must:
- Be idempotent
- Never assume empty tables
- Never run in production

---

## Philosophy

If the schema change is not in a migration,
it does not exist.

db/
├─ migrations/
│  ├─ 001_init.sql
│  ├─ 002_add_subscriptions.sql
│  └─ 003_usage_events.sql
│
├─ schema.sql              # current canonical schema (generated or maintained)
├─ seeds/
│  └─ dev_seed.sql         # dev-only, idempotent
│
└─ README.md
