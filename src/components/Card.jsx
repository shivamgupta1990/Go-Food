import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card({foodItem,options}) {
    const priceRef=useRef();
    const dispatch=useDispatchCart();
    const data=useCart();
    const {foodName,img}=foodItem;
    const priceOptions=Object.keys(options);
    const [qty,setQnt]=useState(1);
    const [size,setSize]=useState("");


    const handleAddToCart= async()=>{
        let food=[];
        for(const item of data){
            if(item.id===foodItem._id){
                food=item;
                break;
            }
        }
        if(food.length !== 0){
            if(food.size===size){
                await dispatch({type:"UPDATE",id:foodItem._id, price:finalPrice, qty:qty});
                return ; 
            }   
        }
        
        await dispatch({type:"ADD", id:foodItem._id, name:foodItem.name, price:finalPrice,qty:qty,size:size,img:foodItem.img});
        

        
    }
    const finalPrice=qty*parseInt(options[size]);
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])
  return (
    <div>
         <div className="card mt-3" style={{"width": "18rem","maxHeight":"360px"}}>
                <img src={img} className="card-img-top" style={{height:"120px", objectFit:"fill"}} alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{foodItem.name}</h5>
                    
                    <div className='container '>
                        <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQnt(e.target.value)}>
                            {
                                Array.from(Array(6),(e,i)=>{
                                    return(
                                        <option key={i+1} value={i+1}>{i+1}</option>
                                    )
                                })
                            }
                        </select>
                        <select className='m-2 h-100 bg-success rounded'onChange={(e)=>setSize(e.target.value)} ref={priceRef}>
                            {
                                priceOptions.length>0?priceOptions.map((data,index)=>{
                                    return(
                                        <option key={index} value={data}>{data}</option>
                                    )
                                }):""
                                
                            }
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr/>
                    <button className='btn btn-success justify-center ms-2' onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
    </div>
  )
}
