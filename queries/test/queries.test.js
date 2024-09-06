require("dotenv").config()
const mongoose = require("mongoose")
const Carro = require("../src/models/Carro")
const iniciaBanco = require("../src/iniciaBanco")
const consultaIguadade = require("../src/consultaIguadade")

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

afterAll(async () => {
    await mongoose.disconnect()
})