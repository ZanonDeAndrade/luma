from flask_sqlalchemy import SQLAlchemy

# Inicializa o SQLAlchemy
db = SQLAlchemy()


class Pedido(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cliente = db.Column(db.String(100), nullable=False)
    endereco = db.Column(db.String(200), nullable=False)
    telefone = db.Column(db.String(15), nullable=False)
    produtos = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), default="Pendente")
    total = db.Column(db.Float, nullable=False)  # Adicione este campo

    def __repr__(self):
        return f'<Pedido {self.id}>'

