import { useEffect, useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

// Tipo para produtos
type ProdutoType = {
  id: number,
  nome: string,
  preco: string,
  descricao: string,
  categoria: string,
  imagem: string
}

// Tipo para carrinho
type CarrinhoType = {
  id: number,
  nome: string,
  descricao: string,
  imagem: string,
}

// Componente de cadastro de carrinho
function CadastroCarrinho() {
  return (
    <div>
      <h1>Cadastro de Carrinho</h1>
      <p>Este é o cadastro do carrinho de compras.</p>
    </div>
  );
}

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<ProdutosCadastrados />} />
          <Route path="/cadastro-carrinho" element={<CadastroCarrinho />} />
          <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);

function ProdutosCadastrados() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [carrinho, setCarrinho] = useState<CarrinhoType[]>([]);

  useEffect(() => {
    // Buscar os produtos
    fetch("https://one022a-marketplace.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados));

 

    // Buscar os itens no carrinho a partir do localStorage
    const carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho") || "[]");
    setCarrinho(carrinhoSalvo);
  }, []);

  // Função para adicionar um produto ao carrinho
  function adicionarAoCarrinho(produto: ProdutoType) {
    // Verificar se o produto já está no carrinho
    const carrinhoAtualizado = [...carrinho];
    const produtoExistente = carrinhoAtualizado.find(item => item.id === produto.id);

    if (produtoExistente) {
      // Se o produto já existir, podemos apenas aumentar a quantidade
      alert(`${produto.nome} já está no carrinho`);
    } else {
      // Se não, adicionamos o produto ao carrinho
      carrinhoAtualizado.push({
        id: produto.id,
        nome: produto.nome,
        descricao: produto.descricao,
        imagem: produto.imagem,
      });

      // Atualizar o estado local e o localStorage
      setCarrinho(carrinhoAtualizado);
      localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado));

      alert(`${produto.nome} foi adicionado ao carrinho`);
    }
  }

  return (
    <>
      <header className="site-header">
        <nav className="navigation">
          <ul>
            <li><a href="/">Home</a></li>
            <Link to="/cadastro-produto">Cadastro de Produto</Link>
            
          </ul>
        </nav>

        <div className="header-actions">
          <button className="login-button">Login</button>
        </div>
      </header>

      {/* Listagem de Produtos */}
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
                <button 
                  className="botao-comprar" 
                  onClick={() => adicionarAoCarrinho(produto)}
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            ))
          }
        </div>
      </div>

 

      <div>
        <button onClick={() => navigate("/cadastro-carrinho")}>Ver Carrinho ({carrinho.length})</button>
      </div>
      
      </>
  );
}

export default ProdutosCadastrados;

