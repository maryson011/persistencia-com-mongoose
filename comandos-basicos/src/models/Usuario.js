const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    nome: String,
    email: String,
    senha: String
})

const Usuario = mongoose.model("usuarios", schema)

module.exports = Usuario