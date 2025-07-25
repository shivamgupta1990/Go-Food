import React, { useEffect, useState } from 'react'
import Card from '../components/Card'


export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search,setSearch]=useState('');

  const loadData = async (req, res) => {
    try {
      let response = await fetch("https://foodappserver-2q59.onrender.com/api/v1/foodData", {
        method: "get",
        headers: {
          "Content-Type": "application/json"
        }
      });
      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Unable to load data",
      })
    }
  }

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className='carousel-caption' style={{ zIndex: 10 }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
              </div>
            </div>
            <div className="carousel-item active">
              <img src="/burger.webp" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="/iceCream.webp" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="/pastree.webp" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className='container'>
        {
          foodCat.length !== 0
            ? foodCat.map((data) => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>
                    {data.CategoryName}
                  </div>
                  <hr />
                  {
                    foodItem.lenght !== 0 ?
                      foodItem.filter((item) => item.CategoryName == data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())).map((filterItem) => {
                        return (
                          <div key={filterItem._id} className="col-12 col-md-6 col-lg-3" >
                            <Card foodItem={filterItem}
                              options={filterItem.options[0]}
                            />
                          </div>
                        )
                      }) :
                      <div>No Such Data Found</div>
                  }

                </div>
              )
            }) : (<div></div>)
        }
      </div>
    </div>
  )
}
