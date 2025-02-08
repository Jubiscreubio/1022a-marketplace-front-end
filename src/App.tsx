import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import './App.css'

type ProdutoType = {
  id: number,
  nome: string,
  descricao: string,
  imagem: string
}

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])

  useEffect(() => {
    fetch("https://one022a-marketplace-yvb4.onrender.com/produtos")
      .then(resposta => resposta.json())
      .then(dados => setProdutos(dados))
  }, [])

  function handleExcluir(id: number) {
    fetch(`https://one022a-marketplace-yvb4.onrender.com/produtos/${id}`, {
      method: "DELETE"
    })
      .then(resposta => {
        if (resposta.status == 200) {
          alert("Excluído com sucesso")
          window.location.reload()
        }
        else {
          alert("Erro ao excluir")
        }
      })
  }

  return (
    <>
      <main className="container-produtos">
        {produtos.map(exe => {
          return (
            <div key={exe.id} className="produto-item">
              <h1>{exe.nome}</h1>
              <img src={exe.imagem} alt="SEM IMAGEM" />
              <p>{exe.descricao}</p>
              <button onClick={() => { handleExcluir(exe.id) }}>Excluir</button>
              <Link to={`/alterar-produto/${exe.id}`}>Alterar</Link>
            </div>
          )
        })}
      </main>
    </>
  )
}

export default App
