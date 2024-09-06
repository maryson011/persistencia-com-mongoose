module.exports = async (Usuario) => {
    const dados = await Usuario.deleteOne({nome: "João2"})
    return dados
}