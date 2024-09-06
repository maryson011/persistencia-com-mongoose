module.exports = async (Usuario) => {
    const dados = await Usuario.find({nome:{ $ne: "Luana" }},{ _id:1, __v:0 }) // $ne é não é
    return dados
}