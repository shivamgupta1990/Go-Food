import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import { Cart } from '../screens/Cart';
import { useCart } from './ContextReducer';


export default function Navbar() {
  const data=useCart();
  const [cartView,setCartView]=useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log(localStorage.getItem("Token"));
    localStorage.removeItem("Token");
    localStorage.removeItem("userEmail");
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className=" text-shadow-black" to="/"><img src="/logo.jpg" style={{height:"70px",borderRadius:"50%"}} alt="" /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ">
              {
                  <li className="nav-item">
                    <Link className="nav-link active fs-4 " style={{marginLeft:"30px"}} aria-current="page" to="/">Home</Link>
                  </li> 
              }
              <li className="nav-item">
                <Link className="nav-link active fs-4 " style={{marginLeft:"30px"}} aria-current="page" to="/myOrder">My Order</Link>
              </li>
              
            </ul>
            {
              (!localStorage.getItem("Token")) ?
                <div className='d-flex '>
                  <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>

                  <Link className="btn bg-white text-success mx-1" to="/signup">Signup</Link>
                </div> :
                <div>
                  <div className='btn bg-white text-success mx-2' onClick={()=>setCartView(true)}>
                    My Cart {" "}
                    <Badge pill bg='danger'>
                      {console.log( data)}
                      {data.length>0?data.length:""}
                    </Badge>
                  </div>
                  {cartView ? (<Modal onClose={()=>setCartView(false)}><Cart/></Modal> ):null}
                  <div className='btn bg-white text-danger  mx-2' onClick={handleLogout}>
                    Logout
                  </div>
                </div>

            }


          </div>
        </div>
      </nav>
    </div>
  )
}
