const express= require("express");
const router=express.Router();

router.get("/foodData",(req,res)=>{
    try{
        // console.log(food_items);
        // console.log(foodCategory);
        res.send([global.food_items,global.foodCategory]);
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
})

module.exports=router;