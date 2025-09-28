# Configurazione Jest per VS Code

## Problema Risolto
L'estensione Jest di VS Code non riusciva a rilevare automaticamente il comando Jest corretto a causa del monorepo con multiple configurazioni.

## Soluzione Implementata

### 1. Configurazione Workspace (`.vscode/settings.json`)
- Configurazione specifica per ogni progetto del monorepo
- Comandi Jest personalizzati per ogni workspace folder
- Disabilitazione dei progetti che non usano Jest

### 2. Progetti Configurati

#### B4F (Express + TypeScript)
- **Comando**: `yarn test`
- **Configurazione**: `b4f/jest.config.ts`
- **Setup**: `b4f/jest.setup.js`

#### B4F1 (NestJS + TypeScript)  
- **Comando**: `yarn test`
- **Configurazione**: Inline nel `package.json`
- **Setup**: Nessuno (usa configurazione NestJS standard)

#### Frontend4 (Vue + Vitest)
- **Comando**: `yarn test:unit`
- **Configurazione**: Vitest (non Jest)
- **Setup**: `frontend4/jest.setup.js`

### 3. Progetti Disabilitati
- `frontend2` (Astro - non usa Jest)
- `frontend3` (Next.js - usa Jest ma non configurato)
- `frontend5` (Angular - usa Jest ma non configurato)

## Come Usare

### In VS Code
1. Apri il Command Palette (`Cmd+Shift+P`)
2. Cerca "Jest: Start Runner"
3. Seleziona il progetto specifico o usa "All Projects"

### Dalla Terminale
```bash
# Test singolo progetto
cd b4f && yarn test
cd b4f1 && yarn test  
cd frontend4 && yarn test:unit

# Test con watch mode
cd b4f && yarn test:watch
cd b4f1 && yarn test:watch
```

### Test Coverage
```bash
# Coverage per singolo progetto
cd b4f && yarn test:coverage
cd b4f1 && yarn test:cov
```

## File di Configurazione

- `.vscode/settings.json` - Configurazione VS Code per Jest extension
- `jest.config.js` - Configurazione Jest globale per il monorepo
- `b4f/jest.setup.js` - Setup per test B4F
- `frontend4/jest.setup.js` - Setup per test Frontend4

## Troubleshooting

Se l'estensione Jest non funziona ancora:

1. **Riavvia VS Code** completamente
2. **Ricarica la finestra** (`Cmd+Shift+P` → "Developer: Reload Window")
3. **Verifica che l'estensione Jest sia installata** e abilitata
4. **Controlla la console di VS Code** per errori specifici

## Note

- Frontend4 usa Vitest invece di Jest, ma è configurato per compatibilità
- I progetti frontend2, frontend3, frontend5 sono disabilitati perché non hanno configurazioni Jest complete
- La configurazione è ottimizzata per il workflow di sviluppo con hot reload
