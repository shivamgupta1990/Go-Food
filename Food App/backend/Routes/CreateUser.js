const express= require("express");
const router=express.Router();
const User=require("../models/User");
const {body,validationResult}=require("express-validator"); 

const bcrypt=require("bcryptjs");
const jwt= require("jsonwebtoken");
const jwtSecret="Shivam";


//Sign up

router.post("/signup",[
    body('email').isEmail(),
    body('password',"password should have atleast 5 letters").isLength({ min: 5 }),
],async(req,res)=>{
    const {name,password,email,location}=req.body;
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array(),
        })
    }
    const find=await User.findOne({email});
    if(find){
        console.log("user already registered");
        return res.status(400).json({
            success:false,
            message:"User Already Registered",
        })
    }
    const salt=await bcrypt.genSalt(10);
    const securePassword=await bcrypt.hash(password,salt);
    try{
        await User.create({
            name,
            email,
            password:securePassword,
            location
        });
        return res.status(200).json({
            success:true,
            message:"User create successfully",
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Unable to create user",
        })
    }
})

//login

router.post("/login",[
    body('email').isEmail()
],async(req,res)=>{
    const {password,email}=req.body;
    // validation
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors:errors.array(),
        })
    }
    
    try{
        const userData=await User.findOne({email});
        console.log("userData->",userData);
        if(!userData){
            return res.status(400).json({
                success:false,
                message:"User Not Exist",
            })
        }
        const passwordCompare=await bcrypt.compare(password,userData.password);
        if(!passwordCompare){
            return res.status(400).json({
                success:false,
                message:"Wrong Password",
            })
        }
        const data={
            user:{
                id:userData.id,
            }
        }
        const authToken=jwt.sign(data,jwtSecret);
        return res.status(200).json({
            success:true,
            message:"User Login successfully",
            token:authToken,
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Unable to Login user",
        })
        
    }
})

module.exports=router;