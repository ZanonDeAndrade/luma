from flask import Flask
from flask_cors import CORS
from database import db
from routes import routes
import os

# Caminho absoluto do diretório onde o main.py está localizado
base_dir = os.path.abspath(os.path.dirname(__file__))

# Configuração do aplicativo Flask
app = Flask(__name__)

# Configuração do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(base_dir, "pedidos.db")}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

# Configuração do CORS para permitir todas as origens
CORS(app)  

# Registra as rotas da aplicação
app.register_blueprint(routes)

# Função para inicializar o banco de dados (executado apenas uma vez)
def init_db():
    with app.app_context():
        print("Criando tabelas no banco de dados...")
        db.create_all()
        print("Tabelas criadas com sucesso!")

        # Verificando a URL do banco de dados
        print("Verificando conexão com o banco de dados...")
        print(db.engine.url)

# Ponto de entrada principal
if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=True)