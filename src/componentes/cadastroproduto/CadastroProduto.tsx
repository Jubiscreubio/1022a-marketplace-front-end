import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';

function CadastroProduto() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");
    const [categoria, setCategoria] = useState("");
    const [estoque, setEstoque] = useState("");

    async function handleForm(event: FormEvent) {
        event.preventDefault();

        if (!id || !nome || !descricao || !preco || !imagem || !categoria || !estoque) {
            alert("Todos os campos precisam ser preenchidos.");
            return;
        }

        const precoNumber = parseFloat(preco);
        if (isNaN(precoNumber)) {
            alert("Preço inválido.");
            return;
        }

        const estoqueNumber = parseInt(estoque);
        if (isNaN(estoqueNumber) || estoqueNumber < 0) {
            alert("Estoque inválido.");
            return;
        }

        const urlRegex = /^(ftp|http|https):\/\/[^ "']+$/;
        if (!urlRegex.test(imagem)) {
            alert("URL da imagem é inválida.");
            return;
        }

        try {
            const resposta = await fetch("https://one022a-marketplace.onrender.com/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    nome,
                    descricao,
                    preco: precoNumber,
                    imagem,
                    categoria,
                    estoque: estoqueNumber,
                }),
            });

            if (resposta.ok) {
                alert("Produto Cadastrado com Sucesso");
                navigate("/");
            } else {
                const mensagem = await resposta.text();
                alert("Erro ao Cadastrar Produto - Error: " + mensagem);
            }
        } catch (e) {
            alert("Servidor não está respondendo.");
        }
    }

    return (
        <>
            <h1>Cadastro de Produtos</h1>
            <form onSubmit={handleForm}>
                <div>
                    <input placeholder="Id" type="text" onChange={(e) => setId(e.target.value)} />
                </div>
                <div>
                    <input placeholder="Nome" type="text" onChange={(e) => setNome(e.target.value)} />
                </div>
                <div>
                    <input placeholder="Descrição" type="text" onChange={(e) => setDescricao(e.target.value)} />
                </div>
                <div>
                    <input placeholder="Preço" type="number" onChange={(e) => setPreco(e.target.value)} />
                </div>
                <div>
                    <input placeholder="URL da Imagem" type="text" onChange={(e) => setImagem(e.target.value)} />
                </div>
                <div>
                    <input placeholder="Categoria" type="text" onChange={(e) => setCategoria(e.target.value)} />
                </div>
                <div>
                    <input placeholder="Estoque" type="number" onChange={(e) => setEstoque(e.target.value)} />
                </div>
                <input type="submit" value="Cadastrar" />
            </form>
        </>
    );
}

export default CadastroProduto;
