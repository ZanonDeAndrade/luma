import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPanel.css"; // Corrigi a importação do CSS

interface Produto {
  nome: string;
  quantidade: number;
  preco: number;
}

interface Pedido {
  id: number;
  cliente: string;
  endereco: string;
  produtos: Produto[];
  status: string;
}

const AdminPanel: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [paginaAtual, setPaginaAtual] = useState<number>(1);
  const [totalPaginas, setTotalPaginas] = useState<number>(1);


  useEffect(() => {
    buscarPedidos(paginaAtual);
  }, [paginaAtual]);


  const buscarPedidos = async (pagina: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/pedidos?page=${pagina}&per_page=10`
      );
      const { data, pages } = response.data;

      setPedidos(data || []);
      setTotalPaginas(pages || 1);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  // Função para atualizar o status de um pedido
  const atualizarStatus = async (id: number, novoStatus: string) => {
    try {
      await axios.put(`http://localhost:5000/api/pedidos/${id}`, {
        status: novoStatus,
      });
      alert("Status atualizado com sucesso!");
      buscarPedidos(paginaAtual);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Gerenciamento de Pedidos</h1>
      <table className="pedidos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Endereço</th>
            <th>Produtos</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.length > 0 ? (
            pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.cliente}</td>
                <td>{pedido.endereco}</td>
                <td>
                  {pedido.produtos.map((produto, index) => (
                    <div key={index}>
                      {produto.nome} - {produto.quantidade} x R$
                      {produto.preco.toFixed(2)}
                    </div>
                  ))}
                </td>
                <td>{pedido.status}</td>
                <td>
                  <select
                    value={pedido.status}
                    onChange={(e) => atualizarStatus(pedido.id, e.target.value)}
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Em produção">Em produção</option>
                    <option value="Enviado">Enviado</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>Nenhum pedido encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button
          disabled={paginaAtual === 1}
          onClick={() => setPaginaAtual(paginaAtual - 1)}
        >
          Anterior
        </button>
        <span>
          Página {paginaAtual} de {totalPaginas}
        </span>
        <button
          disabled={paginaAtual === totalPaginas}
          onClick={() => setPaginaAtual(paginaAtual + 1)}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
