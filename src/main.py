from flask import Flask, request, jsonify
from flask_cors import CORS
from apimercadopago import gerar_link_pagamento

app = Flask(__name__)
CORS(app, resources={r"/checkout": {"origins": "http://localhost:3000"}})  # Ajuste a origem conforme necessário

@app.route("/checkout", methods=["POST"])
def checkout():
    data = request.get_json()
    
    items = data.get("items")  # Obtenha os itens do corpo da requisição

    # Gerar o link de pagamento com os itens
    link_iniciar_pagamento = gerar_link_pagamento(items)

    if not link_iniciar_pagamento:
        return jsonify({"error": "Erro ao gerar o link de pagamento"}), 500

    return jsonify({"link_pagamento": link_iniciar_pagamento})

if __name__ == "__main__":
    app.run(debug=True)