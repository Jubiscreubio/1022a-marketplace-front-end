import { useEffect, useState } from 'react'
import './App.css'
type ProdutoType = {
    id:number,
    nome:string,
    preco:string,
    descricao:string,
    imagem:string
}

type UsuarioType = {
  id: number,
  nome: string,
  name: string,
  email: string,
  created_at:number,
  updated_at:number
}

function App() {
  const [nome, setNome] = useState("")
  const [produtos, setProdutos] = useState<ProdutoType []>([])
  const [usuarios, setUsuarios] = useState<UsuarioType []>([])
  //useEffects(O que fazer, quando Fazer) []=> Hora do carregamento da página
  useEffect(() => {
    setNome("Guilherme Terenciani")
    //Buscar os dados do BackENd
    fetch("https://one022a-marketplace.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados))
      fetch("https://one022a-marketplace.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setUsuarios(dados))
    //Colocar em uma variável
  }, [])

  return (
    <>
      <h1>{nome}</h1>
      <div className="produtos-container">
        {
          produtos.map(produto => {
            return (
              <div key={produto.id} className="produto-item">
                <h1>{produto.nome}</h1>
                <div className='container-imagem'>
                  <img src={produto.imagem} alt="Imagem do celular" />
                </div>
                <p>{produto.preco}</p>
                <p>{produto.descricao}</p>
              </div>
            )
          })
        }

      </div>



      <div className="usuarios-container">
            {
                usuarios.map(usuario => {
                    return (
                        <div key={usuario.id} className="usuario-item">
                            <h1>{usuario.nome}</h1>
                            <p>Id: {usuario.id}</p>
                            <p>Nome: {usuario.nome}</p>
                            <p>Email: {usuario.email}</p>
                            <p>Data de Cadastro: {usuario.created_at}</p>
                            <p>Data de Vencimento: {usuario.updated_at}</p>
                        </div>
                    );
                })
            }
        </div>
        </>
  )
}

export default App