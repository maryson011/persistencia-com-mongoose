const mongoose = require("mongoose")
const {Schema} = mongoose
const {alunoSchema} = require("./Aluno")

const disciplinaIncSchema = new Schema({
    nome: {type:String,required:true},
    codigo: {type:String,required:true},
    alunosMatriculados: {type:[alunoSchema],required:true},
})

const DisciplinaInc = mongoose.model("disciplina", disciplinaIncSchema)

module.exports = DisciplinaInc