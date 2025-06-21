const mongoose= require("mongoose");

const MONGO_URL="mongodb+srv://GoFood:1234@cluster0.j4a6ynk.mongodb.net/GoFood?retryWrites=true&w=majority";

const mongoConnect=async()=>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log("DB Connected Successfully");
        const fetched_item=await mongoose.connection.db.collection("food_items");
        const fetched_category=await mongoose.connection.db.collection("foodCategory");
        // console.log(fetched_data);
        const items=await fetched_item.find({}).toArray();
        const category=await fetched_category.find({}).toArray();
        if(!items || !category){
            console.log("Data not fetched");
        }
        else{
            global.food_items=items;
            global.foodCategory=category;
            // console.log(food_items);
            // console.log(foodCategory)
        }
        
    }catch(err){
        console.log("DB Connection Failed");
    } 
}

module.exports=mongoConnect;
