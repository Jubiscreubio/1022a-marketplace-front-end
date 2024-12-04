import { useEffect, useState } from 'react'
import './App.css'
import { Link, useNavigate } from 'react-router-dom'

// Tipo para produtos
type ProdutoType = {
  id: number,
  nome: string,
  preco: string,
  descricao: string,
  imagem: string
}

// Tipo para usuários
type UsuariosType = {
  id: number,
  name: string,
  email: string,
  created_at: string,
  updated_at: string
}

// Tipo para carrinho
type CarrinhoType = {
  id: number,
  name: string,
  descricao: string,
  imagem: string
}

function ProdutosCadastrados() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [usuarios, setUsuarios] = useState<UsuariosType[]>([]);
  const [carrinho, setCarrinho] = useState<CarrinhoType[]>([]);

  useEffect(() => {
    // Buscar os produtos
    fetch("https://one022a-marketplace.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados))

    // Buscar os usuários
    fetch("https://one022a-marketplace.onrender.com/usuarios")
      .then(resposta => resposta.json())
      .then(dados => setUsuarios(dados))

    // Buscar os itens no carrinho
    fetch("https://one022a-marketplace.onrender.com/carrinho")
      .then(resposta => resposta.json())
      .then(dados => setCarrinho(dados))
  }, [])

  // Função para adicionar um produto ao carrinho
  function adicionarAoCarrinho(produto: ProdutoType) {
    const carrinhoAtualizado = JSON.parse(localStorage.getItem("carrinho") || "[]");
    carrinhoAtualizado.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado));

    alert(`${produto.nome} foi adicionado ao carrinho`);
  }

  return (
    <>
      <header className="site-header">
        <nav className="navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#produtos">Produtos</a></li>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#contato">Contato</a></li>
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

      {/* Listagem de Usuários */}
      <div className="usuarios-container">
        <h1 className='titulo-usuario'>Usuários</h1>
        <div className="usuarios-list">
          {
            usuarios.map(usuario => (
              <div key={usuario.id} className="usuario-item">
                <h1 className="usuario-nome">{usuario.name}</h1>
                <p>Email: {usuario.email}</p>
                <p>Criado em: {new Date(usuario.created_at).toLocaleDateString()}</p>
                <p>Atualizado em: {new Date(usuario.updated_at).toLocaleDateString()}</p>
              </div>
            ))
          }
        </div>
      </div>

      {/* Botão para acessar o carrinho */}
      <div>
        <button onClick={() => navigate("/carrinho")}>Ver Carrinho</button>
      </div>
    </>
  );
}

export default ProdutosCadastrados;
