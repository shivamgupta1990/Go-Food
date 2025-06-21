
const express=require("express");
const app= express();
const cors = require("cors");

//start server
const PORT=5000;
app.listen(PORT,()=>{
    console.log(`App is running on port:${PORT}`);
})

//connect DB
const mongoDB=require("./db");
mongoDB();

//middleware 
app.use(cors({
  origin: "http://localhost:4000", // your frontend origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
//to parse post api data
app.use(express.json());

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:4000");
//     res.header(
//         "Access-Control-Allow-Header",
//         "Origin,X-Requested-With,Content-Type, Accept"
//     )
//     next();
// })

//to mount our request 
const userRouter=require("./Routes/CreateUser");
const dataRouter=require("./Routes/DisplayData");
const orderRouter=require("./Routes/OrderData");
app.use("/api/v1",userRouter);
app.use("/api/v1",dataRouter);
app.use("/api/v1",orderRouter);

//default route
app.get("/",(req,res)=>{
    res.send("Hello world");
}) 

