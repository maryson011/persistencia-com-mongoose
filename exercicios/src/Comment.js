const mongoose = require("mongoose")
const {Schema} = mongoose

const commentSchema = Schema({
    name: {type:String,required:true},
    email: {type:String,required:true},
    movie_id: {type:mongoose.SchemaTypes.ObjectId, required:true},
    text: {type:String,required:true, minLength:10},
    date: {type:Date, default: () => Date.now(), required:true,
        get: (data) => {
            const dia = data.getUTCDate().toString().padStart(2, "0")
            const mes = (data.getUTCMonth() + 1).toString().padStart(2, "0")
            const ano = data.getUTCFullYear()
            const horas = data.getUTCHours().toString().padStart(2, "0")
            const minutos = data.getUTCMinutes().toString().padStart(2, "0")
            return `${dia}/${mes}/${ano} ${horas}:${minutos}`
        }
    },
})

const Comment = mongoose.model("comment", commentSchema)

module.exports = Comment