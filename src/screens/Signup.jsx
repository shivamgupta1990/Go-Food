
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' 
import { toast } from "react-toastify"
import { ToastContainer } from "react-toastify";

export default function Signup() {
    const navigate= useNavigate();
    const [credentials,setCredential]=useState({
        name:"",
        email:"",
        password:"",
        geolocation:""
    });

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/v1/signup",{
            method:"POST",
            headers:{
                "content-Type":"application/json", 
            },
            body:JSON.stringify({
                name:credentials.name,
                email:credentials.email,
                password:credentials.password,
                location:credentials.geolocation,
            })

        }) 
        const res= await response.json();
        console.log(res);
        if(!res.success){
            alert("Enter valid Credentials");
        }
        else{
            toast.success("Registation Successfully!");
                setTimeout(() => {
                navigate("/"); 
                }, 1500);
        }
    }
    const onChange=(event)=>{
        setCredential({...credentials,[event.target.name]:event.target.value});
    }

  return (
    <div className="container" style={{height:"100vh"}}>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange}/>
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control"
                name='password' value={credentials.password} onChange={onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                <input type="text" className="form-control" 
                name='geolocation' value={credentials.geolocation} onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
            <ToastContainer/>
        </form>
    </div>
  )
}
