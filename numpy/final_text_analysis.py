#!/usr/bin/env python3
"""
Script finale per analizzare tutto il testo presente nell'etichetta farmaceutica.
"""

import cv2
import numpy as np
import pytesseract
from PIL import Image
import os
import re

class FinalTextAnalyzer:
    def __init__(self):
        """Inizializza l'analizzatore finale."""
        self.image = None
        self.all_text_results = []
    
    def load_image(self, image_path: str):
        """Carica un'immagine dal file."""
        try:
            self.image = cv2.imread(image_path)
            if self.image is None:
                print(f"❌ Errore: Impossibile caricare l'immagine {image_path}")
                return False
            
            print(f"✅ Immagine caricata: {image_path}")
            print(f"📏 Dimensioni: {self.image.shape}")
            return True
        except Exception as e:
            print(f"❌ Errore nel caricamento: {e}")
            return False
    
    def extract_text_comprehensive(self):
        """Estrae il testo usando tutti i metodi possibili."""
        if self.image is None:
            return []
        
        gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        results = []
        
        # Metodi di preprocessing
        preprocessing_methods = [
            ("Original", gray),
            ("Binary OTSU", cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]),
            ("Adaptive", cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)),
            ("Gaussian", cv2.GaussianBlur(gray, (3, 3), 0)),
            ("Denoised", cv2.fastNlMeansDenoising(gray)),
            ("Equalized", cv2.equalizeHist(gray)),
            ("Resized 2x", cv2.resize(gray, (gray.shape[1] * 2, gray.shape[0] * 2), interpolation=cv2.INTER_CUBIC)),
            ("Resized 3x", cv2.resize(gray, (gray.shape[1] * 3, gray.shape[0] * 3), interpolation=cv2.INTER_CUBIC)),
        ]
        
        # Configurazioni Tesseract
        tesseract_configs = [
            ("Default", "--oem 3 --psm 6 -l ita+eng"),
            ("Single Block", "--oem 3 --psm 8 -l ita+eng"),
            ("Single Word", "--oem 3 --psm 7 -l ita+eng"),
            ("Single Line", "--oem 3 --psm 13 -l ita+eng"),
            ("Raw Line", "--oem 3 --psm 12 -l ita+eng"),
            ("Sparse Text", "--oem 3 --psm 11 -l ita+eng"),
            ("English Only", "--oem 3 --psm 6 -l eng"),
            ("Italian Only", "--oem 3 --psm 6 -l ita"),
        ]
        
        print("🔤 Estrazione testo con tutti i metodi...")
        
        for prep_name, processed_img in preprocessing_methods:
            for config_name, config in tesseract_configs:
                try:
                    # Estrai testo
                    text = pytesseract.image_to_string(processed_img, config=config)
                    
                    # Estrai dati strutturati
                    data = pytesseract.image_to_data(processed_img, output_type=pytesseract.Output.DICT, config=config)
                    
                    # Calcola confidenza
                    confidences = [int(conf) for conf in data['conf'] if int(conf) > 0]
                    avg_confidence = sum(confidences) / len(confidences) if confidences else 0
                    
                    if text.strip():
                        results.append({
                            'preprocessing': prep_name,
                            'config': config_name,
                            'text': text.strip(),
                            'confidence': avg_confidence,
                            'lines': [line.strip() for line in text.split('\n') if line.strip()]
                        })
                        
                except Exception as e:
                    continue
        
        return results
    
    def analyze_pharmaceutical_content(self, text):
        """Analizza il contenuto farmaceutico del testo."""
        analysis = {
            'raw_text': text,
            'lines': [line.strip() for line in text.split('\n') if line.strip()],
            'pharmaceutical_data': {},
            'detected_codes': [],
            'detected_numbers': [],
            'detected_dates': [],
            'detected_drug_names': [],
            'detected_dosages': []
        }
        
        lines = analysis['lines']
        
        for line in lines:
            # Codici numerici lunghi (probabili codici a barre)
            codes = re.findall(r'\d{8,13}', line)
            analysis['detected_codes'].extend(codes)
            
            # Numeri generici
            numbers = re.findall(r'\d+', line)
            analysis['detected_numbers'].extend(numbers)
            
            # Date
            dates = re.findall(r'\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}', line)
            analysis['detected_dates'].extend(dates)
            
            # Nomi farmaci (pattern comuni)
            drug_patterns = [
                r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)',
                r'(tamsulosin|flomax|prostate|mirabegron)',
            ]
            
            for pattern in drug_patterns:
                matches = re.findall(pattern, line, re.IGNORECASE)
                analysis['detected_drug_names'].extend(matches)
            
            # Dosaggi
            dosage_patterns = [
                r'(\d+)\s*mg',
                r'(\d+)\s*mcg',
                r'(\d+)\s*µg',
                r'(\d+)\s*ml',
                r'(\d+)\s*capsule',
                r'(\d+)\s*tablet',
                r'(\d+)\s*compresse'
            ]
            
            for pattern in dosage_patterns:
                matches = re.findall(pattern, line, re.IGNORECASE)
                analysis['detected_dosages'].extend(matches)
        
        # Rimuovi duplicati
        for key in ['detected_codes', 'detected_numbers', 'detected_dates', 'detected_drug_names', 'detected_dosages']:
            analysis[key] = list(set(analysis[key]))
        
        return analysis
    
    def find_best_results(self, all_results):
        """Trova i risultati migliori basati su confidenza e contenuto."""
        if not all_results:
            return []
        
        # Filtra risultati con confidenza > 30%
        good_results = [r for r in all_results if r['confidence'] > 30]
        
        if not good_results:
            # Se nessun risultato ha confidenza > 30%, prendi i migliori
            good_results = sorted(all_results, key=lambda x: x['confidence'], reverse=True)[:5]
        
        # Ordina per confidenza
        good_results.sort(key=lambda x: x['confidence'], reverse=True)
        
        return good_results
    
    def analyze_image(self, image_path: str):
        """Analizza completamente l'immagine."""
        print("🔍 Avvio analisi finale testo etichetta farmaceutica...")
        print("=" * 70)
        
        # Carica l'immagine
        if not self.load_image(image_path):
            return
        
        # Estrai testo con tutti i metodi
        all_results = self.extract_text_comprehensive()
        
        if not all_results:
            print("❌ Nessun testo estratto con successo")
            return
        
        # Trova i risultati migliori
        best_results = self.find_best_results(all_results)
        
        print(f"\n📊 RISULTATI TROVATI: {len(all_results)} metodi testati")
        print(f"🎯 RISULTATI MIGLIORI: {len(best_results)} selezionati")
        
        # Riassunto finale - Solo codici identificativi
        print(f"\n📊 RIASSUNTO FINALE:")
        print("-" * 25)
        
        # Combina tutti i codici trovati
        all_codes = set()
        
        for result in best_results:
            analysis = self.analyze_pharmaceutical_content(result['text'])
            all_codes.update(analysis['detected_codes'])
        
        if all_codes:
            print(f"🔢 CODICI IDENTIFICATI: {', '.join(sorted(all_codes))}")
        else:
            print("❌ Nessun codice identificato")
            print("💡 L'immagine potrebbe non contenere codici leggibili")
        
        print("\n" + "=" * 70)

def main():
    """Funzione principale."""
    # Percorso dell'immagine
    image_path = "img.jpeg"
    
    if not os.path.exists(image_path):
        print(f"❌ File non trovato: {image_path}")
        return
    
    # Crea l'analizzatore e analizza l'immagine
    analyzer = FinalTextAnalyzer()
    analyzer.analyze_image(image_path)

if __name__ == "__main__":
    main()
