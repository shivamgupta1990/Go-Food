import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const navigate=useNavigate();
  const [credentials, setCredential] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://foodappserver-2q59.onrender.com/api/v1/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),

    });
    const res = await response.json();
    console.log(res);
    if (!res.success) {
      alert("Enter valid Credentials");
    }
    if(res.success){
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("Token",res.token);
      console.log(localStorage.getItem("Token"));
      toast.success("Login Successfully!");
      setTimeout(() => {
        navigate("/"); 
        }, 1500);
      
    }
  }
  const onChange = (event) => {
    setCredential({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div className="container" style={{height:"100vh"}}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control"
            name='password' value={credentials.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/signup" className="m-3 btn btn-danger">I am a new user</Link>
        <ToastContainer />
      </form>
    </div>
  )
}
