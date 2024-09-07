const mongoose = require("mongoose")
const { Schema } = mongoose

const disciplinaSchema = new Schema({
    codigo: {type:String, required:true, uppercase:true, minLength:9, maxLength:9, trim:true, immutable:true},
    qtdeAlunos: {type:Number, required:true, min:10, max:50, default:25},
})

const Disciplina = mongoose.model("disciplina", disciplinaSchema)

module.exports = Disciplina