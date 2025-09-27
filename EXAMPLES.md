# 🚀 Esempi di Utilizzo - Modular Template 2.0

Questo file contiene esempi pratici per utilizzare le diverse configurazioni docker-compose del progetto.

## 🎯 Scenari di Sviluppo

### 1. 🚀 Sviluppo Full-Stack Completo
**Quando:** Stai sviluppando un'applicazione completa con frontend, backend e database.

```bash
# Avvia tutti i servizi principali
docker compose -f docker-compose.standard.yml up --build

# Servizi disponibili:
# - Frontend React (http://localhost:5173)
# - Backend Express (http://localhost:3001)
# - Backend FastAPI (http://localhost:8000)
# - Database PostgreSQL (localhost:5432)
```

**Cosa puoi fare:**
- Sviluppare frontend React con autenticazione Kinde + Stripe
- Testare API Express per pagamenti
- Utilizzare API FastAPI per logica business
- Gestire database con migrazioni

---

### 2. ⚛️ Sviluppo React + Express
**Quando:** Stai sviluppando un'app React con backend Express, focus su autenticazione e pagamenti.

```bash
# Avvia solo React + Express + Database
docker compose -f docker-compose.frontend-b4f.yml up --build

# Servizi disponibili:
# - Frontend React (http://localhost:5173)
# - Backend Express (http://localhost:3001)
# - Database PostgreSQL (localhost:5432)
```

**Cosa puoi fare:**
- Sviluppare UI React con Tailwind CSS
- Implementare autenticazione Kinde
- Gestire pagamenti Stripe
- Utilizzare Prisma per database

---

### 3. 🐍 Sviluppo Python/Data Science
**Quando:** Stai sviluppando un'app con focus su Python, data science, o API FastAPI.

```bash
# Avvia React + FastAPI + Database
docker compose -f docker-compose.frontend-backend.yml up --build

# Servizi disponibili:
# - Frontend React (http://localhost:5173)
# - Backend FastAPI (http://localhost:8000)
# - Database PostgreSQL (localhost:5432)
```

**Cosa puoi fare:**
- Sviluppare API Python con FastAPI
- Utilizzare SQLAlchemy per ORM
- Implementare logica business complessa
- Integrare librerie Python (pandas, numpy, etc.)

---

### 4. 🏢 Sviluppo Enterprise
**Quando:** Stai sviluppando un'applicazione enterprise con Next.js e NestJS.

```bash
# Avvia Next.js + NestJS + Database
docker compose -f docker-compose.frontend3-b4f1.yml up --build

# Servizi disponibili:
# - Frontend Next.js (http://localhost:3003)
# - Backend NestJS (http://localhost:3002)
# - Database PostgreSQL (localhost:5432)
```

**Cosa puoi fare:**
- Sviluppare app Next.js con App Router
- Utilizzare NestJS per architettura enterprise
- Implementare decorators e dependency injection
- Gestire autenticazione e autorizzazione avanzate

---

### 5. 📄 Sviluppo Siti Statici
**Quando:** Stai sviluppando un sito statico, blog, o landing page.

```bash
# Avvia solo Astro
docker compose -f docker-compose.frontend2-standalone.yml up --build

# Servizi disponibili:
# - Frontend Astro (http://localhost:4321)
```

**Cosa puoi fare:**
- Sviluppare siti statici con Astro
- Zero JavaScript di default
- Ottimizzazione SEO
- Build veloce e deployment semplice

---

### 6. 🎨 Sviluppo Vue.js
**Quando:** Stai sviluppando un'app Vue.js standalone.

```bash
# Avvia solo Vue
docker compose -f docker-compose.frontend4-standalone.yml up --build

# Servizi disponibili:
# - Frontend Vue (http://localhost:3004)
```

**Cosa puoi fare:**
- Sviluppare app Vue.js con Composition API
- Utilizzare Vite per build veloce
- Implementare routing con Vue Router
- Testing con Vitest

---

### 7. 🅰️ Sviluppo Angular
**Quando:** Stai sviluppando un'app Angular enterprise.

```bash
# Avvia solo Angular
docker compose -f docker-compose.frontend5-standalone.yml up --build

# Servizi disponibili:
# - Frontend Angular (http://localhost:4200)
```

**Cosa puoi fare:**
- Sviluppare app Angular enterprise
- Utilizzare TypeScript strict
- Implementare moduli e servizi
- Testing con Jasmine/Karma

