const mongoose = require("mongoose")
const { Schema } = mongoose

const eventoSchema = new Schema({
    nome: {type:String, required:true},
    data: {
        type:Date, 
        required:true,
        set: (dataOrigem) => {
            const [dia, mes, ano] = dataOrigem.split("/")
            return new Date(`${mes}/${dia}/${ano}`)
        },
        get: (dataArmazenada) => {
            const dia = dataArmazenada.getDate()
            const mes = dataArmazenada.getMonth()
            const ano = dataArmazenada.getFullYear()
            return `${dia}/${mes+1}/${ano}`
        }
    },
    local: {type:String, required:true,},
})

const Evento = mongoose.model("evento", eventoSchema)

module.exports = Evento