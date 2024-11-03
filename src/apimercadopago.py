import mercadopago

def gerar_link_pagamento():
    # Insira apenas o token de acesso, sem 'MP_ACCESS_TOKEN=' antes do valor
    sdk = mercadopago.SDK("APP_USR-8293133393523226-091709-14d69e19930fdf604cbaa6c9251e1ca4-1827935072")

    # Dados de pagamento com URLs de redirecionamento
    payment_data = {
        "items": [
            {"id": "1", "title": "Camisa", "quantity": 1, "currency_id": "BRL", "unit_price": 259.99}
        ],
        "back_urls": {
            "success": "http://127.0.0.1:5000/compracerta",
            "failure": "http://127.0.0.1:5000/compraerrada",
            "pending": "http://127.0.0.1:5000/compraerrada",
        },
        "auto_return": "all"
    }

    # Criação da preferência de pagamento
    result = sdk.preference().create(payment_data)
    payment = result.get("response")

    # Verifica se a resposta contém 'init_point' e lida com possíveis erros
    if payment and "init_point" in payment:
        return payment["init_point"]
    else:
        # Imprime a resposta para verificar o problema
        print("Erro ao gerar link de pagamento:", payment)
        return None
