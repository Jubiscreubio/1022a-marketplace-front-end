import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './CadastroCarrinho.css'

// Define o tipo para o produto no carrinho
interface ProdutoCarrinho {
  produtoId: string;
  quantidade: string;
}

function CadastroCarrinho() {
  const navigate = useNavigate();

  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]); // Tipando o carrinho

  // Carregar carrinho do localStorage ao carregar o componente
  useEffect(() => {
    const carrinhoStorage = JSON.parse(localStorage.getItem("carrinho") || "[]");
    setCarrinho(carrinhoStorage);
  }, []);

  // Função para adicionar um produto ao carrinho
  async function handleForm(event: FormEvent) {
    event.preventDefault();
    try {
      const resposta = await fetch("http://localhost:8000/carrinho", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          produto_id: produtoId,
          quantidade: quantidade,
        }),
      });

      if (resposta.status === 201) {
        alert("Produto adicionado ao carrinho com sucesso!");
        // Atualiza o carrinho no localStorage e no estado
        const novoCarrinho = [...carrinho, { produtoId, quantidade }];
        localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
        setCarrinho(novoCarrinho);
        navigate("/");
      } else {
        const mensagem = await resposta.text();
        alert("Erro ao adicionar produto ao carrinho - Erro: " + mensagem);
      }
    } catch (e) {
      if (e instanceof Error) {
        alert("Erro no servidor: " + e.message);
      } else {
        alert("Servidor não está respondendo.");
      }
    }
  }

  // Funções para manipular os inputs do formulário
  function handleProdutoId(event: ChangeEvent<HTMLInputElement>) {
    setProdutoId(event.target.value);
  }

  function handleQuantidade(event: ChangeEvent<HTMLInputElement>) {
    setQuantidade(event.target.value);
  }

  return (
    <>
      <form onSubmit={handleForm}>
        <div>
          <input
            placeholder="ID do Produto"
            type="text"
            name="produtoId"
            id="produtoId"
            onChange={handleProdutoId}
          />
        </div>
        <div>
          <input
            placeholder="Quantidade"
            type="text"
            name="quantidade"
            id="quantidade"
            onChange={handleQuantidade}
          />
        </div>
        <input type="submit" value="Adicionar ao Carrinho" />
      </form>

</>
  );
}

export default CadastroCarrinho;