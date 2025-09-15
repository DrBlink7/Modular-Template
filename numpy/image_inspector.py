#!/usr/bin/env python3
"""
Script per ispezionare l'immagine e capire meglio il contenuto dell'etichetta.
"""

import cv2
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
import os

class ImageInspector:
    def __init__(self):
        """Inizializza l'ispettore di immagini."""
        self.image = None
    
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
    
    def analyze_image_properties(self):
        """Analizza le proprietà dell'immagine."""
        if self.image is None:
            return
        
        print("\n📊 PROPRIETÀ IMMAGINE:")
        print("-" * 30)
        
        height, width, channels = self.image.shape
        print(f"Dimensioni: {width} x {height} pixel")
        print(f"Canali: {channels}")
        print(f"Tipo dati: {self.image.dtype}")
        
        # Statistiche dei colori
        gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        print(f"Luminosità media: {np.mean(gray):.1f}")
        print(f"Contrasto (std): {np.std(gray):.1f}")
        print(f"Luminosità min: {np.min(gray)}")
        print(f"Luminosità max: {np.max(gray)}")
        
        # Analisi dell'istogramma
        hist = cv2.calcHist([gray], [0], None, [256], [0, 256])
        print(f"Pixel neri (0-50): {np.sum(hist[0:51])}")
        print(f"Pixel grigi (51-200): {np.sum(hist[51:201])}")
        print(f"Pixel bianchi (201-255): {np.sum(hist[201:256])}")
    
    def detect_text_regions(self):
        """Rileva le regioni che potrebbero contenere testo."""
        if self.image is None:
            return
        
        print("\n🔍 RILEVAMENTO REGIONI TESTO:")
        print("-" * 35)
        
        gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        
        # Metodo 1: Contorni
        edges = cv2.Canny(gray, 50, 150)
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        text_regions = []
        for i, contour in enumerate(contours):
            area = cv2.contourArea(contour)
            x, y, w, h = cv2.boundingRect(contour)
            aspect_ratio = w / h if h > 0 else 0
            
            # Filtra regioni che potrebbero essere testo
            if area > 100 and w > 20 and h > 10 and aspect_ratio > 0.5:
                text_regions.append({
                    'id': i,
                    'area': area,
                    'rect': (x, y, w, h),
                    'aspect_ratio': aspect_ratio
                })
        
        # Ordina per area
        text_regions.sort(key=lambda x: x['area'], reverse=True)
        
        print(f"Regioni potenziali trovate: {len(text_regions)}")
        for i, region in enumerate(text_regions[:10]):  # Mostra le prime 10
            x, y, w, h = region['rect']
            print(f"  {i+1}. Area: {region['area']:.0f}, Pos: ({x},{y}), Dim: {w}x{h}, Ratio: {region['aspect_ratio']:.2f}")
        
        return text_regions
    
    def create_preview_images(self):
        """Crea immagini di anteprima per visualizzare i diversi preprocessing."""
        if self.image is None:
            return
        
        print("\n🖼️ CREAZIONE ANTEPRIME PREPROCESSING:")
        print("-" * 45)
        
        gray = cv2.cvtColor(self.image, cv2.COLOR_BGR2GRAY)
        
        # Diversi metodi di preprocessing
        methods = {
            'original': gray,
            'binary_otsu': cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1],
            'adaptive': cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2),
            'gaussian': cv2.GaussianBlur(gray, (3, 3), 0),
            'denoised': cv2.fastNlMeansDenoising(gray),
            'equalized': cv2.equalizeHist(gray),
            'resized_2x': cv2.resize(gray, (gray.shape[1] * 2, gray.shape[0] * 2), interpolation=cv2.INTER_CUBIC),
            'resized_3x': cv2.resize(gray, (gray.shape[1] * 3, gray.shape[0] * 3), interpolation=cv2.INTER_CUBIC),
        }
        
        # Salva le anteprime
        for name, processed_img in methods.items():
            filename = f"preview_{name}.jpg"
            cv2.imwrite(filename, processed_img)
            print(f"  ✅ Salvato: {filename}")
    
    def extract_text_from_regions(self, text_regions):
        """Estrae il testo dalle regioni rilevate."""
        if self.image is None or not text_regions:
            return
        
        print("\n📝 ESTRAZIONE TESTO PER REGIONI:")
        print("-" * 40)
        
        import pytesseract
        
        for i, region in enumerate(text_regions[:5]):  # Analizza le prime 5 regioni
            x, y, w, h = region['rect']
            
            # Estrai la regione
            roi = self.image[y:y+h, x:x+w]
            
            # Converti in scala di grigi
            roi_gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
            
            # Preprocessa
            _, roi_binary = cv2.threshold(roi_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
            
            # Estrai testo
            try:
                text = pytesseract.image_to_string(roi_binary, config='--oem 3 --psm 8 -l ita+eng')
                if text.strip():
                    print(f"  Regione {i+1}: '{text.strip()}'")
                else:
                    print(f"  Regione {i+1}: (nessun testo)")
            except Exception as e:
                print(f"  Regione {i+1}: Errore - {e}")
    
    def inspect_image(self, image_path: str):
        """Ispettiona completamente un'immagine."""
        print("🔍 Avvio ispezione immagine etichetta...")
        print("=" * 50)
        
        # Carica l'immagine
        if not self.load_image(image_path):
            return
        
        # Analizza le proprietà
        self.analyze_image_properties()
        
        # Rileva regioni di testo
        text_regions = self.detect_text_regions()
        
        # Crea anteprime
        self.create_preview_images()
        
        # Estrai testo dalle regioni
        self.extract_text_from_regions(text_regions)
        
        print("\n" + "=" * 50)
        print("✅ Ispezione completata!")
        print("📁 Controlla i file preview_*.jpg per vedere i diversi preprocessing")

def main():
    """Funzione principale."""
    # Percorso dell'immagine
    image_path = "img.jpeg"
    
    if not os.path.exists(image_path):
        print(f"❌ File non trovato: {image_path}")
        return
    
    # Crea l'ispettore e analizza l'immagine
    inspector = ImageInspector()
    inspector.inspect_image(image_path)

if __name__ == "__main__":
    main()
