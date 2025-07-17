const express=require("express");
const router=express.Router();
const Order=require("../models/Orders");

router.post("/orderData",async(req,res)=>{
    try{
        
        const data=req.body.order_data;
        // console.log("Data->",req.body);
        const date=data.splice(0,0,{Order_date:req.body.order_date});

        const eId=await Order.findOne({"email":req.body.email});
        if(eId === null){
            try{
                await Order.create({
                    email:req.body.email,
                    order_data:[data],
                }).then(()=>{
                    res.json({
                        success:true,
                        message:"Data Saved",
                    })
                })
            }catch(err){
                return res.status(400).json({
                    success:false,
                    message:"Unable to Save data"
                })
            }
        }
        else{
            try{
                await Order.findOneAndUpdate({email:req.body.email},{
                    $push:{
                        order_data:data
                    }
                }).then(()=>{
                    return res.status(200).json({
                        success:true,
                        message:"Data Saved"
                    })
                });

            }catch(err){
                return res.status(400).json({
                    success:false,
                    message:"Error in data save"
                })
                
            }
        }
    }catch(err){
        return res.status(500).josn({
            success:false,
            message:"Unable to add data",
        })
    }
});


router.post("/myOrderData",async(req,res)=>{
    try{

        const myData=await Order.findOne({"email":req.body.email})
        if(myData){
            return res.status(200).json({
                success:true,
                message:"Data Loaded",
                orderData:myData
            })
        }
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Unable to find data",
        })
    }
})

module.exports=router;