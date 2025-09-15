# Analizzatore Testo Etichette Farmaceutiche

Script Python per estrarre e analizzare il testo presente nelle etichette farmaceutiche usando OCR (Optical Character Recognition).

## 🚀 Installazione

### Prerequisiti
- Python 3.7+
- Tesseract OCR

### Installazione Tesseract OCR

**macOS:**
```bash
brew install tesseract tesseract-lang
```

**Ubuntu/Debian:**
```bash
sudo apt-get install tesseract-ocr tesseract-ocr-ita tesseract-ocr-eng
```

**Windows:**
Scarica e installa da: https://github.com/UB-Mannheim/tesseract/wiki

### Installazione Dipendenze Python

```bash
# Crea ambiente virtuale
python3 -m venv .venv

# Attiva ambiente virtuale
source .venv/bin/activate  # macOS/Linux
# oppure
.venv\Scripts\activate     # Windows

# Installa dipendenze
pip install opencv-python pillow pytesseract matplotlib
```

## 📁 Struttura File

```
numpy/
├── README.md                    # Questo file
├── final_text_analysis.py       # Script completo (analisi dettagliata)
├── extract_codes.py             # Script semplificato (solo codici)
├── img.jpeg                     # Immagine etichetta farmaceutica
├── .venv/                       # Ambiente virtuale Python
└── preview_*.jpg                # Immagini di anteprima (generate automaticamente)
```

## 🔧 Utilizzo

### Script Completo (Analisi Dettagliata)
```bash
# Attiva l'ambiente virtuale
source .venv/bin/activate

# Esegui l'analisi completa
python3 final_text_analysis.py
```

**Output:**
```
🔍 Avvio analisi finale testo etichetta farmaceutica...
======================================================================
✅ Immagine caricata: img.jpeg
📏 Dimensioni: (1024, 1568, 3)

📊 RISULTATI TROVATI: 53 metodi testati
🎯 RISULTATI MIGLIORI: 51 selezionati

📊 RIASSUNTO FINALE:
-------------------------
🔢 CODICI IDENTIFICATI: 007943469, 027244072, 27244072
======================================================================
```

### Script Semplificato (Solo Codici)
```bash
# Attiva l'ambiente virtuale
source .venv/bin/activate

# Estrai solo i codici
python3 extract_codes.py
```

**Output:**
```
✅ Analizzando: img.jpeg

🔢 CODICI IDENTIFICATI:
  1. 007943469
  2. 27244072
```

## ⚙️ Funzionalità

### Metodi di Preprocessing
- **Original**: Immagine originale in scala di grigi
- **Binary OTSU**: Binarizzazione con soglia OTSU
- **Adaptive**: Soglia adattiva
- **Gaussian**: Filtro gaussiano
- **Denoised**: Riduzione del rumore
- **Equalized**: Equalizzazione dell'istogramma
- **Resized 2x/3x**: Ridimensionamento per migliorare la risoluzione

### Configurazioni OCR
- **Default**: Configurazione standard
- **Single Block**: Blocco singolo
- **Single Word**: Parola singola
- **Single Line**: Riga singola
- **Raw Line**: Riga grezza
- **Sparse Text**: Testo sparso
- **English Only**: Solo inglese
- **Italian Only**: Solo italiano

### Informazioni Estratte
- **Codici identificativi**: Codici a barre e codici numerici
- **Nome farmaco**: Nome del medicinale
- **Dosaggio**: Quantità del principio attivo
- **Date**: Date di scadenza o produzione
- **Numeri di lotto**: Codici di tracciabilità

## 🎯 Risultati Tipici

Per un'etichetta farmaceutica standard, lo script identifica:

- **Codici principali**: 007943469 (barcode principale)
- **Codici secondari**: 027244072 (codice lotto)
- **Farmaco**: FLOMAX 350 MG
- **Confidenza**: 50-70% (tipico per OCR su etichette)

## 🔧 Personalizzazione

### Modificare l'immagine
Sostituisci `img.jpeg` con la tua immagine:
```python
image_path = "tua_immagine.jpg"
```

### Aggiungere lingue OCR
Modifica le configurazioni Tesseract:
```python
tesseract_configs = [
    ("Default", "--oem 3 --psm 6 -l ita+eng+fra"),  # Ex. Aggiungi francese
    # ... altre configurazioni
]
```

### Soglia di confidenza
Modifica la soglia minima:
```python
good_results = [r for r in all_results if r['confidence'] > 50]  # Ex. Cambia da 30 a 50
```

## 🐛 Risoluzione Problemi

### Errore "Tesseract not found"
```bash
# Verifica installazione
tesseract --version

# Se non trovato, reinstalla
brew install tesseract tesseract-lang
```

### Bassa confidenza OCR
- Verifica la qualità dell'immagine
- Prova con immagini a risoluzione più alta
- Controlla che il testo sia ben visibile

### Nessun testo estratto
- Verifica che l'immagine contenga testo leggibile
- Controlla che il file immagine sia valido
- Prova con diversi formati immagine (JPG, PNG, TIFF)

## 📊 File Generati

Lo script genera automaticamente:
- `preview_*.jpg`: Immagini di anteprima per debug
- Output console: Risultati dell'analisi

## 📝 Note Tecniche

- **Formati supportati**: JPG, PNG, TIFF, BMP
- **Risoluzione consigliata**: > 300 DPI
- **Lingue supportate**: Italiano, Inglese
- **Tempo di esecuzione**: 10-30 secondi (dipende dalla complessità)

## 🤝 Contributi

Per migliorare lo script:
1. Aggiungi nuovi metodi di preprocessing
2. Migliora i pattern di riconoscimento farmaceutico
3. Aggiungi supporto per altre lingue
4. Ottimizza le performance

## 📄 Licenza

Questo script è fornito "as is" per scopi educativi e di ricerca.
