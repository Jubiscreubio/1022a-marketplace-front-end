import { useState } from 'react';
import './App.css';


// Tipo para produtos
type ProdutoType = {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  imagem: string;
};

// Tipo para usuários
type UsuarioType = {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};

function App() {
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([]); // Corrigido o tipo do estado
  const [livros, setLivros] = useState<ProdutoType[]>([]); // Corrigido o tipo do estado

  const adicionarUsuario = () => {
    const novoUsuario: UsuarioType = {
      id: usuarios.length + 1,
      name: `Usuário ${usuarios.length + 1}`,
      email: `usuario${usuarios.length + 1}@exemplo.com`,
      created_at: new Date(),
      updated_at: new Date(),
    };
    setUsuarios([...usuarios, novoUsuario]);
  };

  const adicionarLivro = () => {
    const novoLivro: ProdutoType = {
      id: livros.length + 1,
      nome: `Livro ${livros.length + 1}`,
      imagem: 'https://via.placeholder.com/150',
      preco: `R$ ${(10 + livros.length * 5).toFixed(2)}`,
      descricao: `Descrição do livro ${livros.length + 1}`,
    };
    setLivros([...livros, novoLivro]);
  };

  return (
    <>
      <header className="site-header">
        <nav className="navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#produtos">Livros</a></li>
            <li><a href="#usuarios">Usuários</a></li>
          </ul>
        </nav>

          <div className="header-actions">
          <header className="site-header">
  <nav className="navigation">
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#produtos">Livros</a></li>
      <li><a href="#usuarios">Usuários</a></li>
    </ul>
  </nav>

  <div className="header-actions">
    <button
      className="login-button"
      onClick={() => {
        window.location.href = "/login.html"; // Caminho para o documento login.html
      }}
    >
      Login
    </button>
  </div>
</header>

        </div>
      </header>

      {/* Cadastrar Usuários */}
      <div id="usuarios" className="usuarios-container">
        <h1 className="titulo-usuario">Usuários</h1>
        <button onClick={adicionarUsuario} className="botao-cadastrar">Cadastrar Usuário</button>
        <div className="usuarios-list">
          {usuarios.map(usuario => (
            <div key={usuario.id} className="usuario-item">
              <h3 className="usuario-nome">{usuario.name}</h3>
              <p>Email: {usuario.email}</p>
              <p>Criado em: {usuario.created_at.toLocaleDateString()}</p>
              <p>Atualizado em: {usuario.updated_at.toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cadastrar Produtos */}
      <div id="produtos" className="produtos-container">
        <h1 className="titulo-produto">Livros</h1>
        <button onClick={adicionarLivro} className="botao-cadastrar">Cadastrar Livro</button>
        <div className="produtos-list">
          {livros.map(livro => (
            <div key={livro.id} className="produto-item">
              <h3 className="produto-nome">{livro.nome}</h3>
              <div className="container-imagem">
                <img src={livro.imagem} alt={`Imagem do ${livro.nome}`} />
              </div>
              <p className="produto-preco">{livro.preco}</p>
              <p className="produto-descricao">{livro.descricao}</p>
              <button className="botao-comprar">Comprar</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
