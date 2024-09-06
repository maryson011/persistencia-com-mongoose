
module.exports = async (Carro) => {
    // const dados = await Carro.find()
    // .where()
    // .and([{ vidroEletrico: true }, { ano: {$gt:2015} }])
    // .select({ _id:0, vidroEletrico:1, ano:1, modelo:1 })

    // const dados = await Carro.find()
    // .where()
    // .or([{ vidroEletrico: true }, { ano: {$gt:2015} }])
    // .select({ _id:0, vidroEletrico:1, ano:1, modelo:1 })

    const dados = await Carro.find()
    .where()
    .nor([{ vidroEletrico: true }, { ano: {$gt:2015} }])
    .select({ _id:0, vidroEletrico:1, ano:1, modelo:1 })

    return dados
}