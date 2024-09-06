
module.exports = async (Carro) => {
    const dados = await Carro.findOneAndUpdate({modelo:"Onix"}, {$set: { ano:1997 }})

    return dados
}