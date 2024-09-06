const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    modelo: String,
    marca: String,
    ano: Number,
    quantidadePortas: Number,
    vidroEletrico: Boolean
})

const Carro = mongoose.model("carro", schema)

module.exports = Carro