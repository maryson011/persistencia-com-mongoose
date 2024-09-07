const mongoose = require("mongoose")
const { Schema } = mongoose

const empregadoSchema = new Schema({
    nome: {type:String,required:true},
    email: {type:String,required:true},
    telefone: {
        type:String,
        required:true,
        validate: {
            validator: (telefoneFornecido)=>{
                return !!telefoneFornecido.match(/\d{8,11}/)
            },
            message:"Telefone inválido!"
        }
    },
    salario: {type:Number,required:true, min: 1500, default: 2000},
})

empregadoSchema.methods.darAumento = function (valorAumento){
    if (valorAumento > 0) {
        this.salario += valorAumento
    }
}

empregadoSchema.methods.darTelefoneEmpresa = function (){
    const numeroTelefone = Math.trunc(Math.random() * 1000000000)
    this.telefone = `${numeroTelefone}`
}

const Empregado = mongoose.model("empregado", empregadoSchema)

module.exports = Empregado