import { useParams, useNavigate } from "react-router-dom";
import { FormEvent, useState, useEffect } from "react";

function AlterarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState("");
    const [detalhes, setDetalhes] = useState("");
    const [valor, setValor] = useState("");
    const [foto, setFoto] = useState("");
    const [categoria, setCategoria] = useState("");
    const [estoque, setEstoque] = useState("");

    useEffect(() => {
        async function fetchProduto() {
            if (!id) return; // Se id for undefined, não faz a requisição

            try {
                const resposta = await fetch(`https://one022a-marketplace.onrender.com/produtos/${id}`);
                if (!resposta.ok) throw new Error("Erro ao buscar o produto");

                const dados = await resposta.json();

                if (dados) {
                    setTitulo(dados.titulo || "");
                    setDetalhes(dados.detalhes || "");
                    setValor(dados.valor ? String(dados.valor) : "");
                    setFoto(dados.foto || "");
                    setCategoria(dados.categoria || "");
                    setEstoque(dados.estoque ? String(dados.estoque) : "");
                }
            } catch (error) {
                console.error("Erro ao carregar o produto:", error);
                alert("Erro ao carregar o produto.");
            }
        }

        fetchProduto();
    }, [id]);

    async function handleForm(event: FormEvent) {
        event.preventDefault();

        if (!titulo || !detalhes || !valor || !foto || !categoria || !estoque) {
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
            const resposta = await fetch(`https://one022a-marketplace.onrender.com/produtos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    titulo,
                    detalhes,
                    valor: valorNumber,
                    foto,
                    categoria,
                    estoque: estoqueNumber
                })
            });

            if (resposta.ok) {
                alert("Produto Alterado com Sucesso");
                navigate("/");
            } else {
                const mensagem = await resposta.text();
                alert("Erro ao Alterar Produto - Error: " + mensagem);
            }
        } catch (e) {
            alert("Servidor não está respondendo.");
        }
    }

    return (
        <>
            <h1>Alterar Produto</h1>
            <form onSubmit={handleForm}>
                <div>
                    <input placeholder="Título" type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                </div>
                <div>
                    <input placeholder="Detalhes" type="text" value={detalhes} onChange={(e) => setDetalhes(e.target.value)} />
                </div>
                <div>
                    <input placeholder="Valor" type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
                </div>
                <div>
                    <input placeholder="URL Foto" type="text" value={foto} onChange={(e) => setFoto(e.target.value)} />
                </div>
                <div>
                    <input placeholder="Categoria" type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                </div>
                <div>
                    <input placeholder="Estoque" type="number" value={estoque} onChange={(e) => setEstoque(e.target.value)} />
                </div>
                <div>
                    <input type="submit" value="Alterar" />
                </div>
            </form>
        </>
    );
}

<<<<<<< HEAD
export default AlterarProduto;
=======
export default AlterarProduto;
>>>>>>> 266d08c75ba206584ffe549d09f8c0df848ce699
