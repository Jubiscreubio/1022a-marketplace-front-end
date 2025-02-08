import { useParams } from "react-router-dom";
import { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AlterarProduto() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [descricao, setDescricao] = useState("");
    const [nome, setNome] = useState("");
    const [imagem, setImagem] = useState("");
    const [genero, setGenero] = useState("");
    const [tipoInstrumento, setTipoInstrumento] = useState("");

    useEffect(() => {
        fetch(`https://one022a-marketplace.onrender.com/produtos/${id}`)
            .then(resposta => resposta.json())
            .then(dados => {
                setDescricao(dados.descricao);
                setNome(dados.nome);
                setImagem(dados.imagem);
                setGenero(dados.genero || "");
                setTipoInstrumento(dados.tipoInstrumento || "");
            });
    }, [id]);

    function handleForm(event: FormEvent) {
        event.preventDefault();

        const produto = {
            nome,
            descricao,
            imagem,
            genero,
            tipoInstrumento
        };

        fetch(`https://one022a-marketplace.onrender.com/produtos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(produto)
        }).then(response => {
            if (response.status === 200) {
                alert("Produto alterado com sucesso");
                navigate("/");
            } else {
                alert("Erro ao alterar produto");
            }
        });
    }

    return (
        <>
            <main>
                <div>Alterar Produto {id}</div>
                <form onSubmit={handleForm}>
                    <div>
                        <label htmlFor="nome">Nome</label>
                        <input type="text" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="descricao">Descrição</label>
                        <input type="text" name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="imagem">Imagem</label>
                        <input type="text" name="imagem" value={imagem} onChange={(e) => setImagem(e.target.value)} />
                        {imagem && <img className="imagem-previa-upload" src={imagem} alt="Prévia da imagem" />}
                    </div>
                    <div>
                        <label htmlFor="genero">Gênero</label>
                        <select name="genero" value={genero} onChange={(e) => setGenero(e.target.value)}>
                            <option value="">Selecione um gênero</option>
                            <option value="Cordas">Cordas</option>
                            <option value="Percussão">Percussão</option>
                            <option value="Sopro">Sopro</option>
                            <option value="Teclas">Teclas</option>
                            <option value="Eletrônico">Eletrônico</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="tipoInstrumento">Tipo de Instrumento</label>
                        <select name="tipoInstrumento" value={tipoInstrumento} onChange={(e) => setTipoInstrumento(e.target.value)}>
                            <option value="Violão">Violão</option>
                            <option value="Guitarra">Guitarra</option>
                            <option value="Bateria">Bateria</option>
                            <option value="Teclado">Teclado</option>
                            <option value="Saxofone">Saxofone</option>
                        </select>
                    </div>
                    <div>
                        <input type="submit" value="Cadastrar" />
                    </div>
                </form>
            </main>
        </>
    );
}

export default AlterarProduto;
