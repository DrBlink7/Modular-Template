# 🐳 Docker Compose Guide - Modular Template 2.0

Questo progetto offre diversi file docker-compose per soddisfare diverse esigenze di sviluppo. Ogni configurazione è ottimizzata per specifici scenari di utilizzo.

## 📋 Configurazioni Disponibili

### 🎯 Configurazioni Principali

#### 1. **docker-compose.standard.yml** - Configurazione Standard
```bash
docker compose -f docker-compose.standard.yml up --build
```
**Servizi inclusi:**
- `frontend` (React + Vite + Tailwind) - Port 5173
- `b4f` (Express + TypeScript + Prisma) - Port 3001  
- `backend` (FastAPI + Python + SQLAlchemy) - Port 8000
- `db` (PostgreSQL) - Port 5432

**Quando usare:** Configurazione principale per sviluppo full-stack completo

---

### 🔗 Configurazioni Frontend + Backend

#### 2. **docker-compose.frontend-b4f.yml** - React + Express
```bash
docker compose -f docker-compose.frontend-b4f.yml up --build
```
**Servizi inclusi:**
- `frontend` (React + Vite + Tailwind) - Port 5173
- `b4f` (Express + TypeScript + Prisma) - Port 3001
- `db` (PostgreSQL) - Port 5432

**Quando usare:** Sviluppo React con backend Express, autenticazione Kinde + Stripe

#### 3. **docker-compose.frontend1-b4f.yml** - React + Material-UI + Express
```bash
docker compose -f docker-compose.frontend1-b4f.yml up --build
```
**Servizi inclusi:**
- `frontend1` (React + Material-UI + Redux) - Port 3000
- `b4f` (Express + TypeScript + Prisma) - Port 3001
- `db` (PostgreSQL) - Port 5432

**Quando usare:** Sviluppo React con Material-UI e backend Express

#### 4. **docker-compose.frontend-backend.yml** - React + FastAPI
```bash
docker compose -f docker-compose.frontend-backend.yml up --build
```
**Servizi inclusi:**
- `frontend` (React + Vite + Tailwind) - Port 5173
- `backend` (FastAPI + Python + SQLAlchemy) - Port 8000
- `db` (PostgreSQL) - Port 5432

**Quando usare:** Sviluppo React con backend Python FastAPI

#### 5. **docker-compose.frontend3-b4f1.yml** - Next.js + NestJS
```bash
docker compose -f docker-compose.frontend3-b4f1.yml up --build
```
**Servizi inclusi:**
- `frontend3` (Next.js 15 + React 19 + Turbopack) - Port 3003
- `b4f1` (NestJS 11 + TypeScript + SWC) - Port 3002
- `db` (PostgreSQL) - Port 5432

**Quando usare:** Sviluppo Next.js con backend NestJS enterprise

---

### 🎨 Configurazioni Frontend Standalone

#### 6. **docker-compose.frontend2-standalone.yml** - Astro Static
```bash
docker compose -f docker-compose.frontend2-standalone.yml up --build
```
**Servizi inclusi:**
- `frontend2` (Astro 5 + TypeScript) - Port 4321

**Quando usare:** Sviluppo siti statici con Astro, zero JavaScript di default

#### 7. **docker-compose.frontend4-standalone.yml** - Vue.js
```bash
docker compose -f docker-compose.frontend4-standalone.yml up --build
```
**Servizi inclusi:**
- `frontend4` (Vue 3 + Vite 7 + TypeScript) - Port 3004

**Quando usare:** Sviluppo Vue.js standalone

#### 8. **docker-compose.frontend5-standalone.yml** - Angular
```bash
docker compose -f docker-compose.frontend5-standalone.yml up --build
```
**Servizi inclusi:**
- `frontend5` (Angular 18 + TypeScript) - Port 4200

**Quando usare:** Sviluppo Angular enterprise standalone

---

### 🔧 Configurazioni Backend Only

#### 9. **docker-compose.backend-only.yml** - Solo Backend
```bash
docker compose -f docker-compose.backend-only.yml up --build
```
**Servizi inclusi:**
- `backend` (FastAPI + Python) - Port 8000
- `b4f` (Express + TypeScript) - Port 3001
- `b4f1` (NestJS + TypeScript) - Port 3002
- `db` (PostgreSQL) - Port 5432

