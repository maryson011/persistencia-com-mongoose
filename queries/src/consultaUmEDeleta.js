
module.exports = async (Carro) => {
    // const dados = await Carro.deleteOne({modelo:"Gol"})
    const dados = await Carro.findOneAndDelete({modelo:"Gol"}) // retorna obj deletado

    return dados
}