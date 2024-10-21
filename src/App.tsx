import { useEffect, useState } from 'react'
import './App.css'

type ProdutoType = {
  id: number,
  nome: string,
  preco: string,
  descricao: string,
  imagem: string
}

type UsuarioType = {
  id: number,
  nome: string,
  email: string,
  created_at:number,
  updated_at:number,
}

function App() {
  const [nome, setNome] = useState("")
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([])

  useEffect(() => {
    setNome("André")

    // Buscar os dados de produtos do Backend
    fetch("https://one022a-marketplace.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados))

    // Buscar os dados de usuários do Backend
    fetch("https://one022a-marketplace.onrender.com/usuarios")
      .then(resposta => resposta.json())
      .then(dados => setUsuarios(dados))
  }, [])

  return (
    <>
      <h1>{nome}</h1>
      
      <div className="produtos-container">
        <h2>Lista de Produtos</h2>
        {
          produtos.map(produto => {
            return (
              <div key={produto.id} className="produto-item">
                <h1>{produto.nome}</h1>
                <div className='container-imagem'>
                  <img src={produto.imagem} alt={produto.nome} />
                </div>
                <p>{produto.preco}</p>
                <p>{produto.descricao}</p>
                
              </div>
            )
          })
        }
      </div>

      <div className="usuarios-container">
        <h2>Lista de Usuários</h2>
        {
          usuarios.map(usuario => {
            return (
              <div key={usuario.id} className="usuario-item">
                <h3>{usuario.nome}</h3>
                <p>{usuario.email}</p>
                <h3>{usuario.created_at}</h3>
                <p>{usuario. updated_at}</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default App