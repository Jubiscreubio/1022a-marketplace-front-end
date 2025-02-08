import { useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function AlterarProduto(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");
    const [categoria, setCategoria] = useState("");
    const [estoque, setEstoque] = useState("");

    useEffect(() => {
        fetch(`https://one022a-marketplace.onrender.com/produtos/${id}`)
        .then(resposta => resposta.json())
        .then(dados => {
            setNome(dados.nome);
            setDescricao(dados.descricao);
            setPreco(dados.preco);
            setImagem(dados.imagem);
            setCategoria(dados.categoria);
            setEstoque(dados.estoque);
        });
    }, [id]);

    async function handleForm(event: FormEvent){
        event.preventDefault();
        try {
            const resposta = await fetch(`https://one022a-marketplace.onrender.com/produtos/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome,
                    descricao,
                    preco,
                    imagem,
                    categoria,
                    estoque
                })
            });
            if (resposta.status !== 500) {
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
                    <label htmlFor="id">Id</label>
                    <input placeholder="Id" type="text" name="id" id="id" value={id} readOnly />
                </div>
                <div>
                    <label htmlFor="nome">Nome</label>
                    <input placeholder="Nome" type="text" name="nome" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="descricao">Descrição</label>
                    <input placeholder="Descrição" type="text" name="descricao" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="preco">Preço</label>
                    <input placeholder="Preço" type="text" name="preco" id="preco" value={preco} onChange={(e) => setPreco(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="imagem">URL Imagem</label>
                    <input placeholder="URL Imagem" type="text" name="imagem" id="imagem" value={imagem} onChange={(e) => setImagem(e.target.value)} />
                    {imagem && <img className="imagem-produto-reduzida" src={imagem} alt="Imagem do Produto" />}
                </div>
                <div>
                    <label htmlFor="categoria">Categoria</label>
                    <input placeholder="Categoria" type="text" name="categoria" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="estoque">Estoque</label>
                    <input placeholder="Estoque" type="number" name="estoque" id="estoque" value={estoque} onChange={(e) => setEstoque(e.target.value)} />
                </div>
                <div>
                    <input type="submit" value="Alterar" />
                </div>
            </form>
        </>
    );
}

export default AlterarProduto;
