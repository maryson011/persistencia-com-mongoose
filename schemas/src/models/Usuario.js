const mongoose = require("mongoose")
const { Schema } = mongoose

const usuarioSchema = new Schema({
    nome: {type:String,required:true, minLength: 3, maxLength: 20},
    email: {type:String,required:true, lowercase: true},
    pontosPorCompra: {type:Number,required:true, min:1, max:10},
})

const Usuario = mongoose.model("usuario", usuarioSchema)

module.exports = Usuario