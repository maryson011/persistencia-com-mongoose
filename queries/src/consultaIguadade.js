
module.exports = async (Carro) => {
    // const dados = await Carro.find({vidroEletrico: true, ano: {$gt: 2010}})
    // const dados = await Carro.find().where("vidroEletrico").equals(true)
    // const dados = await Carro.find().where("vidroEletrico").ne(true)
    const dados = await Carro.find().where("ano").gt(2010).lt(2015) // > 2010 e < 2015
    return dados
    
}