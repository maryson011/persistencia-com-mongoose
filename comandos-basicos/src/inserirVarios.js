module.exports = async (Usuario) => {
    const usuariosPraInserir = [
        {nome: "Flavia2", email: "f2@email.com", senha: 123234},
        {nome: "João2", email: "j2@email.com", senha: 123235},
    ]

    // Forma 1
    // const dados = await Usuario.create(usuariosPraInserir)

    // Forma 2
    const dados = await Usuario.insertMany(usuariosPraInserir)
    return dados
}