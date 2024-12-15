import { useEffect, useState } from "react";

// Definindo o tipo do produto
interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
}

// Definindo o tipo do produto no carrinho
interface ProdutoCarrinho {
  id: string;
  nome: string;
  preco: string;
  quantidade: number;
  imagem: string;
}

function CadastroCarrinho() {
  const [produtos, setProdutos] = useState<Produto[]>([]); // Produtos disponíveis
  const [carrinho, setCarrinho] = useState<ProdutoCarrinho[]>([]); // Carrinho de compras
  const [mensagem, setMensagem] = useState<string>(""); // Mensagem de sucesso ou erro

  // Carregar os produtos cadastrados do servidor
  useEffect(() => {
    async function fetchProdutos() {
      try {
        const resposta = await fetch("http://localhost:8000/produtos");
        
        if (resposta.ok) {
          const dados = await resposta.json();
          setProdutos(dados);
        } else {
          alert("Erro ao buscar produtos.");
        }
      } catch (e) {
        alert("Erro ao se comunicar com o servidor.");
      }
    }
    fetchProdutos();
  }, []);

  // Carregar o carrinho do localStorage
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  // Função para adicionar um produto ao carrinho
  function adicionarAoCarrinho(produto: Produto) {
    const produtoCarrinho: ProdutoCarrinho = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: 1, // Começar com quantidade 1
      imagem: produto.imagem,
    };

    const carrinhoExistente = [...carrinho];
    const produtoNoCarrinho = carrinhoExistente.find((item) => item.id === produto.id);

    if (produtoNoCarrinho) {
      // Se o produto já estiver no carrinho, aumentar a quantidade
      const novoCarrinho = carrinhoExistente.map((item) =>
        item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
      );
      setCarrinho(novoCarrinho);
      localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
      setMensagem(`Produto "${produto.nome}" adicionado ao carrinho!`); // Mensagem de sucesso
      window.alert(`Produto "${produto.nome}" adicionado ao carrinho!`); // Exibe a mensagem no pop-up
    } else {
      // Caso contrário, adicionar o novo produto
      const novoCarrinho = [...carrinhoExistente, produtoCarrinho];
      setCarrinho(novoCarrinho);
      localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
      setMensagem(`Produto "${produto.nome}" adicionado ao carrinho!`); // Mensagem de sucesso
      window.alert(`Produto "${produto.nome}" adicionado ao carrinho!`); // Exibe a mensagem no pop-up
    }

    // Limpar a mensagem após 3 segundos
    setTimeout(() => setMensagem(""), 3000);
  }

  // Função para remover um produto do carrinho
  function removerProdutoDoCarrinho(id: string) {
    const produtoRemovido = carrinho.find((item) => item.id === id);
    const novoCarrinho = carrinho.filter((item) => item.id !== id);
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));

    if (produtoRemovido) {
      setMensagem(`Produto "${produtoRemovido.nome}" removido do carrinho!`); // Mensagem de remoção
      window.alert(`Produto "${produtoRemovido.nome}" removido do carrinho!`); // Exibe a mensagem no pop-up
    }

    // Limpar a mensagem após 3 segundos
    setTimeout(() => setMensagem(""), 3000);
  }

  // Função para aumentar a quantidade de um produto no carrinho
  function aumentarQuantidade(id: string) {
    const novoCarrinho = carrinho.map((item) =>
      item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
    );
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  }

  // Função para diminuir a quantidade de um produto no carrinho
  function diminuirQuantidade(id: string) {
    const novoCarrinho = carrinho.map((item) =>
      item.id === id && item.quantidade > 1
        ? { ...item, quantidade: item.quantidade - 1 }
        : item
    );
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  }

  return (
    <div>
      <h1>Cadastro de Produtos no Carrinho</h1>

      {/* Exibição da mensagem de sucesso ou erro */}
      {mensagem && <div style={{ color: "green", fontWeight: "bold" }}>{mensagem}</div>}

      <div>
        <h2>Produtos Disponíveis</h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {produtos.map((produto) => (
            <div
              key={produto.id}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
                width: "200px",
              }}
            >
              <img
                src={produto.imagem}
                alt={produto.nome}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <h3>{produto.nome}</h3>
              <p>{produto.descricao}</p>
              <p>Preço: R${produto.preco}</p>
              <button onClick={() => adicionarAoCarrinho(produto)}>Adicionar ao Carrinho</button>
            </div>
          ))}
        </div>
      </div>

      <h2>Carrinho de Compras</h2>
      {carrinho.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          {carrinho.map((produto) => (
            <div
              key={produto.id}
              style={{
                border: "1px solid #ccc",
                margin: "10px",
                padding: "10px",
                width: "200px",
              }}
            >
              <img
                src={produto.imagem}
                alt={produto.nome}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <h3>{produto.nome}</h3>
              <p>Preço: R${produto.preco}</p>
              <p>Quantidade: {produto.quantidade}</p>
              <button onClick={() => diminuirQuantidade(produto.id)}>-</button>
              <button onClick={() => aumentarQuantidade(produto.id)}>+</button>
              <button onClick={() => removerProdutoDoCarrinho(produto.id)}>Remover</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CadastroCarrinho;
