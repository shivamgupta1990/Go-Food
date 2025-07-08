const mongoose= require("mongoose");

const MONGO_URL="mongodb+srv://GoFood:1234@cluster0.j4a6ynk.mongodb.net/GoFood?retryWrites=true&w=majority";

const mongoConnect=async()=>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log("DB Connected Successfully");
        
    }catch(err){
        console.log("DB Connection Failed");
    } 
}

module.exports=mongoConnect;
