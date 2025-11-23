const mongoose = require("mongoose");
const BDconnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado a MongoDB Atlas");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
}

module.exports = BDconnection;