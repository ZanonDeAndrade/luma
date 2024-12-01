from flask import Flask, request, jsonify
import mercadopago

app = Flask(__name__)

# Inicializa o SDK do Mercado Pago
sdk = mercadopago.SDK("APP_USR-8293133393523226-091709-14d69e19930fdf604cbaa6c9251e1ca4-1827935072")

def gerar_link_pagamento(items):
    payment_data = {
        "items": items,
        "back_urls": {
            "success": "http://127.0.0.1:5000/compracerta",
            "failure": "http://127.0.0.1:5000/compraerrada",
            "pending": "http://127.0.0.1:5000/compraerrada",
        },
        "auto_return": "all"
    }

    try:
        result = sdk.preference().create(payment_data)
        payment = result.get("response")
        
        # Adicionando logs detalhados para depuração
        print("Resultado da criação da preferência:", result)
        
        if payment and "init_point" in payment:
            return payment["init_point"]
        else:
            print("Erro ao gerar link de pagamento: A chave 'init_point' não foi encontrada.")
            return None
    except Exception as e:
        print("Erro ao chamar a API do Mercado Pago:", str(e))
        return None

@app.route('/pedido', methods=['POST'])
def criar_pedido():
    data = request.get_json()

    # Verifique se os dados necessários estão presentes
    if not data or 'items' not in data:
        return jsonify({"error": "Dados do pedido ausentes ou malformados."}), 400

    # Chama a função para gerar o link de pagamento
    link_pagamento = gerar_link_pagamento(data['items'])

    if link_pagamento:
        return jsonify({"link_pagamento": link_pagamento}), 201
    else:
        return jsonify({"error": "Não foi possível gerar o link de pagamento."}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
