module.exports = async (Usuario) => {
    const obj = {
        nome: "Luana2",
        email: "l2@email.com",
        senha: 12345
    }

    // Forma 1
    // const dados = await Usuario.create(obj)
    
    // Forma 2
    const u1 = new Usuario(obj)
    const dados = await u1.save()
    return dados


}