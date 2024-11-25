from flask import Blueprint, request, jsonify
from database import db, Pedido
from apimercadopago import gerar_link_pagamento

# Cria o Blueprint para as rotas
routes = Blueprint('routes', __name__)

@routes.route("/pedido", methods=["POST"])
def salvar_pedido():
    try:
        data = request.get_json()

        if not data or "cliente" not in data or "endereco" not in data or "produtos" not in data:
            return jsonify({"error": "Dados inválidos ou itens não fornecidos"}), 400

        cliente = data["cliente"]
        endereco = data["endereco"]
        produtos = str(data["produtos"])  # Convertendo os produtos para string (JSON)
        
        novo_pedido = Pedido(cliente=cliente, endereco=endereco, produtos=produtos)
        db.session.add(novo_pedido)
        db.session.commit()

        return jsonify({"message": "Pedido criado com sucesso!"}), 201
    except Exception as e:
        return jsonify({"error": f"Erro ao salvar pedido: {str(e)}"}), 500


@routes.route("/checkout", methods=["POST"])
def checkout():
    try:
        data = request.get_json()

        if not data or "items" not in data:
            return jsonify({"error": "Dados inválidos ou itens não fornecidos"}), 400

        items = data["items"]

        if not isinstance(items, list) or len(items) == 0:
            return jsonify({"error": "Itens devem ser uma lista válida"}), 400

        link_iniciar_pagamento = gerar_link_pagamento(items)

        if not link_iniciar_pagamento:
            return jsonify({"error": "Erro ao gerar o link de pagamento"}), 500

        return jsonify({"link_pagamento": link_iniciar_pagamento}), 200

    except Exception as e:
        return jsonify({"error": f"Ocorreu um erro: {str(e)}"}), 500
