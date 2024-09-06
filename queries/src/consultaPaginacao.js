
module.exports = async (Carro) => {
    // const dados = await Carro
    // .find({}, {marca:1, modelo:1, ano:1, _id:0})
    // .skip(1)
    // .limit(2)

    const dados = await Carro
    .find()
    .where()
    .sort({ano:-1})
    .skip(1)
    .limit(2)
    .select({marca:1, modelo:1, ano:1, _id:0})

    return dados
}