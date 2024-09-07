const {
    Produto,
    Usuario,
    Disciplina,
    Evento,
    Livro,
    Empregado
} = require("../src/models")

require("dotenv").config()
const mongoose = require("mongoose")

beforeAll(async () => {
    await mongoose.connect(process.env.URLMONGOOSE)
})


test("Deve ter campos obrigatórios", async () => {
    const dados = await Produto.create({
        nome: "Mesa Gamer",
        // preco: 1300,
        // desconto: 0.4,
        categorias:["Ecritório", "Gamer"]
    })
    console.log(dados)
    expect(dados).toBeInstanceOf(Object)
})

test("Deve fazer varificações", async () => {
    const dados = await Usuario.create({
        nome: "Ana",
        email: "ANA@email.com",
        pontosPorCompra: 5,
    })
    console.log(dados)
    expect(dados).toBeInstanceOf(Object)
})

test("Deve fazer mais varificações", async () => {
    const dados = new Disciplina({
        codigo: "intalg002",
        // qtdeAlunos: 15,
    })
    await dados.save()
    dados.codigo = "intalg003"
    console.log(dados)
    expect(dados).toBeInstanceOf(Object)
})

test("Deve testar", async () => {
    await Disciplina.updateOne({qtdeAlunos:15}, {$set:{qtdeAlunos:10}})
})

test("Deve usar metodos set", async () => {
    const dados = await Evento.create({
        nome: "Casamento",
        local: "igreja",
        data: "30/01/2020",
    })
    console.log(dados)
    expect(dados).toBeInstanceOf(Object)
})
test("Deve usar metodos get", async () => {
    const dados = await Evento.findById('66dc50505552bdfbc7f8683c')
    const novosDados = {...dados._doc, data:dados.get("data")}
    console.log(novosDados)
    expect(dados).toBeInstanceOf(Object)
})

test("Deve usar propriedades virtuais", async () => {
    // const dados = await Livro.create({
    //     titulo: "livro 1",
    //     subTitulo: "Sub livro 1",
    //     autor: {
    //         nome: "Pedro",
    //         sobreNome: "Silva"
    //     }
    // })
    const dados = await Livro.findOne()
    console.log(dados.get("nomeCompletoAutor"))
    console.log(dados.get("tituloCompleto"))
    console.log(dados.get("dataCadatroFormatada"))
    expect(dados).toBeInstanceOf(Object)
})

test("Deve usar validação personalizada", async () => {
    const dados = await Empregado.create({
        nome: "Joaquim",
        telefone: "99112321232",
        email: "jose@email.com",
    })
    console.log(dados)
    expect(dados).toBeInstanceOf(Object)
})

test("Deve usar metodos", async () => {
    const dados = await Empregado.findOne()
    console.log(dados)
    dados.darAumento(200)
    dados.darTelefoneEmpresa()
    console.log(dados)
    await dados.save()
    expect(dados).toBeInstanceOf(Object)
})

afterAll(async () => {
    await mongoose.disconnect()
})