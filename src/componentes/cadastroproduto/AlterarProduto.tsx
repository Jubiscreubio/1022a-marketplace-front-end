import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";

function EditarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [produto, setProduto] = useState({
        titulo: "",
        detalhes: "",
        valor: "",
        foto: "",
        categoria: "",
        estoque: ""
    });

    useEffect(() => {
        async function fetchProduto() {
            if (!id) return;
            try {
                const resposta = await fetch(`https://one022a-marketplace.onrender.com/produtos/${id}`);
                if (!resposta.ok) throw new Error("Erro ao buscar o produto");
                
                const dados = await resposta.json();
                setProduto({
                    titulo: dados.titulo || "",
                    detalhes: dados.detalhes || "",
                    valor: dados.valor ? String(dados.valor) : "",
                    foto: dados.foto || "",
                    categoria: dados.categoria || "",
                    estoque: dados.estoque ? String(dados.estoque) : ""
                });
            } catch (error) {
                console.error("Erro ao carregar o produto:", error);
                alert("Erro ao carregar o produto.");
            }
        }
        fetchProduto();
    }, [id]);

    function handleChange(event) {
        const { name, value } = event.target;
        setProduto(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { titulo, detalhes, valor, foto, categoria, estoque } = produto;
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
                headers: { "Content-Type": "application/json" },
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
                alert("Produto alterado com sucesso");
                navigate("/");
            } else {
                const mensagem = await resposta.text();
                alert("Erro ao alterar produto - Error: " + mensagem);
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor.");
        }
    }

    return (
        <>
            <h1>Editar Produto</h1>
            <form onSubmit={handleSubmit}>
                <input name="titulo" placeholder="Título" type="text" value={produto.titulo} onChange={handleChange} />
                <input name="detalhes" placeholder="Detalhes" type="text" value={produto.detalhes} onChange={handleChange} />
                <input name="valor" placeholder="Valor" type="number" value={produto.valor} onChange={handleChange} />
                <input name="foto" placeholder="URL Foto" type="text" value={produto.foto} onChange={handleChange} />
                <input name="categoria" placeholder="Categoria" type="text" value={produto.categoria} onChange={handleChange} />
                <input name="estoque" placeholder="Estoque" type="number" value={produto.estoque} onChange={handleChange} />
                <button type="submit">Salvar Alterações</button>
            </form>
        </>
    );
}

export default EditarProduto;