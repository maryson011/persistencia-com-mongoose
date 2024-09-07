const mongoose = require("mongoose");
const { Schema } = mongoose;

const livroSchema = new Schema({
  titulo: { type: String, required: true },
  subTitulo: { type: String, required: true },
  dataCadastro: { type: Date, required: true, default: () => Date.now() },
  autor: {
    nome: { type: String, required: true },
    sobreNome: { type: String, required: true },
  },
});

livroSchema.virtual("nomeCompletoAutor").get(function () {
  return `${this.autor.nome} ${this.autor.sobreNome}`;
});

livroSchema.virtual("tituloCompleto").get(function () {
  return `${this.titulo}-${this.subTitulo}`;
});

livroSchema.virtual("dataCadatroFormatada").get(function () {
    const data = this.dataCadastro;
    const dia = data.getDate();
    const mes = data.getMonth();
    const ano = data.getFullYear();
    return `${dia}/${mes + 1}/${ano}`;

});

const Livro = mongoose.model("livro", livroSchema);

module.exports = Livro;
