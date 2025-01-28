import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from 'react-router-dom';

function CadastroProduto() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");

    async function handleForm(event: FormEvent) {
        event.preventDefault();

        // Validação de campos obrigatórios
        if (!id || !nome || !descricao || !preco || !imagem) {
            alert("Todos os campos precisam ser preenchidos.");
            return;
        }

        // Validação de preço
        const precoNumber = parseFloat(preco);
        if (isNaN(precoNumber)) {
            alert("Preço inválido.");
            return;
        }

        // Validação de URL de imagem (opcional, dependendo do formato que você quer aceitar)
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!urlRegex.test(imagem)) {
            alert("URL da imagem é inválida.");
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
                    preco: precoNumber, // Envia o valor numérico do preço
                    imagem: imagem,
                }),
            });

            // Verifica se a resposta foi bem-sucedida
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

    // Handlers de input
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
            <h1>Meu Componente de Cadastro de Produtos</h1>
            <form onSubmit={handleForm}>
                <div>
                    <input placeholder="Id" type="text" name="id" id="id" onChange={handleId} />
                </div>
                <div>
                    <input placeholder="Nome" type="text" name="nome" id="nome" onChange={handleNome} />
                </div>
                <div>
                    <input placeholder="Descrição" type="text" name="descricao" id="descricao" onChange={handleDescricao} />
                </div>
                <div>
                    <input placeholder="Preço" type="number" name="preco" id="preco" onChange={handlePreco} />
                </div>
                <div>
                    <input placeholder="URL Imagem" type="text" name="imagem" id="imagem" onChange={handleImagem} />
                </div>
                <input type="submit" value="Cadastrar" />
            </form>
        </>
    );
}

export default CadastroProduto;
