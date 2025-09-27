# 🔧 Setup Integrazione Stripe e Kinde

## 📋 Configurazione Backend FastAPI

### 1. **Variabili d'Ambiente**

Crea un file `.env` nella cartella `backend/` con le seguenti variabili:

```bash
# Database Configuration
DATABASE_URL=postgresql://dev:devPassword@db:5432/postgres

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_SUCCESS_URL=http://localhost:5173/success
STRIPE_CANCEL_URL=http://localhost:5173/cancel
STRIPE_PRODUCT_1=prod_your_product_1_id
STRIPE_PRODUCT_2=prod_your_product_2_id
STRIPE_PRICE_1=price_your_price_1_id
STRIPE_PRICE_2=price_your_price_2_id

# Kinde Configuration
KINDE_DOMAIN=your-domain.kinde.com
KINDE_CLIENT_ID=your_client_id_here
KINDE_CLIENT_SECRET=your_client_secret_here
KINDE_ISSUER_URL=https://your-domain.kinde.com
KINDE_SITE_URL=http://localhost:5173
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:5173
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:5173
```

### 2. **Setup Stripe**

1. **Crea un account Stripe**: https://stripe.com/
2. **Ottieni le chiavi API**:
   - Vai su https://dashboard.stripe.com/apikeys
   - Copia la "Secret key" (inizia con `sk_test_`)
3. **Crea prodotti e prezzi**:
   - Vai su https://dashboard.stripe.com/products
   - Crea 2 prodotti
   - Crea i prezzi per ogni prodotto
   - Copia gli ID dei prodotti e prezzi
4. **Configura webhook**:
   - Vai su https://dashboard.stripe.com/webhooks
   - Aggiungi endpoint: `http://localhost:8000/api/v1/payments/webhook`
   - Seleziona eventi: `checkout.session.completed`, `payment_intent.succeeded`
   - Copia il "Signing secret" (inizia con `whsec_`)

### 3. **Setup Kinde**

1. **Crea un account Kinde**: https://app.kinde.com/
2. **Crea una nuova applicazione**
3. **Configura le URL di redirect**:
   - Login redirect: `http://localhost:5173`
   - Logout redirect: `http://localhost:5173`
4. **Ottieni le credenziali**:
   - Client ID
   - Client Secret
   - Domain
   - Issuer URL

### 4. **Database Migration**

```bash
# Avvia i servizi
docker compose up --build

# Crea la migrazione per i nuovi modelli
docker compose exec backend uv run alembic revision --autogenerate -m "Add orders and payment models"

# Applica la migrazione
docker compose exec backend uv run alembic upgrade head
```

### 5. **Test dell'Integrazione**

```bash
# Avvia i servizi
docker compose up --build

# Testa l'endpoint di health
curl http://localhost:8000/health

# Testa l'endpoint di validazione Stripe
curl http://localhost:8000/api/v1/payments/validate

# Visualizza la documentazione API
# Vai su http://localhost:8000/docs
```

## 🚀 Configurazioni Docker Compose

### **Configurazione Principale** (Raccomandata)
```bash
docker compose up --build
```
- **Frontend**: React + Vite (port 5173)
- **Backend**: FastAPI + Python (port 8000)
- **Database**: PostgreSQL (port 5432)

### **Configurazione Completa**
```bash
docker compose -f docker-compose.complete.yml up --build
```
- **Tutti i frontend**: React, Material-UI, Astro, Next.js, Vue, Angular
- **Tutti i backend**: FastAPI, Express, NestJS
- **Database**: PostgreSQL

## 📚 API Endpoints Disponibili

### **Payments API** (`/api/v1/payments/`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/checkout/{product_id}` | POST | Crea checkout session Stripe | ✅ |
| `/order-status/{product_id}` | GET | Verifica stato ordine | ✅ |
| `/webhook` | POST | Webhook Stripe | ❌ |
| `/validate` | GET | Valida configurazione Stripe | ✅ |
| `/orders` | GET | Lista ordini utente | ✅ |
| `/health` | GET | Health check | ❌ |

### **Users API** (`/api/v1/users/`)

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/` | GET | Lista utenti | ✅ |
| `/` | POST | Crea utente | ✅ |
| `/{user_id}` | GET | Dettagli utente | ✅ |
| `/{user_id}` | PUT | Aggiorna utente | ✅ |
| `/{user_id}` | DELETE | Elimina utente | ✅ |

## 🔐 Autenticazione

### **Kinde JWT Token**

Tutti gli endpoint che richiedono autenticazione utilizzano il token JWT di Kinde:

```bash
# Header richiesto
Authorization: Bearer <your_kinde_jwt_token>
```

### **Esempio di utilizzo**

```bash
# Crea checkout session
curl -X POST "http://localhost:8000/api/v1/payments/checkout/1" \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{"quantity": 1}'

# Verifica stato ordine
curl -X GET "http://localhost:8000/api/v1/payments/order-status/1" \
  -H "Authorization: Bearer <your_token>"
```

## 🧪 Testing

### **Test Manuali**

1. **Avvia i servizi**:
   ```bash
   docker compose up --build
   ```

2. **Testa l'API**:
   - Vai su http://localhost:8000/docs
   - Usa l'interfaccia Swagger per testare gli endpoint

3. **Testa il frontend**:
   - Vai su http://localhost:5173
   - Testa l'integrazione con Stripe e Kinde

### **Test Automatici**

```bash
# Test backend
docker compose exec backend uv run pytest

# Test con coverage
docker compose exec backend python -m coverage run -m pytest
docker compose exec backend python -m coverage report
```

## 🐛 Troubleshooting

### **Errori Comuni**

1. **"Stripe not configured"**:
   - Verifica che le variabili d'ambiente Stripe siano impostate
   - Controlla che il file `.env` sia nella cartella `backend/`

2. **"Kinde authentication not configured"**:
   - Verifica che le variabili d'ambiente Kinde siano impostate
   - Controlla che il dominio Kinde sia corretto

3. **"Database connection failed"**:
   - Verifica che il database sia in esecuzione
   - Controlla che la migrazione sia stata applicata

4. **"CORS error"**:
   - Verifica che `ALLOWED_ORIGINS` includa l'URL del frontend
   - Controlla che il frontend sia in esecuzione sulla porta corretta

### **Log e Debug**

```bash
# Visualizza log backend
docker compose logs -f backend

# Visualizza log frontend
docker compose logs -f frontend

# Visualizza log database
docker compose logs -f db
```

## 📖 Documentazione API

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health

---

**💡 Suggerimento**: Inizia sempre con la configurazione principale (`docker compose up --build`) per testare l'integrazione base, poi passa alla configurazione completa se necessario.
