@AGENTS.md
# KollaDesk — Projektkontext für Claude Code

## Was ist KollaDesk
B2B-SaaS zur automatisierten Rechnungsprüfung/Kollaudierung im
österreichischen Bauwesen: Aufmaß gegen Rechnung prüfen, ÖNORM-Regeln.
Internes Tool hinter Login. Einzelentwickler. DSGVO nicht verhandelbar.
Locale de-AT (Euro, Zahlen-/Datumsformate).

## Tech-Stack (verbindlich)
- Frontend: React 18 + Vite (SPA) + MUI (Material Design) + React Router.
  KEIN Next.js, KEIN Tailwind.
- Backend: C# / ASP.NET Core auf .NET 10 LTS, EF Core 10, Npgsql 10.
- Datenbank: PostgreSQL 18.
- Objektspeicher: MinIO über S3-API (nicht AWS-spezifisch programmieren).
- Hosting: Hetzner + Docker Compose, cloud-agnostisch bauen
  (Dateien via S3-API, Mail via SMTP, Secrets via Env) → AWS später ohne Umbau.
- Tests: Backend xUnit + Testcontainers, Frontend Vitest. KEIN FluentAssertions.
- KI-Runtime: NOCH OFFEN. Zuerst Mistral EU-API und Azure Document
  Intelligence testen, dann entscheiden. Hinter einer Provider-Schnittstelle
  kapseln (Anbieter austauschbar). Voll-lokal (Ollama) bleibt Option.
- Realtime: SignalR nur bei Bedarf, NICHT im MVP.

## Harte Regeln
- Geld/Mengen: deterministisch, `decimal` statt float, Rundung + Einheiten
  explizit, immer mit Tests abgesichert.
- KI-Ausgaben nie als automatisch korrekt behandeln. Verbindliche
  Entscheidungen brauchen menschliche Freigabe. Originaldatei, KI-Ausgabe
  und Modellversion speichern.
- Dateien NIE in die DB. Nur Referenz + Prüfsumme + Version in der DB.
  Original-Uploads unveränderlich aufbewahren.
- Single-Tenant pro Deployment. Keine tenant_id in Fachobjekten.
  Keine Multi-Tenancy vorbauen.
- DSGVO: keine echten Kundendaten in externe Clouds ohne AVV.
- Die Fachwissen-Baseline in docs/baseline/ ist die Wahrheitsquelle für
  Domäne, Begriffe und Workflows. Code darf sie nicht umdeuten. Bei
  Widerspruch NACHFRAGEN, nicht raten.
- Abweichungen von der Umsetzungsanleitung (Frontend, Hosting) sind bewusst
  und in docs/decisions/ als ADR dokumentiert.

## Arbeitsweise
- Minimale, fokussierte Änderungen. Keine unbezogenen Refactorings.
- Root-Ursache beheben, nicht Symptome. Bei Unsicherheit fragen.

## Wo liegt was (bei Bedarf die RELEVANTE Datei öffnen, nicht alle laden)
- docs/baseline/KollaDesk_Master-Wissensarchitektur... — oberste Regeln, Namens-/Konfliktregeln
- docs/baseline/KollaDesk_Verbindliche_Reihenarchitektur... — die 11 Fachbände in Reihenfolge
- docs/baseline/KollaDesk_Zentrales_Glossar... — Begriffe + Mapping auf Software-Felder (GROSS, nur Abschnitte lesen)
- docs/baseline/KollaDesk_Status_und_Workflowmodell... — Status/Workflows/Transitionen (SEHR GROSS, gezielt lesen)
- docs/baseline/KollaDesk_Datenobjekte_und_Beziehungen... — 116 Fachobjekte + Beziehungen (GROSS, gezielt lesen)
- docs/baseline/KollaDesk_Software-Umsetzungsanleitung... — die Anleitung (mit dokumentierten Abweichungen)
- docs/decisions/ — ADRs (bewusste Abweichungen)

## Build/Test-Befehle
(Noch eintragen, sobald Backend/Frontend-Skripte stehen.)