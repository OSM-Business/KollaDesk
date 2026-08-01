# KollaDesk — Agent Instructions

B2B-SaaS für automatisierte Rechnungsprüfung/Kollaudierung im österreichischen Bauwesen.
Einzelentwickler. Internes Tool. DSGVO nicht verhandelbar. Locale **de-AT** (Euro, Zahlen-/Datumsformate).

→ Vollständiger Projektkontext: [frontend/Claude.md](frontend/Claude.md)

---

## Repository Layout

```
docs/baseline/    # Domänen-Wahrheitsquelle (German) — bei Widerspruch nachfragen, nicht raten
docs/decisions/   # ADRs für bewusste Abweichungen von der Umsetzungsanleitung
frontend/         # React SPA (einziger aktiver Code-Ordner; Backend folgt)
.github/          # CI/CD workflows
```

> **No backend yet.** The `frontend/src/api/` and `frontend/src/features/` folders are empty placeholders.

---

## Tech Stack (binding)

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, TypeScript 6, MUI 9, React Router 7 |
| Forms | React Hook Form 7 + Zod 4 |
| Server state | TanStack Query 5 |
| Charts | MUI X Charts 9 / Recharts 3 |
| Theme | `frontend/src/theme/tokens.ts` → `theme.ts` (MUI `deDE` locale, light mode) |
| Future Backend | C# / ASP.NET Core .NET 10, EF Core 10, PostgreSQL 18, MinIO (S3-API) |
| Tests | Vitest + Testing Library (frontend); xUnit + Testcontainers (backend, TBD) |

**Verboten:** Next.js, Tailwind, FluentAssertions, AWS-spezifische APIs, tenant_id in Fachobjekten.

---

## Build & Test Commands

All commands run inside `frontend/`:

```bash
cd frontend
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build
npm run lint       # ESLint
npm run preview    # Preview production build
npm test           # Vitest (when tests exist)
```

---

## Frontend Conventions

### Component Structure

```
src/
  components/common/    # Reusable UI: StatCard, StatusChip, EmptyState, Chart, …
  components/layout/    # App shell: Layout, AppBar, Sidebar, Footer, TopBanner
  pages/                # Full pages grouped by domain (Projects/, Admin/, …)
  features/             # Domain feature slices (empty — add here for new domains)
  routes/router.tsx     # Single createBrowserRouter config
  theme/                # tokens.ts (raw values) → theme.ts (MUI ThemeProvider config)
  lib/                  # Shared utilities: format.ts, queryClient.ts
```

### Coding Patterns

- **Styling:** Use `styled()` from `@emotion/styled` for reusable styled components. Prefer `sx` prop only for one-off overrides.
- **Theme values:** Reference `tokens.ts` constants — never hardcode hex colors.
- **Forms:** React Hook Form + Zod schema; `@hookform/resolvers/zod`.
- **Data fetching:** TanStack Query (`useQuery`/`useMutation`). Place query definitions in `features/<domain>/` or `api/`.
- **Navigation:** `useNavigate` from React Router. Route params follow German domain names (`:projectId`, `:gewerkId`, `:kategorieId`).
- **German domain terms in code:** Gewerk, Kategorie, Dokument, Aufmaß, Rechnung, Kollaudierung — use them as-is.

---

## Hard Rules

1. **Money & quantities:** `decimal`, never `float`. Rounding and units explicit. Always covered by tests.
2. **AI outputs:** Never treat as automatically correct. Human approval required for binding decisions. Store original file, AI output, and model version.
3. **File storage:** Never store files in the DB — only reference + checksum + version. Originals are immutable.
4. **Single-tenant:** One deployment = one tenant. No `tenant_id` in domain objects.
5. **DSGVO:** No real customer data in external clouds without data processing agreement (AVV).
6. **Minimal changes:** Fix root cause, not symptoms. No unrelated refactorings.

---

## Domain Knowledge

Before writing domain logic, consult the relevant baseline document:

| Topic | File |
|---|---|
| Naming & conflict rules (master) | [docs/baseline/KollaDesk_Master-Wissensarchitektur_v1.0.3.md](docs/baseline/KollaDesk_Master-Wissensarchitektur_v1.0.3.md) |
| 11 Fachbände (sequence) | [docs/baseline/KollaDesk_Verbindliche_Reihenarchitektur_Baende_v1.0.1.md](docs/baseline/KollaDesk_Verbindliche_Reihenarchitektur_Baende_v1.0.1.md) |
| Glossary (terms ↔ software fields) | [docs/baseline/KollaDesk_Zentrales_Glossar_v1.0.2.md](docs/baseline/KollaDesk_Zentrales_Glossar_v1.0.2.md) |
| Status & workflow transitions | [docs/baseline/KollaDesk_Status_und_Workflowmodell_v1.0.2.md](docs/baseline/KollaDesk_Status_und_Workflowmodell_v1.0.2.md) |
| 116 domain objects & relations | [docs/baseline/KollaDesk_Datenobjekte_und_Beziehungen_v1.0.5.md](docs/baseline/KollaDesk_Datenobjekte_und_Beziehungen_v1.0.5.md) |
| ADRs (intentional deviations) | [docs/decisions/](docs/decisions/) |

> These files are large. Read only the relevant sections. If code contradicts the baseline, ask — never guess.
