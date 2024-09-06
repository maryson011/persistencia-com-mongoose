
module.exports = async (Carro) => {
    // const dados = await Carro.findByIdAndDelete({_id: ""})
    const dados = await Carro.findByIdAndDelete("66db41e64dffc18187f8c2e3")

    return dados
}