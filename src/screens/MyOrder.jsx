import React, { useEffect, useState } from 'react'

export default function MyOrder() {

    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log("Email->",localStorage.getItem('userEmail'))
        await fetch("https://foodappserver-2q59.onrender.com/api/v1/myOrderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            setorderData(response);
        })
    }

    useEffect(() => {
        fetchMyOrder()
    },[])
    // setorderData(orderData?.orderData?.order_data.slice(0).reverse());
    console.log("orderData->",orderData?.orderData?.order_data?.length );
    const leng=orderData?.orderData?.order_data?.length;
    const len = orderData?.orderData?.order_data[leng-1]?.length + orderData?.orderData?.order_data[leng-2]?.length || 0;
    return (
        <div style={{ height: len>2 ? "100%" : "100vh" }}>
            <div className='container'>
                <div className='row'>

                    {orderData ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                                <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>

            
        </div>
    )
}