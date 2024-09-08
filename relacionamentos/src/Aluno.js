const mongoose = require("mongoose")
const {Schema} = mongoose

const alunoSchema = new Schema({
    nome: {type:String,required:true},
    matricula: {type:String,required:true, minLength:5,maxLength:5}
})

const Aluno = mongoose.model("aluno", alunoSchema)

exports.alunoSchema = alunoSchema
module.exports = Aluno