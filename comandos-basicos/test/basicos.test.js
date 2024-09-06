const mongoose = require("mongoose").default || require("mongoose");
const Usuario = require("../src/models/Usuario")
const criarColecao = require("../src/criarColecao")
const deletarColecao = require("../src/deletarColecao")
const inserirUm = require("../src/inserirUm")
const inserirVarios = require("../src/inserirVarios")

beforeAll(async () => {
    await mongoose.connect("mongodb+srv://mongoose:mongoose@cluster0.s1jex.mongodb.net/basicos")
})

test("Deve criar uma coleção", async () => {
    await criarColecao(Usuario)
    const dados = await Usuario.find()
    expect(dados).toHaveLength(0)
})

test("Deve deletar uma coleção", async () => {
    await deletarColecao(mongoose)
    const dados = await Usuario.find()
    expect(dados).toHaveLength(0)
})

test("Deve inserir um documento", async () => {
    const dados = await inserirUm(Usuario)
    console.log(dados)
    expect(dados).toBeInstanceOf(mongoose.Model)
})

test("Deve inserir varios documentos", async () => {
    const dados = await inserirVarios(Usuario)
    console.log(dados)
    expect(dados).toBeInstanceOf(Array)
})

afterAll(async ()=>{
    await mongoose.connection.destroy()
})