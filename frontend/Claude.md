# KollaDesk – Projekt-Kontext / Übergabe

> Quellen-Hinweis: Die im Projekt hinterlegte Bachelorarbeit beschreibt den ALTEN
> Prototyp (Python/Flask, Google Gemini, React). Dieser Stack wird NICHT übernommen.
> KollaDesk wird von Grund auf neu gebaut. Die Arbeit ist nur fachlicher Ursprung,
> nicht die technische Referenz. Keine aktuellen Architekturentscheidungen aus der PDF ableiten.

## 1. Projektziel

KollaDesk – B2B-SaaS für den österreichischen Bausektor (Solo-Gründer:in).

Kernfunktion: automatisierte Kollaudierung (Rechnungsprüfung). Extrahiert Positionen aus
Leistungsverzeichnis (LV) und Teilrechnungen, gleicht Aufmaß gegen Rechnung ab, liefert
KI-gestützte ÖNORM-Regelvorschläge.

Fachliche Kernprobleme (aus Experteninterview der Vorarbeit): manueller Abgleich zeitintensiv
und erfahrungsabhängig; Teilrechnungen in uneinheitlichen Formaten; kumulierte Mengenkontrolle
über mehrere Abrechnungszyklen wird häufig vernachlässigt; Rechenfehler fallen oft erst bei der
Schlussabrechnung auf.

Anspruch: kommerziell tragfähiges, wartbares Produkt – nicht nur Code. DSGVO-Konformität nicht
verhandelbar. Skalierbar ab Tag 1, KEINE spätere Technologie-Migration.

Projektordner: C:\Dev\KollaDesk

## 2. Bisherige Entscheidungen und Begründung

Tech-Stack (bestätigt, nicht neu zu verhandeln):

- Frontend: React 18, TypeScript, Vite, MUI, TanStack Query, React Router, React Hook Form, Zod, Vitest
- Backend: C# / ASP.NET Core 8, PostgreSQL 16, Entity Framework Core (mit Migrations), FluentValidation, Serilog
- KI/ML: Ollama (Runtime) + Mistral 7B (Modell) – lokal, DSGVO-konform
- Real-time: SignalR (WebSocket)
- Infrastruktur: Hetzner VPS, Docker + Docker Compose
- Locale: Österreichisch (de-AT), Austrian Number/Date-Formatting

Begründungen:

- C# statt Node.js – bewusst NICHT aus Vertrautheit, sondern wegen (a) erzwungener architektonischer
  Struktur (Vorteil Solo-Langzeitentwicklung), (b) stärkerer numerischer Präzisionsgarantien für
  Abrechnung/Mengen, (c) auditierbarem Datenzugriff via EF Core. Node.js-Erfahrung war ausdrücklich kein Faktor.
- "Nicht migrieren müssen" hängt mehr an architektonischer Disziplin als an der Technologie – C# erzwingt sie.
- Lokales LLM (Ollama/Mistral) statt Cloud-API – kein Dokument verlässt das interne Netz.

Bisher umgesetzt:

- Frontend-Scaffold vollständig: Provider verdrahtet (Theme, QueryClient, Router), Ordnerstruktur gemäß
  Architektur, Austrian-Locale-Helper, laufender Vitest-Smoke-Test, Tooling-Config.
- Backend-Scaffolding SKIZZIERT (.NET-8-Struktur, Docker-PostgreSQL, NuGet: Npgsql EF Core,
  FluentValidation, Serilog, separates Testprojekt ab Tag 1), aber NOCH NICHT implementiert.

Geplante Entwicklungsreihenfolge:

1. [erledigt] React-Shell/Scaffold
2. API-Contract Frontend <-> Backend definieren (nächster expliziter Schritt)
3. Backend implementieren
4. Frontend-Features bauen

Scope-Grenzen:

- Electron / Desktop-Packaging: außerhalb MVP, zuerst web-only.
- Original-Thesis-Codebasis wird nicht wiederverwendet.

## 3. Konventionen und Regeln

Arbeitsweise / Interaktion:

- KEINE fertigen Dateien/ZIPs. Immer Schritt-für-Schritt-Anleitungen mit Befehlen/Code zum
  Selbst-Ausführen in der eigenen Umgebung.
- Strikte Scope-Disziplin: bei konkret umrissener Aufgabe genau das liefern – keine ungefragten
  Alternativen, Rückfragen, Next-Step-Vorschläge oder Zusatzkommentare. Erweiterungen nur auf Anforderung.
- Schrittweises Vorgehen, nicht auf noch nicht angesprochene Themen vorgreifen.
- Entscheidungen definitiv VOR der Implementierung; Architektur vorab gründlich planen.
- Kein Code während Planungs-/Architekturphasen, außer explizit angefordert.
- Bestätigte Technologieentscheidungen nicht erneut aufrollen.

Technische Konventionen (Zielbild aus Qualitätsprofil; implementiert ist bisher nur der Scaffold-Stand):

- KEINE Floating-Point-Arithmetik für Geldbeträge. Einheiten, Präzision, Rundungsregeln explizit;
  Berechnungen (Mengen, Preise, USt., Nachlässe) deterministisch und testbar.
- Geschäftslogik getrennt von UI, Datenzugriff, Fileparsing, Autorisierung, regulatorischer Konfiguration.
- Explizite DB-Constraints, EF-Core-Migrations, separates Testprojekt ab Tag 1.
- Traceability/Audit für relevante Aktionen (Wer, Was, alt/neu, Zeitpunkt, Projekt, Dokumentversion,
  Datenquelle, Freigabe-/Ablehnungsstatus).
- Dokumente nicht still ersetzen; kritische Aktionen (Löschen, Freigabe, Ablehnung, Ersetzen)
  berechtigungsgesteuert und auditierbar.
- KI-Ergebnisse nie als automatisch korrekt darstellen: Quelldokumente zeigen, extrahierte Fakten von
  generierten Interpretationen trennen, menschliche Prüfung bei folgenreichen Entscheidungen erzwingen,
  Original-Input + Output aufbewahren.

## 4. Offene Punkte

Nächster expliziter Schritt: API-Contract Frontend <-> Backend definieren.

Vor Design-Finalisierung zu klären:

- Exaktes Format/Schema der .onlv-Dateien und erzeugende Abrechnungssoftware (Realdateien beschaffen).
- Finale Rollendefinitionen (Vorschlag: ADMIN, CHECKER, APPROVER, VIEWER, UPLOADER); Rollen-Stacking offen.
- Upload-Konfliktstrategie: First-Win vs. Last-Write-Wins vs. Versionierung.
- ÖNORM-Prompts in Datenbank oder im Code.
- Aufmaß-Uploads: PDF und/oder .onlv.

Offene fachlich-rechtliche Fragen (relevant, noch nicht bearbeitet):

- DSGVO-Rollen (Controller/Processor), Aufbewahrungspflichten vs. Löschansprüche, Auftragsverarbeitung/
  Subprozessoren – vor produktivem Umgang mit Personendaten klären.
- Genaue ÖNORM-/A-2063-Version und Validierungsstrategie gegen fehlerhafte/unvollständige Realdaten,
  bevor Kompatibilität behauptet wird.

Werkzeug: Für kommende Sessions Claude Code für direktere Ausführung vorgesehen.