**Quando usare:** Sviluppo e testing di API, senza frontend

---

## 🚀 Quick Start Commands

### Per iniziare subito:
```bash
# Configurazione standard (raccomandata)
docker compose -f docker-compose.standard.yml up --build

# Solo React + Express
docker compose -f docker-compose.frontend-b4f.yml up --build

# Solo Astro
docker compose -f docker-compose.frontend2-standalone.yml up --build
```

### Per fermare i servizi:
```bash
# Ferma tutti i servizi
docker compose -f docker-compose.standard.yml down

# Ferma e rimuove volumi
docker compose -f docker-compose.standard.yml down -v
```

## 🔄 Migrazioni Database

### Quando usare le migrazioni:
```bash
# Per FastAPI (backend)
docker compose -f docker-compose.standard.yml exec backend uv run alembic upgrade head

# Per Express (b4f)
docker compose -f docker-compose.standard.yml exec b4f yarn prisma migrate dev

# Per NestJS (b4f1) - se configurato
docker compose -f docker-compose.frontend3-b4f1.yml exec b4f1 yarn prisma migrate dev
```

## 📊 Tabella Riassuntiva

| Configurazione | Frontend | Backend | Database | Porta Frontend | Porta Backend | Uso Principale |
|----------------|----------|---------|----------|----------------|---------------|----------------|
| **standard** | React + Vite | Express + FastAPI | PostgreSQL | 5173 | 3001, 8000 | Full-stack completo |
| **frontend-b4f** | React + Vite | Express | PostgreSQL | 5173 | 3001 | React + Express |
| **frontend1-b4f** | React + Material-UI | Express | PostgreSQL | 3000 | 3001 | React + Material-UI |
| **frontend-backend** | React + Vite | FastAPI | PostgreSQL | 5173 | 8000 | React + Python |
| **frontend3-b4f1** | Next.js | NestJS | PostgreSQL | 3003 | 3002 | Next.js + NestJS |
| **frontend2-standalone** | Astro | - | - | 4321 | - | Siti statici |
| **frontend4-standalone** | Vue | - | - | 3004 | - | Vue.js |
| **frontend5-standalone** | Angular | - | - | 4200 | - | Angular |
| **backend-only** | - | Express + FastAPI + NestJS | PostgreSQL | - | 3001, 8000, 3002 | Solo API |

## 🎯 Raccomandazioni per Caso d'Uso

### 🚀 **Sviluppo Rapido Full-Stack**
```bash
docker compose -f docker-compose.standard.yml up --build
```

### ⚛️ **Sviluppo React Moderno**
```bash
docker compose -f docker-compose.frontend-b4f.yml up --build
```

### 🐍 **Sviluppo Python/Data Science**
```bash
docker compose -f docker-compose.frontend-backend.yml up --build
```

### 🏢 **Sviluppo Enterprise**
```bash
docker compose -f docker-compose.frontend3-b4f1.yml up --build
```

### 📄 **Sviluppo Siti Statici**
```bash
docker compose -f docker-compose.frontend2-standalone.yml up --build
```

### 🔧 **Sviluppo Solo Backend**
```bash
docker compose -f docker-compose.backend-only.yml up --build
```

## 🔍 Verifica Stato Servizi

```bash
# Controlla se i container sono attivi
docker compose -f docker-compose.standard.yml ps

# Visualizza i log
docker compose -f docker-compose.standard.yml logs -f

# Testa la connessione al database
docker compose -f docker-compose.standard.yml exec db pg_isready -U dev -d postgres
```

## 🛠️ Personalizzazione

Ogni configurazione può essere personalizzata modificando il file docker-compose corrispondente. Le variabili d'ambiente sono configurate per funzionare out-of-the-box, ma possono essere modificate secondo le esigenze del progetto.

---

**💡 Suggerimento:** Inizia sempre con la configurazione `standard` per avere una panoramica completa, poi passa a configurazioni più specifiche in base alle tue esigenze di sviluppo.
