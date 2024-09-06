require("dotenv").config()
const mongoose = require("mongoose")
const Carro = require("../src/models/Carro")
const iniciaBanco = require("../src/iniciaBanco")

beforeAll(async () => {
    await mongoose.connect(process.env.URLMONGOOSE)
})

test("Deve iniciar o banco", async () => {
    await iniciaBanco(Carro)
    const dados = await Carro.find()
    expect(dados.length).toBe(5)
})

afterAll(async () => {
    await mongoose.disconnect()
})