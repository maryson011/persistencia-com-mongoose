module.exports = async (mongoose) => {
    await mongoose.connection.dropCollection("usuarios")
}