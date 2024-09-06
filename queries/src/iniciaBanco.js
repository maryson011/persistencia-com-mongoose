
module.exports = async (Carro) => {
    const carros = [
        { modelo: "Fiesta", marca: "Ford", ano: 2010, quanridadePortas: 4, vidroEletrico: false },
        { modelo: "Civic", marca: "Honda", ano: 2015, quanridadePortas: 4, vidroEletrico: true },
        { modelo: "Gol", marca: "Volkswagen", ano: 2012, quanridadePortas: 2, vidroEletrico: false },
        { modelo: "Corolla", marca: "Toyota", ano: 2018, quanridadePortas: 4, vidroEletrico: true },
        { modelo: "Onix", marca: "Chevrolet", ano: 2019, quanridadePortas: 4, vidroEletrico: true },
    ]

    await Carro.deleteMany()

    await Carro.insertMany(carros)
    
}