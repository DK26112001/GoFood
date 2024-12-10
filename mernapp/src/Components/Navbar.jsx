import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from React Router
import  Badge from 'react-bootstrap/Badge'

const Navbar = () => {
  const navigate = useNavigate();
    

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success" style={{ paddingLeft: '0', paddingRight: '0' }}>
      <div className="container-fluid" style={{ paddingLeft: '0', paddingRight: '0' }}>
        <Link className="navbar-brand fs-1 fst-italic" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
            </li>
            {localStorage.getItem("authToken") && (
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
              </li>
            )}
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className='d-flex'>
              <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
              <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
            </div>
          ) : (
            <div>
              <div className='btn bg-white text-success mx-2'>
               <Link to="/cart"> My Cart {" "}</Link>
              </div>
              <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
