const mongoose = require("mongoose")

let connectDB = async function(){
    await mongoose.connect("mongodb+srv://tejasshroff0303:TejasData@cluster0.fmd2n.mongodb.net/TechMate")
}

module.exports = {connectDB};