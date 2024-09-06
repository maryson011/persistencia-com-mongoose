module.exports = async (Usuario) => {
    const dados = await Usuario.deleteMany({nome: "Flavia2"})
    return dados
}