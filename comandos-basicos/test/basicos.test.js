const mongoose = require("mongoose").default || require("mongoose");
const Usuario = require("../src/models/Usuario")
const criarColecao = require("../src/criarColecao")

beforeAll(async () => {
    await mongoose.connect("mongodb+srv://mongoose:mongoose@cluster0.s1jex.mongodb.net/basicos", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

test("Deve criar uma coleção", async () => {
    await criarColecao(Usuario)
    const dados = await Usuario.find()
    expect(dados).toHaveLength(0)
})

afterAll(()=>{
    mongoose.connection.destroy()
})