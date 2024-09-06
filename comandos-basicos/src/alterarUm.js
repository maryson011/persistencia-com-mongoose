module.exports = async (Usuario) => {
    const dados = await Usuario.updateOne({nome: "Luana2"}, {$set: {nome: "Luana3"}})
    return dados
}