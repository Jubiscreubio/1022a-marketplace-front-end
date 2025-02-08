import { useEffect, useState } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

// Tipo para produtos
type ProdutoType = {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  imagem: string;
  categoria: string;
  estoque: number;
};

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);

  useEffect(() => {
    fetch("https://one022a-marketplace.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados));
  }, []);

  function handleExcluir(id: number) {
    alert(`Excluir o produto com id ${id}`);
    fetch(`https://one022a-marketplace.onrender.com/produtos/${id}`, {
      method: 'DELETE'
    })
      .then(resposta => {
        if (resposta.status === 200) {
          alert("Produto excluído com sucesso");
          window.location.reload();
        } else {
          alert("Erro ao excluir o produto: Confira o terminal do backend");
        }
      });
  }

  return (
    <>
      <nav className="menu-principal">
        <div className="banner-container">
          <img src="/banner.png" alt="Banner do Marketplace" className="banner" />
        </div>
      </nav>

      <div className="cadastro-produto-container">
        <Link to="/cadastro-produto" className="cadastro-link">Cadastro de Produto</Link>
      </div>

      <div className="produtos-container">
        <h1 className='titulo-produto'>Produtos</h1>
        <div className="produtos-list">
          {
            produtos.map(produto => (
              <div key={produto.id} className="produto-item">
                <h3 className="produto-nome">{produto.nome}</h3>
                <div className='container-imagem'>
                  <img src={produto.imagem} alt="Imagem do produto" />
                </div>
                <p className="produto-preco">{produto.preco}</p>
                <p className="produto-descricao">{produto.descricao}</p>
                <p className="produto-categoria">Categoria: {produto.categoria}</p>
                <p className="produto-estoque">Estoque: {produto.estoque}</p>
                <button className="botao-comprar">Comprar</button>
                <button onClick={() => handleExcluir(produto.id)}>Excluir</button>
                <Link to={`/alterar-produto/${produto.id}`}>Alterar</Link>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default App;
