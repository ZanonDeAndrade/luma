from flask import Flask
from flask_cors import CORS
from database import db
from routes import routes

# Configuração do aplicativo Flask
app = Flask(__name__)

# Configuração do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pedidos.db'  # Usando SQLite local
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Configuração do CORS
CORS(app, resources={
    r"/checkout": {
        "origins": ["http://localhost:3000", "http://191.252.205.7"]  # Domínios permitidos
    }
})

# Registra as rotas da aplicação
app.register_blueprint(routes)

# Função para inicializar o banco de dados
def init_db():
    with app.app_context():
        db.create_all()
        print("Banco de dados inicializado!")

# Ponto de entrada principal
if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=True)
