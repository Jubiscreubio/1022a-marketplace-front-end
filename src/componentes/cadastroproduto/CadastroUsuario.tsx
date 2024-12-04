import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function CadastroUsuario() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  async function handleForm(event: FormEvent) {
    event.preventDefault();
    try {
      const resposta = await fetch("http://localhost:8000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          email: email,
          senha: senha,
          data_nascimento: dataNascimento,
        }),
      });

      if (resposta.status !== 500) {
        alert("Usuário cadastrado com sucesso!");
        navigate("/"); // Redireciona para a página inicial após o cadastro
      } else {
        const mensagem = await resposta.text();
        alert("Erro ao cadastrar usuário - Erro: " + mensagem);
      }
    } catch (e) {
      alert("Servidor não está respondendo.");
    }
  }

  // Funções para manipulação de inputs
  function handleNome(event: ChangeEvent<HTMLInputElement>) {
    setNome(event.target.value);
  }

  function handleEmail(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  function handleSenha(event: ChangeEvent<HTMLInputElement>) {
    setSenha(event.target.value);
  }

  function handleDataNascimento(event: ChangeEvent<HTMLInputElement>) {
    setDataNascimento(event.target.value);
  }

  return (
    <>
      <h1>Cadastro de Usuário</h1>
      <form onSubmit={handleForm}>
        <div>
          <input
            placeholder="Nome"
            type="text"
            name="nome"
            id="nome"
            onChange={handleNome}
          />
        </div>
        <div>
          <input
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            onChange={handleEmail}
          />
        </div>
        <div>
          <input
            placeholder="Senha"
            type="password"
            name="senha"
            id="senha"
            onChange={handleSenha}
          />
        </div>
        <div>
          <input
            placeholder="Data de Nascimento"
            type="date"
            name="dataNascimento"
            id="dataNascimento"
            onChange={handleDataNascimento}
          />
        </div>
        <input type="submit" value="Cadastrar" />
      </form>
    </>
  );
}

export default CadastroUsuario;
