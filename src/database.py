from flask_sqlalchemy import SQLAlchemy

# Inicializa o SQLAlchemy
db = SQLAlchemy()

# Modelo Pedido
class Pedido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cliente = db.Column(db.String(100), nullable=False)
    endereco = db.Column(db.String(200), nullable=False)
    produtos = db.Column(db.Text, nullable=False)  # Armazena JSON dos produtos
    status = db.Column(db.String(50), default="Pendente")  # Status inicial

    def __repr__(self):
        return f'<Pedido {self.id}>'
