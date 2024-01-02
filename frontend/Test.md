# E2E vs Component test con Cypress

- Component test verificano le proprietà css e vari test di grafica, oltre che click per controllare se lo stato di react è gestito correttamente (tipo apri/chiudi menù).
- negli E2E test devi fare dei case scenario, come se fossero smoke test ma automatizzati, non ti devi focalizzare su proprietà di css ma su una serie di click che portano da punto 0 a punto N dell'applicazione.

Gli E2E test hanno bisogno che l'app sia sù (quindi o che sia hostata o lanciata in locale), mentre i component test sono in grado di renderizzare il componente da testare senza che l'applicazione sia sù, questo perché il loro scope è ridotto. 
Gli E2E, simulando un vero e proprio smoke test, hanno bisogno di dati (quindi li devi mockare) e di avere una sequenza di azioni che hanno un senso logico, in pratica sono i test case che fa un QA, ma automatizzati.

## Appunti

### Component Tests:
Assicurati di testare anche casi di rendering condizionale, ad esempio, quando un componente dovrebbe rendersi in un certo modo in base allo stato o alle props.

### Controller Tests:
Considera anche l'uso di mock o stub per emulare determinate funzionalità o chiamate di API all'interno dei test del controller, in modo da concentrarti veramente sull'unità specifica che stai cercando di testare.

### E2E Tests:
Cerca di includere scenari edge case nei tuoi test E2E, come ad esempio situazioni in cui l'utente inserisce dati non validi o tenta di eseguire azioni senza essere autenticato.
Mantieni i test E2E il più possibile indipendenti l'uno dall'altro per evitare dipendenze indesiderate tra di essi.

### Continuous Integration:
Assicurati che i test siano eseguiti regolarmente come parte del tuo processo di integrazione continua.

Ricorda che l'obiettivo principale dei test è fornire fiducia nella stabilità e nel corretto funzionamento dell'applicazione. Con il tempo, potresti anche scoprire nuove aree che meritano test aggiuntivi o potrebbero essere migliorate.