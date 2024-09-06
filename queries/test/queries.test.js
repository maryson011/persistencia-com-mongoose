require("dotenv").config()
const mongoose = require("mongoose")
const Carro = require("../src/models/Carro")
const iniciaBanco = require("../src/iniciaBanco")
const consultaIguadade = require("../src/consultaIguadade")
const consultaArray = require("../src/consultaArray")
const consultaOpLogicos = require("../src/consultaOpLogicos")

beforeAll(async () => {
    await mongoose.connect(process.env.URLMONGOOSE)
})

test("Deve iniciar o banco", async () => {
    await iniciaBanco(Carro)
    const dados = await Carro.find({})
    expect(dados.length).toBe(5)
})

test("Deve fazer uma consulta verificando igualdade", async () => {
    const dados = await consultaIguadade(Carro)
    console.log(dados)
    expect(dados).toBeInstanceOf(Array)
})

test("Deve fazer uma consulta verificando um array", async () => {
    const dados = await consultaArray(Carro)
    console.log(dados)
    expect(dados).toBeInstanceOf(Array)
})

test("Deve fazer uma consulta com operadores lógicos", async () => {
    const dados = await consultaOpLogicos(Carro)
    console.log(dados)
    expect(dados).toBeInstanceOf(Array)
})

afterAll(async () => {
    await mongoose.disconnect()
})