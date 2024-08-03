import React, { useEffect, useState } from 'react';

import Footer from '../Components/Footer'; // Assuming you have a Footer component
import Card from '../Components/Card'; // Assuming you have a Card component
import Carousal from '../Components/Carousal'; // Ensure this path is correct

const Home = () => {
  const [search,setSearch] = useState("")
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:8000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      let data = await response.json();
      setFoodItem(data.GoFood);
      setFoodCat(data.samplefood);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // console.log(foodCat)

  // Group food items by category
  // const groupedFoodItems = foodCat.reduce((acc, category) => {
  //   acc[category.id] = foodItem.filter(item => item.categoryId === category.id);
  //   return acc;
  // }, {});

  const groupedFoodItems = foodCat.reduce((acc, category) => {
    const itemsInCategory = foodItem.filter((item) => item.CategoryName === category.CategoryName && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
    if (itemsInCategory.length > 0) {
      acc[category.CategoryName] = itemsInCategory;
    }
    return acc;
  }, {});

  console.log(groupedFoodItems)


  return (
    <div style={{ textAlign: 'left', fontFamily: 'NHaaGroteskDSpro-6+5md, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif' }}>
      <div>
      <div id="carouselExampleCaptions" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ height: '300px' }}>
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner" style={{ height: '100%' }}>
          <div className="carousel-item active">
            <img src="https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg" className="d-block w-100" style={{ height: '100%', objectFit: 'cover', filter: 'brightness(50%)' }} alt="Pizza" />
          </div>
          <div className="carousel-item">
            <img src="https://img.freepik.com/free-psd/fresh-beef-burger-isolated-transparent-background_191095-9018.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1720656000&semt=sph" className="d-block w-100" style={{ height: '100%', objectFit: 'cover', filter: 'brightness(50%)' }} alt="Burger" />
          </div>
          <div className="carousel-item">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Bambayya_Pav_bhaji.jpg/640px-Bambayya_Pav_bhaji.jpg" className="d-block w-100" style={{ height: '100%', objectFit: 'cover', filter: 'brightness(50%)' }} alt="Pav Bhaji" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="card mt-3" style={{ width: '100%' }}>
        <div className="card-body">
          <nav className="navbar navbar-light bg-light">
            <div className="container-fluid justify-content-center">
              <div className="d-flex justify-content-center" style={{ width: '50%' }}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
              </div>
            </div>
          </nav>
        </div>
      </div>
        <div className='container'>
          {
            foodCat.length > 0
              ? foodCat.map((category) => (
                <div key={category.id} className='mb-4'>
                  <div className='fs-3 m-3'>{category.CategoryName}</div>
                  <hr />
                  <div className='row'>
                    {/* Render food items for the current category */}
                    {
                      groupedFoodItems[category.CategoryName] && groupedFoodItems[category.CategoryName].length > 0
                        ? groupedFoodItems[category.CategoryName].map((item, index) => (
                          <div key={index} className='col-12 col-md-6 col-lg-3 mb-3'>
                            {console.log(item)}
                            <Card item={item} finalPrice = {item.price} />
                          </div>
                        ))
                        : <div>No data found for this category</div>
                    }
                  </div>
                </div>
              ))
              : <div>Loading categories...</div>
          }
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
