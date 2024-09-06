module.exports = async (Usuario) => {
    const dados = await Usuario.findOne({nome:{ $ne: "Luana" }},{ _id:0, __v:0 }) // $ne é não é
    return dados
}