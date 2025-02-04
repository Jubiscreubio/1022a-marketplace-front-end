import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from 'react-router-dom';


function CadastroProduto() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [titulo, setTitulo] = useState("");
    const [detalhes, setDetalhes] = useState("");
    const [valor, setValor] = useState("");
    const [foto, setFoto] = useState("");
    const [categoria, setCategoria] = useState("");
    const [estoque, setEstoque] = useState("");

    async function handleForm(event: FormEvent) {
        event.preventDefault();

        if (!id || !titulo || !detalhes || !valor || !foto || !categoria || !estoque) {
            alert("Todos os campos precisam ser preenchidos.");
            return;
        }

        const valorNumber = parseFloat(valor);
        if (isNaN(valorNumber)) {
            alert("Valor inválido.");
            return;
        }

        const estoqueNumber = parseInt(estoque);
        if (isNaN(estoqueNumber)) {
            alert("Estoque inválido.");
            return;
        }

        const urlRegex = /^(ftp|http|https):\/\/[^ "']+$/;
        if (!urlRegex.test(foto)) {
            alert("URL da foto é inválida.");
            return;
        }

        try {
            const resposta = await fetch("https://one022a-marketplace.onrender.com/produtos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    codigo: id,
                    titulo: titulo,
                    detalhes: detalhes,
                    valor: valorNumber,
                    foto: foto,
                    categoria: categoria,
                    estoque: estoqueNumber
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

    function handleCodigo(event: ChangeEvent<HTMLInputElement>) {
        setId(event.target.value);
    }
    function handleTitulo(event: ChangeEvent<HTMLInputElement>) {
        setTitulo(event.target.value);
    }
    function handleDetalhes(event: ChangeEvent<HTMLInputElement>) {
        setDetalhes(event.target.value);
    }
    function handleValor(event: ChangeEvent<HTMLInputElement>) {
        setValor(event.target.value);
    }
    function handleFoto(event: ChangeEvent<HTMLInputElement>) {
        setFoto(event.target.value);
    }
    function handleCategoria(event: ChangeEvent<HTMLInputElement>) {
        setCategoria(event.target.value);
    }
    function handleEstoque(event: ChangeEvent<HTMLInputElement>) {
        setEstoque(event.target.value);
    }

    return (
        <>
            <h1>Meu Componente de Cadastro de Produtos</h1>
            <form onSubmit={handleForm}>
                <div>
                    <input placeholder="Código" type="text" name="codigo" id="codigo" onChange={handleCodigo} />
                </div>
                <div>
                    <input placeholder="Título" type="text" name="titulo" id="titulo" onChange={handleTitulo} />
                </div>
                <div>
                    <input placeholder="Detalhes" type="text" name="detalhes" id="detalhes" onChange={handleDetalhes} />
                </div>
                <div>
                    <input placeholder="Valor" type="number" name="valor" id="valor" onChange={handleValor} />
                </div>
                <div>
                    <input placeholder="URL Foto" type="text" name="foto" id="foto" onChange={handleFoto} />
                </div>
                <div>
                    <input placeholder="Categoria" type="text" name="categoria" id="categoria" onChange={handleCategoria} />
                </div>
                <div>
                    <input placeholder="Estoque" type="number" name="estoque" id="estoque" onChange={handleEstoque} />
                </div>
                <input type="submit" value="Cadastrar" />
            </form>
        </>
    );
}

export default CadastroProduto;
