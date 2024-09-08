const mongoose = require("mongoose")
const {Schema} = mongoose
const Aluno = require("./Aluno")

const disciplinaRefSchema = new Schema({
    nome: {type:String,required:true},
    codigo: {type:String,required:true},
    alunosMatriculados: {type:[Schema.Types.ObjectId], ref:Aluno, required:true},
})

const DisciplinaRef = mongoose.model("disciplinaRef", disciplinaRefSchema)

module.exports = DisciplinaRef