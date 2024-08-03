import React from 'react';

const Carousal = () => {
  return (
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
              <form className="d-flex" style={{ width: '50%' }}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
              </form>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Carousal;
