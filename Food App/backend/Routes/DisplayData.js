const express= require("express");
const mongoose=require("mongoose");
const router=express.Router();

router.get("/foodData",async(req,res)=>{
    try{
        const fetched_item= mongoose.connection.db.collection("food_items");
        const fetched_category= mongoose.connection.db.collection("foodCategory");
        const items=await fetched_item.find({}).toArray();
        const category=await fetched_category.find({}).toArray();
        
        if(!items || !category){
            console.log("Data not fetched");
        }
        else{
            global.food_items=items;
            global.foodCategory=category;
        }
        res.send([global.food_items,global.foodCategory]);
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
})

module.exports=router;