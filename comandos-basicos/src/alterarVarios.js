module.exports = async (Usuario) => {
    const dados = await Usuario.updateMany({nome: "Luana3"}, {$set: {senha: 22222}})
    return dados
}