
module.exports = async (Carro) => {
    // const dados = await Carro.findByIdAndUpdate({_id: ""})
    const dados = await Carro.findByIdAndUpdate("66db41e64dffc18187f8c2e2", {$set: {ano: 2020}})

    return dados
}