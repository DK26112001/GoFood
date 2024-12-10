import React from 'react';
import './App.css'; // Import your custom styles
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screens/Home.jsx'; // Assuming Home.js is in the src/screens directory
import Login from './screens/Login'; // Assuming Login.js is in the src/screens directory
import Signup from './screens/Signup.jsx'; // Assuming Signup.js is in the src/screens directory
import Navbar from './Components/Navbar.jsx'; // Assuming Navbar.js is in the Components directory
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css'; // Ensure the correct path
import 'bootstrap/dist/js/bootstrap.bundle'; // Ensure the correct path
import { CartProvider } from './Components/ContextReducer'; // Assuming ContextReducer.js is in the Components directory
import Cart from './screens/Cart.jsx';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="App bg-dark text-light">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
