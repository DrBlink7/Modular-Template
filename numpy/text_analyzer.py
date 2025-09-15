#!/usr/bin/env python3
"""
Script per analizzare tutto il testo presente in un'etichetta farmaceutica usando OCR.
"""

import cv2
import numpy as np
import pytesseract
from PIL import Image
import os
import re

class TextAnalyzer:
    def __init__(self):
        """Inizializza l'analizzatore di testo."""
        self.image = None
        self.text_results = []
    
    def load_image(self, image_path: str):
        """
        Carica un'immagine dal file.
        
        Args:
            image_path: Percorso dell'immagine
        """
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
    
    def preprocess_image(self, image):
        """
        Preprocessa l'immagine per migliorare l'OCR.
        
        Args:
            image: Immagine da preprocessare
            
        Returns:
            Lista di immagini preprocessate
        """
        processed_images = []
        
        # Converti in scala di grigi
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        processed_images.append(("Grayscale", gray))
        
        # Binarizzazione con soglia OTSU
        _, binary_otsu = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        processed_images.append(("Binary OTSU", binary_otsu))
        
        # Binarizzazione con soglia fissa
        _, binary_fixed = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
        processed_images.append(("Binary Fixed", binary_fixed))
        
        # Binarizzazione inversa
        _, binary_inv = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)
        processed_images.append(("Binary Inverted", binary_inv))
        
        # Morfologia per pulire il testo
        kernel = np.ones((2,2), np.uint8)
        morphed = cv2.morphologyEx(binary_otsu, cv2.MORPH_CLOSE, kernel)
        processed_images.append(("Morphed", morphed))
        
        # Ridimensionamento per migliorare la risoluzione
        height, width = gray.shape
        scale_factor = 2
        resized = cv2.resize(gray, (width * scale_factor, height * scale_factor), interpolation=cv2.INTER_CUBIC)
        processed_images.append(("Resized 2x", resized))
        
        return processed_images
    
    def extract_text_with_ocr(self, image, method_name):
        """
        Estrae il testo usando OCR.
        
        Args:
            image: Immagine da analizzare
            method_name: Nome del metodo di preprocessing
            
        Returns:
            Testo estratto
        """
        try:
            # Configurazione Tesseract per italiano e inglese
            config = '--oem 3 --psm 6 -l ita+eng'
            
            # Estrai testo
            text = pytesseract.image_to_string(image, config=config)
            
            # Estrai anche i dati strutturati
            data = pytesseract.image_to_data(image, output_type=pytesseract.Output.DICT, config=config)
            
            return {
                'method': method_name,
                'text': text.strip(),
                'data': data,
                'confidence': self.calculate_average_confidence(data)
            }
        except Exception as e:
            print(f"❌ Errore OCR con {method_name}: {e}")
            return None
    
    def calculate_average_confidence(self, data):
        """Calcola la confidenza media dell'OCR."""
        confidences = [int(conf) for conf in data['conf'] if int(conf) > 0]
        return sum(confidences) / len(confidences) if confidences else 0
    
    def analyze_text_content(self, text):
        """
        Analizza il contenuto del testo estratto per identificare informazioni farmaceutiche.
        
        Args:
            text: Testo estratto dall'OCR
        """
        analysis = {
            'raw_text': text,
            'lines': [line.strip() for line in text.split('\n') if line.strip()],
            'pharmaceutical_info': {},
            'numbers': [],
            'dates': [],
            'codes': []
        }
        
        # Cerca informazioni farmaceutiche comuni
        lines = analysis['lines']
        
        for i, line in enumerate(lines):
            line_lower = line.lower()
            
            # Nome del farmaco
            if any(keyword in line_lower for keyword in ['mg', 'capsule', 'tablet', 'compresse', 'cps']):
                analysis['pharmaceutical_info']['drug_name'] = line
            
            # Dosaggio
            dosage_match = re.search(r'(\d+)\s*mg', line, re.IGNORECASE)
            if dosage_match:
                analysis['pharmaceutical_info']['dosage'] = dosage_match.group(0)
            
            # Numero di lotto
            lot_match = re.search(r'lot[:\s]*([A-Z0-9]+)', line, re.IGNORECASE)
            if lot_match:
                analysis['pharmaceutical_info']['lot_number'] = lot_match.group(1)
            
            # Data di scadenza
            date_match = re.search(r'(\d{2}[\/\-\.]\d{2}[\/\-\.]\d{4}|\d{4}[\/\-\.]\d{2}[\/\-\.]\d{2})', line)
            if date_match:
                analysis['dates'].append(date_match.group(1))
            
            # Codici a barre
            barcode_match = re.search(r'(\d{8,13})', line)
            if barcode_match:
                analysis['codes'].append(barcode_match.group(1))
            
            # Numeri generici
            numbers = re.findall(r'\d+', line)
            analysis['numbers'].extend(numbers)
        
        return analysis
    
    def analyze_image(self, image_path: str):
        """
        Analizza completamente un'immagine per estrarre tutto il testo.
        
        Args:
            image_path: Percorso dell'immagine
        """
        print("🔍 Avvio analisi testo etichetta farmaceutica...")
        print("=" * 60)
        
        # Carica l'immagine
        if not self.load_image(image_path):
            return
        
        # Preprocessa l'immagine con diversi metodi
        print("\n📊 Preprocessing dell'immagine...")
        processed_images = self.preprocess_image(self.image)
        
        # Estrai testo con ogni metodo
        print("\n🔤 Estrazione testo con OCR...")
        best_result = None
        best_confidence = 0
        
        for method_name, processed_img in processed_images:
            print(f"  🔍 Metodo: {method_name}")
            result = self.extract_text_with_ocr(processed_img, method_name)
            
            if result:
                confidence = result['confidence']
                print(f"    ✅ Confidenza: {confidence:.1f}%")
                
                if confidence > best_confidence:
                    best_confidence = confidence
                    best_result = result
            else:
                print(f"    ❌ Fallito")
        
        if not best_result:
            print("❌ Nessun testo estratto con successo")
            return
        
        # Analizza il contenuto del testo
        print(f"\n📋 Analisi del contenuto (migliore: {best_result['method']})...")
        analysis = self.analyze_text_content(best_result['text'])
        
        # Stampa i risultati
        self.print_results(best_result, analysis)
    
    def print_results(self, ocr_result, analysis):
        """Stampa i risultati dell'analisi."""
        print("\n" + "=" * 60)
        print("RISULTATI ANALISI TESTO ETICHETTA")
        print("=" * 60)
        
        print(f"\n📊 METODO OCR MIGLIORE: {ocr_result['method']}")
        print(f"🎯 CONFIDENZA: {ocr_result['confidence']:.1f}%")
        
        print(f"\n📝 TESTO COMPLETO ESTRATTO:")
        print("-" * 40)
        print(ocr_result['text'])
        
        print(f"\n📋 RIGHE IDENTIFICATE ({len(analysis['lines'])}):")
        print("-" * 30)
        for i, line in enumerate(analysis['lines'], 1):
            print(f"{i:2d}. {line}")
        
        if analysis['pharmaceutical_info']:
            print(f"\n💊 INFORMAZIONI FARMACEUTICHE:")
            print("-" * 35)
            for key, value in analysis['pharmaceutical_info'].items():
                print(f"  {key.replace('_', ' ').title()}: {value}")
        
        if analysis['dates']:
            print(f"\n📅 DATE TROVATE:")
            print("-" * 20)
            for date in analysis['dates']:
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
        
        print("\n" + "=" * 60)

def main():
    """Funzione principale."""
    # Verifica che Tesseract sia installato
    try:
        pytesseract.get_tesseract_version()
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
    analyzer = TextAnalyzer()
    analyzer.analyze_image(image_path)

if __name__ == "__main__":
    main()
