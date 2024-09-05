const mongoose = require("mongoose").default || require("mongoose");

await mongoose.connect("mongodb+srv://mongoose:mongoose@cluster0.s1jex.mongodb.net/basicos", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

afterAll(()=>{
    mongoose.connection.destroy()
})