import { useEffect, useState } from 'react'

import './App.css'


type ProdutoType = {
  id: number,
  name: string,
  preco: string,
  descricao: string,
  imagem: string
}

type UsuarioType = {
  id: number,
  name: string,
  email: string,
  created_at:string,
  updated_at:string,
}

function App() {
  const [nome,setNome] = useState("")
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  const [usuarios, setUsuarios] = useState<UsuarioType[]>([])


  useEffect(() => {
    setNome("Zezio")

    // Buscar os dados de produtos do Backend
    fetch("https://one022a-marketplace.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados))

    // Buscar os dados de usuários do Backend
    fetch("https://one022a-marketplace.onrender.com/usuarios")
      .then(resposta => resposta.json())
      .then(dados => setUsuarios(dados))
  }, [])


  const addUser = () => {
    const newUser: UsuarioType = {
        id: 1,
        name: `Usuário ${1}`,
        email: `usuario${1}@email.com`,
        created_at: new Date().toLocaleDateString(),
        updated_at: new Date().toLocaleDateString(),
    };

    setUsuarios([...usuarios, newUser]);
   
};


    return (
    <>
    


      
      <div className="produtos-container">
        <h2>Lista de Produtos</h2>
        {
          produtos.map(produto => {
            return (
              <div key={produto.id} className="produto-item">
                <h1>{produto.name}</h1>
                <div className='container-imagem'>
                  <img src={produto.imagem} alt={produto.name} />
                </div>
                <p>{produto.preco}</p>
                <p>{produto.descricao}</p>
                
              </div>
            )
          })
        }
      </div>

   
      <div>
            <h2>Cadastro de Usuários</h2>
            <button onClick={addUser}>Adicionar Usuário</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOME</th>
                        <th>EMAIL</th>
                        <th>Data de Criação</th>
                        <th>Data de Atualização</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.created_at}</td>
                            <td>{user.updated_at}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
</>
  )
}

export default App