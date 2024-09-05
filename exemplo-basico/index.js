// Importar o mongoose

const mongoose = require("mongoose").default || require("mongoose");
const { Schema, model } = mongoose;

// conectar ao db

(async () => {
    try {
        await mongoose.connect("mongodb+srv://mongoose:mongoose@cluster0.s1jex.mongodb.net/coordenadas", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        // criar um schema
        const coordenadaSchema = new Schema({
            x:Number,
            y:Number
        })
    
        // criar um modelo
        const Coordenada = model("coordenada", coordenadaSchema)
    
        // interação com banco
        await Coordenada.create({ x:11, y:9 })
        const dados = await Coordenada.find({},{x:1,y:1, _id:0})
        console.log(dados)

        mongoose.connection.close()
    } catch (e) {
        console.log(e)
    }
})()