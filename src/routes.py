from flask import Blueprint, request, jsonify
from database import db, Pedido
from apimercadopago import gerar_link_pagamento

# Cria o Blueprint para as rotas
routes = Blueprint('routes', __name__)

@routes.route("/pedido", methods=["POST"])
def salvar_pedido():
    try:
        data = request.get_json()

        # Verificando campos obrigatórios
        if not data or \
           "cliente" not in data or \
           "endereco" not in data or \
           "telefone" not in data or \
           "items" not in data or \
           "total" not in data:
            return jsonify({"error": "Dados inválidos ou incompletos"}), 400

        cliente = data["cliente"]
        endereco = data["endereco"]
        telefone = data["telefone"]
        items = data["items"]
        total = data["total"]

        # Verificando se os itens e o endereço estão no formato correto
        if not isinstance(endereco, dict) or \
           "rua" not in endereco or \
           "numero" not in endereco or \
           "bairro" not in endereco or \
           "cep" not in endereco:
            return jsonify({"error": "Endereço inválido"}), 400

        if not isinstance(items, list) or len(items) == 0:
            return jsonify({"error": "Itens devem ser uma lista válida"}), 400

        # Salvando o pedido no banco de dados
        novo_pedido = Pedido(
            cliente=cliente,
            endereco=str(endereco),  # Convertendo o dicionário para string para salvar no banco
            telefone=telefone,
            produtos=str(items),  # Convertendo a lista para string
            total=total
        )
        db.session.add(novo_pedido)
        db.session.commit()

        # Gerar o link de pagamento usando a função de API
        link_pagamento = gerar_link_pagamento(items)

        # Caso não tenha gerado o link, retorna erro
        if not link_pagamento:
            return jsonify({"error": "Erro ao gerar o link de pagamento"}), 500

        return jsonify({"link_pagamento": link_pagamento}), 201

    except Exception as e:
        return jsonify({"error": f"Erro ao salvar pedido: {str(e)}"}), 500