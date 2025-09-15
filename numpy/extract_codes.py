#!/usr/bin/env python3
"""
Script semplificato per estrarre solo i codici identificativi dall'etichetta.
"""

import cv2
import numpy as np
import pytesseract
import os
import re

def extract_codes_from_image(image_path):
    """Estrae i codici identificativi da un'immagine."""
    
    # Carica l'immagine
    image = cv2.imread(image_path)
    if image is None:
        print(f"❌ Errore: Impossibile caricare l'immagine {image_path}")
        return []
    
    print(f"✅ Analizzando: {image_path}")
    
    # Converti in scala di grigi
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Preprocessing per migliorare l'OCR
    _, binary = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    
    # Ridimensiona per migliorare la risoluzione
    height, width = binary.shape
    resized = cv2.resize(binary, (width * 2, height * 2), interpolation=cv2.INTER_CUBIC)
    
    # Estrai testo con OCR
    try:
        text = pytesseract.image_to_string(resized, config='--oem 3 --psm 6 -l ita+eng')
        
        # Cerca codici numerici (8-13 cifre)
        codes = re.findall(r'\d{8,13}', text)
        
        # Rimuovi duplicati e ordina
        unique_codes = sorted(list(set(codes)))
        
        return unique_codes
        
    except Exception as e:
        print(f"❌ Errore OCR: {e}")
        return []

def main():
    """Funzione principale."""
    image_path = "img.jpeg"
    
    if not os.path.exists(image_path):
        print(f"❌ File non trovato: {image_path}")
        return
    
    # Estrai i codici
    codes = extract_codes_from_image(image_path)
    
    # Stampa i risultati
    if codes:
        print(f"\n🔢 CODICI IDENTIFICATI:")
        for i, code in enumerate(codes, 1):
            print(f"  {i}. {code}")
    else:
        print("\n❌ Nessun codice identificato")

if __name__ == "__main__":
    main()
