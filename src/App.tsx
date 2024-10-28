import { useEffect, useState } from 'react';
import './App.css';

type ProdutoType = {
  id: number;
  nome: string;
  preco: string;
  descricao: string;
  imagem: string;
};

type UsuarioType = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([]);
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produtosResponse = await fetch("https://one022a-marketplace.onrender.com/produtos");
        const produtosData = await produtosResponse.json();
        setProdutos(produtosData);

        const usuariosResponse = await fetch("https://one022a-marketplace.onrender.com/usuarios");
        const usuariosData = await usuariosResponse.json();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
   
      <section className="produtos-container">
        <h1 className='titulo-produto'>Produtos</h1>
        <div className="produtos-list">
          {produtos.map(produto => (
            <div key={produto.id} className="produto-item">
              <h3 className="produto-nome">{produto.nome}</h3>
              <div className='container-imagem'>
                <img src={produto.imagem} alt={`Imagem de ${produto.nome}`} />
              </div>
              <p className="produto-preco">{produto.preco}</p>
              <p className="produto-descricao">{produto.descricao}</p>
              <button className="botao-comprar">Comprar</button>
            </div>
          ))}
        </div>
      </section>

      <section className="usuarios-container">
        <h1 className='titulo-usuario'>Usuários</h1>
        <div className="usuarios-list">
          {usuarios.map(usuario => (
            <div key={usuario.id} className="usuario-item">
              <h2 className="usuario-nome">{usuario.name}</h2>
              <p>Email: {usuario.email}</p>
              <p>Criado em: {new Date(usuario.created_at).toLocaleDateString()}</p>
              <p>Atualizado em: {new Date(usuario.updated_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
