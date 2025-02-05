import { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

// Tipo para produtos
type ProdutoType = {
  id: number;
  titulo: string;
  detalhe: string;
  valor: string;
  foto: string;
  categoria: string;
  estoque: string;
};

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);

  // useEffect para carregar produtos
  useEffect(() => {
    fetch('https://one022a-marketplace.onrender.com/produtos')
      .then((resposta) => resposta.json())
      .then((dados) => setProdutos(dados));
  }, []);

  function handleExcluir(id: number) {
    if (!window.confirm(`Deseja realmente excluir o produto com id ${id}?`)) return;
    
    fetch(`https://one022a-marketplace.onrender.com/produtos/${id}`, {
      method: 'DELETE',
    })
      .then((resposta) => {
        if (resposta.ok) {
          alert('Produto excluído com sucesso');
          setProdutos(produtos.filter((produto) => produto.id !== id));
        } else {
          alert('Erro ao excluir o produto: Confira o terminal do backend');
        }
      })
      .catch(() => alert('Erro ao excluir o produto'));
  }

  return (
    <>
      {/* Menu Principal com Banner */}
      <nav className="menu-principal">
        <div className="banner-container">
          <img src="/banner.png" alt="Banner do Marketplace" className="banner" />
        </div>
      </nav>

      {/* Link de Cadastro de Produto */}
      <div className="cadastro-produto-container">
        <Link to="/cadastro-produto" className="cadastro-link">
          Cadastro de Produto
        </Link>
      </div>

      {/* Listagem de Produtos */}
      <div className="produtos-container">
        <h1 className="titulo-produto">Produtos</h1>
        <div className="produtos-list">
          {produtos.map((produto) => (
            <div key={produto.id} className="produto-item">
              <h3 className="produto-nome">{produto.titulo}</h3>
              <div className="container-imagem">
                <img
                  src={produto.foto.startsWith('http') ? produto.foto : `https://one022a-marketplace.onrender.com/${produto.foto}`}
                  alt={produto.titulo}
                  onError={(e) => (e.currentTarget.src = '/imagem-padrao.png')}
                />
              </div>
              <p className="produto-preco">R$ {produto.valor}</p>
              <p className="produto-descricao">{produto.detalhe}</p>
              <button className="botao-comprar">Comprar</button>
              <button onClick={() => handleExcluir(produto.id)}>Excluir</button>
              <Link to={`/alterar-produto/${produto.id}`}>Alterar</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
