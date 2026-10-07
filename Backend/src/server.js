import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma.js";


const app = express();

app.use(cors());
app.use(express.json());



app.get("/usuarios", async (req, res) => {
  const usuarios = await prisma.usuario.findMany({
    orderBy: {
      id: "asc",
    },
  });

  res.json(usuarios);
});



app.post("/usuarios", async (req, res) => {
  const { nome, idade } = req.body;

  const usuario = await prisma.usuario.create({
    data: {
      nome,
      idade,
    },
  });

  res.status(201).json(usuario);
});



app.put("/usuarios/:id", async (req, res) => {
  const { nome, idade } = req.body;

  const usuario = await prisma.usuario.update({
    where: {
      id: Number(req.params.id),
    },
    data: {
      nome,
      idade,
    },
  });

  res.json(usuario);
});



app.delete("/usuarios/:id", async (req, res) => {
  await prisma.usuario.delete({
    where: {
      id: Number(req.params.id),
    },
  });

  res.status(204).end();
});



app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: err.message });
});



app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
