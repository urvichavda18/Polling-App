const mongoose = require("mongoose");

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{});
        console.log("MongoDB connect :)")
    }catch(err){
        console.error("Error conecting to MongoDB",err);
        process.exit(1);
    }
}
module.exports = connectDB