from flask import Flask, render_template
from apimercadopago import gerar_link_pagamento

app = Flask(__name__)

@app.route("/")
def homepage():
    link_iniciar_pagamento = gerar_link_pagamento()

    if not link_iniciar_pagamento:
        return "Erro ao gerar o link de pagamento", 500

    return render_template("homepage.html", link_pagamento=link_iniciar_pagamento)

if __name__ == "__main__":
    app.run(debug=True)
