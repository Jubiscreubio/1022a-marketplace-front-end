import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

// Definindo uma interface para o tipo do produto
interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
}

function CadastroProduto() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");

  // Função para adicionar o produto ao carrinho
  function addToCart(product: Produto) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  async function handleForm(event: FormEvent) {
    event.preventDefault();

    // Validando preço
    const precoFormatado = parseFloat(preco);
    if (isNaN(precoFormatado)) {
      alert("O preço deve ser um número válido.");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:8000/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          nome: nome,
          descricao: descricao,
          preco: precoFormatado,
          imagem: imagem,
        }),
      });

      if (!resposta.ok) {
        const mensagem = await resposta.text();
        alert("Erro ao cadastrar produto - Erro: " + mensagem);
      } else {
        alert("Produto cadastrado com sucesso!");

        // Produto cadastrado com sucesso, agora adiciona ao carrinho
        const produto: Produto = {
          id,
          nome,
          descricao,
          preco: precoFormatado,
          imagem,
        };
        addToCart(produto);

        // Redireciona para a página inicial
        navigate("/");
      }
    } catch (e) {
      alert("Servidor não está respondendo.");
    }
  }

  function handleId(event: ChangeEvent<HTMLInputElement>) {
    setId(event.target.value);
  }

  function handleNome(event: ChangeEvent<HTMLInputElement>) {
    setNome(event.target.value);
  }

  function handleDescricao(event: ChangeEvent<HTMLInputElement>) {
    setDescricao(event.target.value);
  }

  function handlePreco(event: ChangeEvent<HTMLInputElement>) {
    setPreco(event.target.value);
  }
  
  function handleImagem(event: ChangeEvent<HTMLInputElement>) {
    setImagem(event.target.value);
  }

  return (
    <>
      <h1>Cadastro de Produtos</h1>
      <form onSubmit={handleForm}>
        <div>
          <input
            placeholder="Id"
            type="text"
            name="id"
            id="id"
            value={id}
            onChange={handleId}
          />
        </div>
        <div>
          <input
            placeholder="Nome"
            type="text"
            name="nome"
            id="nome"
            value={nome}
            onChange={handleNome}
          />
        </div>
        <div>
          <input
            placeholder="Descrição"
            type="text"
            name="descricao"
            id="descricao"
            value={descricao}
            onChange={handleDescricao}
          />
        </div>
        <div>
          <input
            placeholder="Preço"
            type="text"
            name="preco"
            id="preco"
            value={preco}
            onChange={handlePreco}
          />
        </div>
        <div>
          <input
            placeholder="URL Imagem"
            type="text"
            name="imagem"
            id="imagem"
            value={imagem}
            onChange={handleImagem}
          />
        </div>
        <input type="submit" value="Cadastrar" />
      </form>
    </>
  );
}

export default CadastroProduto;
