#!/usr/bin/env python3
"""
Script avanzato per analizzare tutto il testo presente in un'etichetta farmaceutica.
"""

import cv2
import numpy as np
import pytesseract
from PIL import Image
import os
import re

class AdvancedTextAnalyzer:
    def __init__(self):
        """Inizializza l'analizzatore di testo avanzato."""
        self.image = None
        self.text_results = []
    
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
    
    def preprocess_image_advanced(self, image):
        """Preprocessa l'immagine con tecniche avanzate per migliorare l'OCR."""
        processed_images = []
        
        # Converti in scala di grigi
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # 1. Immagine originale in scala di grigi
        processed_images.append(("Original Grayscale", gray))
        
        # 2. Binarizzazione OTSU
        _, binary_otsu = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        processed_images.append(("Binary OTSU", binary_otsu))
        
        # 3. Binarizzazione adattiva
        adaptive = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)
        processed_images.append(("Adaptive Threshold", adaptive))
        
        # 4. Ridimensionamento 3x per migliorare la risoluzione
        height, width = gray.shape
        resized_3x = cv2.resize(gray, (width * 3, height * 3), interpolation=cv2.INTER_CUBIC)
        processed_images.append(("Resized 3x", resized_3x))
        
        # 5. Filtro gaussiano + binarizzazione
        blurred = cv2.GaussianBlur(gray, (3, 3), 0)
        _, binary_blurred = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        processed_images.append(("Gaussian + Binary", binary_blurred))
        
        # 6. Morfologia per pulire il testo
        kernel = np.ones((2,2), np.uint8)
        morphed = cv2.morphologyEx(binary_otsu, cv2.MORPH_CLOSE, kernel)
        processed_images.append(("Morphed", morphed))
        
        # 7. Riduzione del rumore
        denoised = cv2.fastNlMeansDenoising(gray)
        processed_images.append(("Denoised", denoised))
        
        # 8. Equalizzazione dell'istogramma
        equalized = cv2.equalizeHist(gray)
        processed_images.append(("Histogram Equalized", equalized))
        
        # 9. Combinazione di tecniche
        denoised_resized = cv2.resize(denoised, (width * 2, height * 2), interpolation=cv2.INTER_CUBIC)
        _, binary_combined = cv2.threshold(denoised_resized, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        processed_images.append(("Denoised + Resized + Binary", binary_combined))
        
        return processed_images
    
    def extract_text_with_multiple_configs(self, image, method_name):
        """Estrae il testo usando diverse configurazioni di Tesseract."""
        results = []
        
        # Configurazioni diverse per Tesseract
        configs = [
            ('Default', '--oem 3 --psm 6 -l ita+eng'),
            ('Single Block', '--oem 3 --psm 8 -l ita+eng'),
            ('Single Word', '--oem 3 --psm 7 -l ita+eng'),
            ('Single Line', '--oem 3 --psm 13 -l ita+eng'),
            ('Raw Line', '--oem 3 --psm 12 -l ita+eng'),
            ('Sparse Text', '--oem 3 --psm 11 -l ita+eng'),
            ('English Only', '--oem 3 --psm 6 -l eng'),
            ('Italian Only', '--oem 3 --psm 6 -l ita'),
        ]
        
        for config_name, config in configs:
            try:
                # Estrai testo
                text = pytesseract.image_to_string(image, config=config)
                
                # Estrai dati strutturati
                data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT, config=config)
                
                # Calcola confidenza
                confidences = [int(conf) for conf in data['conf'] if int(conf) > 0]
                avg_confidence = sum(confidences) / len(confidences) if confidences else 0
                
                if text.strip():
                    results.append({
                        'method': f"{method_name} - {config_name}",
                        'text': text.strip(),
                        'confidence': avg_confidence,
                        'config': config_name
                    })
                    
            except Exception as e:
                print(f"    ❌ Errore con {config_name}: {e}")
        
        return results
    
    def analyze_text_content_advanced(self, text):
        """Analizza il contenuto del testo con pattern farmaceutici avanzati."""
        analysis = {
            'raw_text': text,
            'lines': [line.strip() for line in text.split('\n') if line.strip()],
            'pharmaceutical_info': {},
            'numbers': [],
            'dates': [],
            'codes': [],
            'drug_names': [],
            'dosages': [],
            'lot_numbers': [],
            'expiry_dates': []
        }
        
        lines = analysis['lines']
        
        for i, line in enumerate(lines):
            line_clean = re.sub(r'[^\w\s\d\-\.\/]', ' ', line)  # Pulisce caratteri speciali
            line_lower = line_clean.lower()
            
            # Nome del farmaco (pattern comuni)
            drug_patterns = [
                r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)',  # Parole con maiuscole
                r'(tamsulosin|flomax|prostate)',  # Nomi specifici
            ]
            
            for pattern in drug_patterns:
                matches = re.findall(pattern, line)
                if matches:
                    analysis['drug_names'].extend(matches)
            
            # Dosaggio
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
                if matches:
                    analysis['dosages'].extend(matches)
            
            # Numero di lotto
            lot_patterns = [
                r'lot[:\s]*([A-Z0-9]+)',
                r'lotto[:\s]*([A-Z0-9]+)',
                r'batch[:\s]*([A-Z0-9]+)',
                r'([A-Z]{2,3}\d{6,8})',  # Pattern comune lotto
            ]
            
            for pattern in lot_patterns:
                matches = re.findall(pattern, line, re.IGNORECASE)
                if matches:
                    analysis['lot_numbers'].extend(matches)
            
            # Date di scadenza
            date_patterns = [
                r'(\d{2}[\/\-\.]\d{2}[\/\-\.]\d{4})',
                r'(\d{4}[\/\-\.]\d{2}[\/\-\.]\d{2})',
                r'(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})',
                r'scad[:\s]*(\d{2}[\/\-\.]\d{2}[\/\-\.]\d{4})',
                r'exp[:\s]*(\d{2}[\/\-\.]\d{2}[\/\-\.]\d{4})',
            ]
            
            for pattern in date_patterns:
                matches = re.findall(pattern, line, re.IGNORECASE)
                if matches:
                    analysis['expiry_dates'].extend(matches)
            
            # Codici a barre e codici numerici
            code_patterns = [
                r'(\d{8,13})',  # Codici numerici lunghi
                r'([A-Z]{2,4}\d{6,10})',  # Codici alfanumerici
                r'(\d{3,4}-\d{3,4}-\d{3,4})',  # Codici con trattini
            ]
            
            for pattern in code_patterns:
                matches = re.findall(pattern, line)
                if matches:
                    analysis['codes'].extend(matches)
            
            # Numeri generici
            numbers = re.findall(r'\d+', line)
            analysis['numbers'].extend(numbers)
        
        # Rimuovi duplicati
        for key in ['drug_names', 'dosages', 'lot_numbers', 'expiry_dates', 'codes', 'numbers']:
            analysis[key] = list(set(analysis[key]))
        
        return analysis
    
    def analyze_image(self, image_path: str):
        """Analizza completamente un'immagine per estrarre tutto il testo."""
        print("🔍 Avvio analisi avanzata testo etichetta farmaceutica...")
        print("=" * 70)
        
        # Carica l'immagine
        if not self.load_image(image_path):
            return
        
        # Preprocessa l'immagine con tecniche avanzate
        print("\n📊 Preprocessing avanzato dell'immagine...")
        processed_images = self.preprocess_image_advanced(self.image)
        
        # Estrai testo con ogni metodo e configurazione
        print("\n🔤 Estrazione testo con OCR avanzato...")
        all_results = []
        
        for method_name, processed_img in processed_images:
            print(f"  🔍 Metodo: {method_name}")
            results = self.extract_text_with_multiple_configs(processed_img, method_name)
            all_results.extend(results)
        
        if not all_results:
            print("❌ Nessun testo estratto con successo")
            return
        
        # Trova il risultato migliore
        best_result = max(all_results, key=lambda x: x['confidence'])
        
        # Analizza il contenuto del testo
        print(f"\n📋 Analisi del contenuto (migliore: {best_result['method']})...")
        analysis = self.analyze_text_content_advanced(best_result['text'])
        
        # Stampa i risultati
        self.print_results_advanced(best_result, analysis, all_results)
    
    def print_results_advanced(self, best_result, analysis, all_results):
        """Stampa i risultati dell'analisi avanzata."""
        print("\n" + "=" * 70)
        print("RISULTATI ANALISI AVANZATA TESTO ETICHETTA")
        print("=" * 70)
        
        print(f"\n📊 METODO OCR MIGLIORE: {best_result['method']}")
        print(f"🎯 CONFIDENZA: {best_result['confidence']:.1f}%")
        
        print(f"\n📝 TESTO COMPLETO ESTRATTO:")
        print("-" * 40)
        print(best_result['text'])
        
        print(f"\n📋 RIGHE IDENTIFICATE ({len(analysis['lines'])}):")
        print("-" * 30)
        for i, line in enumerate(analysis['lines'], 1):
            print(f"{i:2d}. {line}")
        
        # Informazioni farmaceutiche
        if analysis['drug_names']:
            print(f"\n💊 NOMI FARMACI TROVATI:")
            print("-" * 30)
            for drug in analysis['drug_names']:
                print(f"  • {drug}")
        
        if analysis['dosages']:
            print(f"\n💉 DOSAGGI TROVATI:")
            print("-" * 25)
            for dosage in analysis['dosages']:
                print(f"  • {dosage}")
        
        if analysis['lot_numbers']:
            print(f"\n🏷️ NUMERI DI LOTTO:")
            print("-" * 25)
            for lot in analysis['lot_numbers']:
                print(f"  • {lot}")
        
        if analysis['expiry_dates']:
            print(f"\n📅 DATE DI SCADENZA:")
            print("-" * 25)
            for date in analysis['expiry_dates']:
                print(f"  • {date}")
        
        if analysis['codes']:
            print(f"\n🔢 CODICI TROVATI:")
            print("-" * 20)
            for code in analysis['codes']:
                print(f"  • {code}")
        
        if analysis['numbers']:
            print(f"\n🔢 NUMERI TROVATI ({len(analysis['numbers'])}):")
            print("-" * 30)
            print(f"  {', '.join(analysis['numbers'][:20])}")
            if len(analysis['numbers']) > 20:
                print(f"  ... e altri {len(analysis['numbers']) - 20} numeri")
        
        # Statistiche OCR
        print(f"\n📊 STATISTICHE OCR:")
        print("-" * 25)
        print(f"  Metodi testati: {len(all_results)}")
        print(f"  Confidenza media: {sum(r['confidence'] for r in all_results) / len(all_results):.1f}%")
        print(f"  Confidenza massima: {max(r['confidence'] for r in all_results):.1f}%")
        print(f"  Confidenza minima: {min(r['confidence'] for r in all_results):.1f}%")
        
        print("\n" + "=" * 70)

def main():
    """Funzione principale."""
    # Verifica che Tesseract sia installato
    try:
        version = pytesseract.get_tesseract_version()
        print(f"✅ Tesseract OCR versione: {version}")
    except Exception as e:
        print("❌ Tesseract OCR non trovato!")
        print("📥 Installa Tesseract:")
        print("   brew install tesseract")
        print("   brew install tesseract-lang")
        return
    
    # Percorso dell'immagine
    image_path = "img.jpeg"
    
    if not os.path.exists(image_path):
        print(f"❌ File non trovato: {image_path}")
        return
    
    # Crea l'analizzatore e analizza l'immagine
    analyzer = AdvancedTextAnalyzer()
    analyzer.analyze_image(image_path)

if __name__ == "__main__":
    main()
