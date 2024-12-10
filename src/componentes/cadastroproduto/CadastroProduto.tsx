import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastroProduto.css";

function CadastroProduto() {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");
    const [categoria, setCategoria] = useState(""); // Estado para armazenar a categoria selecionada
    const [categorias, setCategorias] = useState<string[]>([]); // Lista de categorias

    // Função para buscar as categorias cadastradas no backend (ou pode ser um mock)
    useEffect(() => {
        async function fetchCategorias() {
            try {
                const resposta = await fetch("http://localhost:8000/categorias"); // Ajuste para o endpoint de categorias
                if (resposta.ok) {
                    const data = await resposta.json();
                    setCategorias(data); // Supondo que a resposta seja uma lista de categorias
                }
            } catch (e) {
                console.error("Erro ao buscar categorias:", e);
            }
        }
        fetchCategorias();
    }, []);

    // Função que retorna a classe CSS para cada categoria
    function getCategoriaClass(categoria: string) {
        switch (categoria) {
            case "Sopro":
                return "categoria-sopro";
            case "Corda":
                return "categoria-corda";
            case "Percussão":
                return "categoria-percussao";
            default:
                return "";
        }
    }

    async function handleForm(event: FormEvent) {
        event.preventDefault();
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
                    preco: preco,
                    imagem: imagem,
                    categoria: categoria, // Envia a categoria junto com os dados do produto
                }),
            });
            if (resposta.status !== 500) {
                alert("Produto cadastrado com sucesso!");
                navigate("/");
            } else {
                const mensagem = await resposta.text();
                alert("Erro ao cadastrar produto - Error: " + mensagem);
            }
        } catch (e) {
            if (e instanceof Error) {
                alert("Erro no servidor: " + e.message);
            } else {
                alert("Servidor não está respondendo.");
            }
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

    function handleCategoria(event: ChangeEvent<HTMLSelectElement>) {
        setCategoria(event.target.value); // Atualiza a categoria selecionada
    }

    return (
        <>
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
                    <input placeholder="Preço" type="text" name="preco" id="preco" onChange={handlePreco} />
                </div>
                <div>
                    <input placeholder="URL Imagem" type="text" name="imagem" id="imagem" onChange={handleImagem} />
                </div>
                <div>
                    {/* Campo de seleção de categoria */}
                    <select value={categoria} onChange={handleCategoria}>
                        <option value="">Selecione a Categoria</option>
                        {/* Opções fixas */}
                        <option value="Sopro">Sopro</option>
                        <option value="Corda">Corda</option>
                        <option value="Percussão">Percussão</option>
                        {/* Opções carregadas do backend */}
                        {categorias.map((cat, index) => (
                            <option key={index} value={cat} className={getCategoriaClass(cat)}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <input type="submit" value="Cadastrar" />
            </form>

        </>
    );
}

export default CadastroProduto;
