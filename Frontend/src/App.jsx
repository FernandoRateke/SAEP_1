import { useEffect, useState } from "react";

const API = "http://localhost:3000/usuarios";

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  async function carregar() {
    const res = await fetch(API);
    setUsuarios(await res.json());
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvar(e) {
    e.preventDefault();
    await fetch(editandoId ? `${API}/${editandoId}` : API, {
      method: editandoId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, idade }),
    });
    setNome("");
    setIdade("");
    setEditandoId(null);
    carregar();
  }

  function editar(usuario) {
    setNome(usuario.nome);
    setIdade(usuario.idade);
    setEditandoId(usuario.id);
  }

  async function excluir(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    carregar();
  }

  return (
    <div>
      <h1>Usuários</h1>

      <form onSubmit={salvar}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          required
        />
        <button type="submit">{editandoId ? "Atualizar" : "Cadastrar"}</button>
      </form>

      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nome} - {usuario.idade}{" "}
            <button onClick={() => editar(usuario)}>Editar</button>{" "}
            <button onClick={() => excluir(usuario.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