---

### 8. 🔧 Sviluppo Solo Backend
**Quando:** Stai sviluppando e testando solo API, senza frontend.

```bash
# Avvia solo servizi backend
docker compose -f docker-compose.backend-only.yml up --build

# Servizi disponibili:
# - Backend FastAPI (http://localhost:8000)
# - Backend Express (http://localhost:3001)
# - Backend NestJS (http://localhost:3002)
# - Database PostgreSQL (localhost:5432)
```

**Cosa puoi fare:**
- Sviluppare e testare API
- Utilizzare Swagger per documentazione
- Testare integrazioni tra backend
- Sviluppare logica business

---

## 🔄 Workflow di Sviluppo

### Fase 1: Setup Iniziale
```bash
# 1. Clona il repository
git clone <your-repo-url>
cd Modular-Template

# 2. Scegli la configurazione appropriata
docker compose -f docker-compose.standard.yml up --build

# 3. Verifica che tutto funzioni
curl http://localhost:8000/health  # FastAPI
curl http://localhost:3001/api     # Express
curl http://localhost:5173         # React
```

### Fase 2: Sviluppo
```bash
# Sviluppa il tuo codice - i container si aggiornano automaticamente
# Frontend: hot reload su ogni modifica
# Backend: auto-restart su ogni modifica

# Per vedere i log in tempo reale
docker compose -f docker-compose.standard.yml logs -f
```

### Fase 3: Database Migrations
```bash
# Per FastAPI
docker compose -f docker-compose.standard.yml exec backend uv run alembic upgrade head

# Per Express
docker compose -f docker-compose.standard.yml exec b4f yarn prisma migrate dev
```

### Fase 4: Testing
```bash
# Test frontend
docker compose -f docker-compose.standard.yml exec frontend yarn test

# Test backend
docker compose -f docker-compose.standard.yml exec backend uv run python -m pytest

# Test Express
docker compose -f docker-compose.standard.yml exec b4f yarn test
```

## 🛠️ Comandi Utili

### Gestione Container
```bash
# Ferma tutti i servizi
docker compose -f docker-compose.standard.yml down

# Ferma e rimuove volumi (ATTENZIONE: cancella i dati)
docker compose -f docker-compose.standard.yml down -v

# Riavvia un servizio specifico
docker compose -f docker-compose.standard.yml restart frontend

# Rebuild di un servizio specifico
docker compose -f docker-compose.standard.yml up --build frontend
```

### Debug e Troubleshooting
```bash
# Entra in un container per debug
docker compose -f docker-compose.standard.yml exec frontend bash
docker compose -f docker-compose.standard.yml exec backend bash

# Verifica lo stato dei container
docker compose -f docker-compose.standard.yml ps

# Verifica i log di un servizio specifico
docker compose -f docker-compose.standard.yml logs frontend
docker compose -f docker-compose.standard.yml logs backend
```

### Database
```bash
# Connettiti al database
docker compose -f docker-compose.standard.yml exec db psql -U dev -d postgres

# Backup del database
docker compose -f docker-compose.standard.yml exec db pg_dump -U dev postgres > backup.sql

# Restore del database
docker compose -f docker-compose.standard.yml exec -T db psql -U dev -d postgres < backup.sql
```

## 🎯 Raccomandazioni per Caso d'Uso

| Tipo di Progetto | Configurazione Raccomandata | Motivo |
|------------------|----------------------------|---------|
| **Startup MVP** | `frontend-b4f` | Veloce, React + Express, autenticazione + pagamenti |
| **Data Science App** | `frontend-backend` | Python per logica, React per UI |
| **Enterprise App** | `frontend3-b4f1` | Next.js + NestJS, architettura scalabile |
| **Landing Page** | `frontend2-standalone` | Astro, zero JS, SEO ottimizzato |
| **Vue.js App** | `frontend4-standalone` | Vue.js puro, Vite veloce |
| **Angular Enterprise** | `frontend5-standalone` | Angular enterprise, TypeScript strict |
| **API Development** | `backend-only` | Solo backend, focus su API |
| **Full-Stack Completo** | `standard` | Tutto incluso, massima flessibilità |

---

**💡 Suggerimento:** Inizia sempre con la configurazione `standard` per esplorare tutte le funzionalità, poi passa a configurazioni più specifiche in base alle tue esigenze.
