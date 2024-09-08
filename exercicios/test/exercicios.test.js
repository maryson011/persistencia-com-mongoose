require("dotenv").config();
const mongoose = require("mongoose");
const {User, Comment, Movie} = require('../src/index')

beforeAll(async () => {
    await mongoose.connect(process.env.URLMONGOOSE)
})

test("Deve resolver o execicio 1 (criar modelo User)", async () => {
    const dados = await User.findOne()
    console.log(dados)
    expect(dados).toHaveProperty("_id")
    expect(dados).toHaveProperty("name")
    expect(dados).toHaveProperty("email")
    expect(dados).toHaveProperty("password")
})

test("Deve resolver o execicio 2 (criar modelo Comment)", async () => {
    const dados = await Comment.findOne()
    console.log(dados)
    expect(dados).toHaveProperty("_id")
    expect(dados).toHaveProperty("name")
    expect(dados).toHaveProperty("email")
    expect(dados).toHaveProperty("movie_id")
    expect(dados).toHaveProperty("text")
    expect(dados).toHaveProperty("date")
})

test("Deve resolver o exercicio 3 (obter todos os filmes com a classificação PG-23)", async () => {
    const filmes = await Movie.find({rated: 'PG-13'}, {title:1})
    console.log(filmes)
    expect(filmes.length).toBe(2321)
})

test("Deve resolver o execicio 4 (obter todos os filmes lançados após 2010 em ordem alfabetica)", async () => {
    const filmes = await Movie.find({year: {$gt:2010}}, {title:1, year:1, _id:0}).sort({year:1})
    console.log(filmes)
    for(let i = 1; i < filmes.length; i++) {
        expect(filmes[i].year).toBeGreaterThanOrEqual(filmes[i-1].year)
    }
})

test("Deve resolver execicio 5 (criar uma propiedade virtual em Movie chamada premiosTexto)", async () => {
    const filme = await Movie.findOne()
    expect(filme.get("premiosTexto"))
        .toBe(`O filme ${filme.name} ganhou ${filme.awards.win} prêmios e foi indicado à mais ${filme.awards.nominations}`)
})

test("Deve resolver o exercicio 6 (listar o titulo de todos os filems onde o Jordan Medina comentou)", async () => {
    const dados = await Comment.aggregate()
        .match({name:"Jordan Medina"})
        .lookup({from: "movies", localField: "movie_id", foreignField: "_id", as: "movie_info"})
        .unwind("movie_info")
        .project({userName: "$name", titulo: "$movie_info.title"})

    console.log(dados)
    dados.forEach(filme=>{
        expect(filme.userName).toBe("Jordan Medina")
    })
})

test("Deve resolver o exercicio 7 (adicionar um valor padrão na data montário)", async () => {
    const filme = await Movie.findOne()
    const comentario = new Comment({
        name: "Fulano",
        email: "f@email.com",
        movie_id: filme._id,
        text:"Filme bom demais"
    })

    await comentario.save()
    expect(comentario.date).not.toBe(undefined)
})

test("Deve resolver o exercicio 8 (encontrar o filme com a maior classificação no metacritic sem usar o metodo find, desconsiderar valor menores que 70)", async () => {
    const dados = await Movie.where("metacritic")
    .gt(70)
    .select({title:1, metacritic:1})
    .sort({metacritic:-1})
    .limit(3)

    console.log(dados)
    expect(dados[0].metacritic).toBe(100)
})

test("Deve resolver o exercicio 9 (impedir que comentarios com menos de 10 caracteres sejam feitos)", async () => {
    const filme = await Movie.findOne()
    const comentario = new Comment({
        name: "Fulano2",
        email: "f2@email.com",
        movie_id: filme._id,
        text:"demais"
    })

    await comentario.save().then(
        () => {
            // save ok
            expect(true).toBe(false)
        },
        (e) => {
            // not save
            console.log(e.message)
            expect(e).toBeDefined()
        }
    )
    expect(comentario.date).not.toBe(undefined)
})

test("DEVE RESOLVER O EXERCICIOS 10 (LISTAR OS TITULOS COM MAIS DE 80 NO METACRITIC AGRUPADOS PELO METACRITIC", async () => {
    const dados = await Movie.aggregate()
        .match({metacritic: {$gt:80}})
        .project({metacritic:1, title:1, _id:0})
        .group({_id:"$metacritic", title:{$push:"$title"}})
    console.log(dados)
    expect(dados).toHaveLength(20)
})

test("Deve resolver o exercicio 11 (implementar uma propriedade get para a data no formato brasileiro)", async () => {
    const filme = await Movie.findOne()
    const comentario = new Comment({
        name: "Fulano3",
        email: "f3@email.com",
        movie_id: filme._id,
        text:"demais...",
        date: "1970-01-01"
    })

    expect(comentario.get("date")).toBe("01/01/1970 00:00")
})

test("Deve resolver o exercico 12 (adicinoar um comentário do usuario Patricia Good no filme Peter Pan e no filem Her)", async () => {
    const {name, email} = await User.findOne({name: "Patricia Good"})
    const idPeterPan = await Movie.findOne({title: "Peter Pan"}, {_id:1})
    const idHer = await Movie.findOne({title: "Her"}, {_id:1})
    // console.log(idPeterPan)
    // console.log(idHer)
    const comentarioPeterPan = new Comment({
        name,
        email,
        movie_id: idPeterPan,
        text:"peter pan demais..."
    })
    const comentarioHer = new Comment({
        name,
        email,
        movie_id: idHer,
        text:"her demais..."
    })
    const dados = await Comment.insertMany([comentarioPeterPan, comentarioHer])
    console.log(dados)

    expect(dados.length).toBe(2)
})

test("Deve resolver o exercicio 13 (deletar comentarios do filem shrek)", async () => {
    const filme = await Movie.findOne({title: "Shrek"})
    const idShrek = filme._id
    await Comment.deleteMany({movie_id:idShrek})
    const comentarios = await Comment.find({movie_id:idShrek})
    expect(comentarios.length).toBe(0)
})

afterAll(async () => {
    await mongoose.disconnect()
})