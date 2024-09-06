
module.exports = async (Carro) => {
    // const dados = await Carro.find().where("marca").in(["Toyota", "Ford"])
    // const dados = await Carro.find().where("marca").in(["Toyota", "Ford"]).select({_id:0, modelo:1, marca:1 })
    const dados = await Carro.find().where("marca").nin(["Toyota", "Ford"]).select({_id:0, modelo:1, marca:1 }) // not in

    return dados
}