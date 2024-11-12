import {  ChangeEvent, FormEvent, useState } from "react"

function CadastroProduto(){
    const [id,setId] = useState("")
    function handleForm(event:FormEvent){
        event.preventDefault()
        console.log("Cliquei em cadastrar")
        //Pegar os valores dos campos
        //Mandar pelo fetch para o Back-End
    }
    function handleId(event:ChangeEvent<HTMLInputElement>){
        setId(event.target.value)
    }
    return(
        <>
            <h1>Meu Componente de Cadastro de Produtos</h1>
            <form onSubmit={handleForm}>
                <div>
                    <input placeholder="Id" type="text" name="id" id="id" onChange={handleId} />
                </div>
                <div>
                    <input placeholder="Nome" type="text" name="nome" id="nome" />
                </div>
                <div>
                    <input placeholder="Descrição" type="text" name="descricao" id="descricao" />
                </div>
                <div>
                    <input placeholder="Preço" type="text" name="preco" id="preco" />
                </div>
                <div>
                    <input placeholder="URL Imagem" type="text" name="imagem" id="imagem" />
                </div>
                <input type="submit" value="Cadastrar" />
            </form>
        </>
    )
}

export default CadastroProduto