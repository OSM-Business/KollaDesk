# KollaDesk

Automated invoice verification (Rechnungsprüfung / Kollaudierung) for the Austrian
construction sector. B2B, single-tenant per deployment, built EU/GDPR-first.

> Status: early development — foundation and walking-skeleton stage.

## Tech stack

- **Frontend:** React 18 · Vite · MUI · React Router
- **Backend:** ASP.NET Core on .NET 10 (LTS) — modular monolith
- **Database:** PostgreSQL 18
- **Object storage:** MinIO (S3-compatible)
- **Mail (dev):** Mailpit
- **CI:** GitHub Actions

## Repository layout

```
KollaDesk/
├── backend/                .NET 10 modular monolith
│   ├── apps/KollaDesk.Api/  HTTP API host
│   ├── src/BuildingBlocks/  shared kernel & cross-cutting code
│   ├── tests/               unit tests
│   ├── global.json          pins the .NET SDK version
│   └── KollaDesk.slnx       solution
├── frontend/               React SPA
├── infra/                  Docker Compose (Postgres, MinIO, Mailpit)
├── docs/                   architecture decisions & notes
└── .github/workflows/      CI
```

## Prerequisites

- .NET 10 SDK
- Node.js 24 (LTS)
- Docker (Docker Desktop)
- Git

## Getting started

**1. Start local infrastructure** (PostgreSQL, MinIO, Mailpit):

```bash
cp infra/.env.example infra/.env    # first time only
cd infra && docker compose up -d
```

MinIO console → http://localhost:9001 · Mailpit → http://localhost:8025

**2. Run the backend:**

```bash
cd backend
dotnet run --project apps/KollaDesk.Api
```

The API prints its URL on startup — open `/health` to verify.

**3. Run the frontend:**

```bash
cd frontend
npm ci
npm run dev
```

Vite serves the app at http://localhost:5173.

## Tests

```bash
cd backend && dotnet test      # backend
cd frontend && npx vitest run  # frontend
```

## Development

`main` is protected — work on feature branches and merge via pull requests.
CI builds and tests frontend and backend on every PR.
