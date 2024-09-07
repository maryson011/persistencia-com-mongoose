const mongoose = require("mongoose")
const { Schema } = mongoose

const produtoSchema = new Schema({
    nome: { type:String, required:true }, // obrigatório
    preco: Number,
    desconto: Number,
    categorias: [String]
})

const Produto = mongoose.model("produto", produtoSchema)

module.exports = Produto