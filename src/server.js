require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./database");

console.log("DATABASE_URL:", process.env.DATABASE_URL);

connectDB();

const app = express();
const port = process.env.PORT || 3333;

app.use(cors());
app.use(express.json());

// Definir o schema e o modelo do usuário
const usuarioSchema = new mongoose.Schema({
    nome: String,
    sobrenome: String,
    dataNascimento: Date,
    genero: String,
    email: String
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

// Rota para cadastrar novos usuários
app.post("/api/usuarios", async (req, res) => {
    try {
        const novoUsuario = new Usuario(req.body);
        await novoUsuario.save();
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.listen(port, () => {
    console.log(`Backend started at http://localhost:${port}`);
});
