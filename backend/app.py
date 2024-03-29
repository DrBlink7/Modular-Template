from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/healthcheck')
def healthcheck():
    # Implementa il tuo codice per controllare lo stato del backend qui
    # Ad esempio, puoi verificare la connessione al database
    # Se tutto è ok, restituisci 'I'm healthy', altrimenti restituisci un errore
    return jsonify({"message": "I'm healthy"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
