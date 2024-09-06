const mongoose = require("mongoose").default || require("mongoose");
const Usuario = require("../src/models/Usuario")
const criarColecao = require("../src/criarColecao")
const deletarColecao = require("../src/deletarColecao")
const inserirUm = require("../src/inserirUm")
const inserirVarios = require("../src/inserirVarios")
const consultarUm = require("../src/consultarUm")
const consultarVarios = require("../src/consultarVarios")
const deletarUm = require("../src/deletarUm")
const deletarVarios = require("../src/deletarVarios")
const alterarUm = require("../src/alterarUm")
const alterarVarios = require("../src/alterarVarios")

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

test("Deve consultar um usuario", async () => {
    const dados = await consultarUm(Usuario)
    console.log(dados)
    expect(dados).toBeInstanceOf(mongoose.Model)
})

test("Deve consultar varios usuarios", async () => {
    const dados = await consultarVarios(Usuario)
    console.log(dados)
    expect(dados).toBeInstanceOf(Array)
})

test("Deve deletar um usuario", async () => {
    const dados = await deletarUm(Usuario)
    console.log(dados)
    expect(dados.deletedCount).toBe(1)
})

test("Deve deletar varios usuarios", async () => {
    const dados = await deletarVarios(Usuario)
    console.log(dados)
    expect(dados.deletedCount).toBeGreaterThan(1)
})

test("Deve alterar um usuario", async () => {
    const dados = await alterarUm(Usuario)
    console.log(dados)
    expect(dados.modifiedCount).toBe(1)
})

test("Deve alterar varios usuarios", async () => {
    const dados = await alterarVarios(Usuario)
    console.log(dados)
    expect(dados.modifiedCount).toBe(1)
})


afterAll(async ()=>{
    await mongoose.connection.destroy()
})