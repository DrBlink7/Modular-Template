# 🔧 Setup Variabili d'Ambiente Backend

## 📋 File .env da Creare

Crea un file `.env` nella cartella `backend/` con il seguente contenuto:

```bash
# ===========================================
# MODULAR TEMPLATE 2.0 - BACKEND CONFIGURATION
# ===========================================

# Database Configuration
DATABASE_URL=postgresql://dev:devPassword@db:5432/postgres

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:3003,http://localhost:3004,http://localhost:4200,http://localhost:4321

# ===========================================
# STRIPE CONFIGURATION
# ===========================================
# Get these from your Stripe Dashboard: https://dashboard.stripe.com/

# Stripe API Keys
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Stripe URLs
STRIPE_SUCCESS_URL=http://localhost:5173/success
STRIPE_CANCEL_URL=http://localhost:5173/cancel

# Stripe Products and Prices
# Create products in Stripe Dashboard and copy the IDs here
STRIPE_PRODUCT_1=prod_your_product_1_id
STRIPE_PRODUCT_2=prod_your_product_2_id
STRIPE_PRICE_1=price_your_price_1_id
STRIPE_PRICE_2=price_your_price_2_id

# ===========================================
# KINDE CONFIGURATION
# ===========================================
# Get these from your Kinde Dashboard: https://app.kinde.com/

# Kinde Application Settings
KINDE_DOMAIN=your-domain.kinde.com
KINDE_CLIENT_ID=your_client_id_here
KINDE_CLIENT_SECRET=your_client_secret_here
KINDE_ISSUER_URL=https://your-domain.kinde.com

# Kinde URLs
KINDE_SITE_URL=http://localhost:5173
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:5173
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:5173

# ===========================================
# JWT CONFIGURATION
# ===========================================
# JWT settings for token verification
JWT_ALGORITHM=RS256
JWT_AUDIENCE=your_kinde_client_id_here

# ===========================================
# DEVELOPMENT SETTINGS
# ===========================================
# Environment
ENVIRONMENT=development
DEBUG=true
LOG_LEVEL=INFO
```

## 🚀 Setup Rapido

### 1. **Crea il file .env**
```bash
# Nella cartella backend/
cp BACKEND_ENV_SETUP.md backend/.env
# Poi modifica il file .env con i tuoi valori reali
```

### 2. **Configurazione Stripe**

1. **Vai su Stripe Dashboard**: https://dashboard.stripe.com/
2. **Ottieni le chiavi API**:
   - Vai su "Developers" → "API keys"
   - Copia la "Secret key" (inizia con `sk_test_`)
3. **Crea prodotti**:
   - Vai su "Products" → "Add product"
   - Crea 2 prodotti (es. "Basic Plan", "Premium Plan")
   - Crea i prezzi per ogni prodotto
   - Copia gli ID dei prodotti e prezzi
4. **Configura webhook**:
   - Vai su "Developers" → "Webhooks"
   - Aggiungi endpoint: `http://localhost:8000/api/v1/payments/webhook`
   - Seleziona eventi: `checkout.session.completed`, `payment_intent.succeeded`
   - Copia il "Signing secret" (inizia con `whsec_`)

### 3. **Configurazione Kinde**

1. **Vai su Kinde Dashboard**: https://app.kinde.com/
2. **Crea una nuova applicazione**
3. **Configura le URL di redirect**:
   - Login redirect: `http://localhost:5173`
   - Logout redirect: `http://localhost:5173`
4. **Ottieni le credenziali**:
   - Client ID
   - Client Secret
   - Domain
   - Issuer URL

### 4. **Test della Configurazione**

```bash
# Avvia i servizi
docker compose up --build

# Testa la configurazione
curl http://localhost:8000/api/v1/payments/validate

# Visualizza la documentazione API
# Vai su http://localhost:8000/docs
```

## 🔍 Verifica Configurazione

### **Stripe**
- ✅ `STRIPE_SECRET_KEY` inizia con `sk_test_`
- ✅ `STRIPE_WEBHOOK_SECRET` inizia con `whsec_`
- ✅ `STRIPE_PRODUCT_1` e `STRIPE_PRODUCT_2` sono ID validi
- ✅ `STRIPE_PRICE_1` e `STRIPE_PRICE_2` sono ID validi

### **Kinde**
- ✅ `KINDE_DOMAIN` è il tuo dominio Kinde
- ✅ `KINDE_CLIENT_ID` è il tuo Client ID
- ✅ `KINDE_CLIENT_SECRET` è il tuo Client Secret
- ✅ `KINDE_ISSUER_URL` è `https://your-domain.kinde.com`

## 🐛 Troubleshooting

### **Errori Comuni**

1. **"Stripe not configured"**:
   - Verifica che tutte le variabili Stripe siano impostate
   - Controlla che le chiavi siano valide

2. **"Kinde authentication not configured"**:
   - Verifica che tutte le variabili Kinde siano impostate
   - Controlla che il dominio sia corretto

3. **"Invalid Stripe signature"**:
   - Verifica che `STRIPE_WEBHOOK_SECRET` sia corretto
   - Controlla che il webhook sia configurato correttamente

4. **"Invalid JWT token"**:
   - Verifica che `KINDE_ISSUER_URL` sia corretto
   - Controlla che il token sia valido

## 📚 Risorse Utili

- **Stripe Dashboard**: https://dashboard.stripe.com/
- **Kinde Dashboard**: https://app.kinde.com/
- **API Documentation**: http://localhost:8000/docs
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
