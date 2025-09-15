import numpy as np
from scipy.optimize import lsq_linear

A = np.array([
    [16, 12, 16, 16, 18, 14, 14, 13, 8, 8], # Harrison
    [15, 12, 16, 16, 17, 12, 13, 12, 10, 4], # Kraynov
    [17, 11, 13, 17, 18, 13, 14, 12, 8, 9], # Ntataki
    [15, 9, 8, 15, 15, 7, 15, 12, 15, 5], # Freeman
    [12, 9, 10, 9, 11, 9, 3, 4, 7, 8], # Mahon
    [7, 10, 10, 11, 9, 7, 11, 13, 5, 4], # Kuanshan
    [10, 9, 8, 12, 10, 6, 11, 9, 6, 10], # Liiv
    [8, 7, 4, 8, 8, 6, 6, 8, 10, 7], # Sun
    [6, 5, 6, 7, 8, 7, 8, 4, 10, 6], # Fuli
    [6, 7, 6, 6, 7, 8, 7, 7, 8, 5], # Still
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], # Taylor
    [1, 1, 1, 1, 1, 1, 1, 2, 1, 1] # Gregory
])

play = np.array([13.9, 13.46, 12.99, 10.3, 9.08, 8.48, 8.13, 6.55, 6.83, 6.9, 1.0, 1.01])
guardia = np.array([13.98, 13.51, 12.98, 10.26, 9.19, 8.5, 8.24, 6.41, 6.64, 6.76, 1.0, 1.01])
ala_p = np.array([13.3, 12.87, 12.67, 11.78, 7.56, 8.97, 8.56, 7.13, 6.98, 7.04, 1.01, 1.14])
ala_g = np.array([12.71, 12.37, 12.34, 12.97, 6.0, 9.62, 8.96, 7.51, 6.99, 7.07, 1.0, 1.24])
centro = np.array([12.36, 12.12, 12.03, 13.46, 5.3, 9.92, 9.02, 7.73, 7.0, 7.16, 1.0, 1.3])

res = lsq_linear(A, play, bounds=(0, np.inf))
np.set_printoptions(precision=6, suppress=True)

print("Pesi trovati:")
print(res.x)

colonne_excel = ["C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]
pesi_excel = ";".join([f"{colonne_excel[i]}34*{x:.6f}".replace(".", ",") for i, x in enumerate(res.x)])
print('Formula Excel:')
print(f"=SOMMA({pesi_excel})")

print("\nResiduals (errore quadratico):")
print(f"{res.cost:.6f}") 
