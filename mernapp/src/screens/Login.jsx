import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // useNavigate should be called inside the component

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        const errorMessages = json.errors ? json.errors.map(err => err.msg).join(', ') : "Enter valid credentials";
        console.log(errorMessages);
      } else {
        localStorage.setItem("userEmail",credentials.email)
        localStorage.setItem("authToken",json.authToken)
        console.log(localStorage.getItem("authToken"))
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch");
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input 
            type="email" 
            className="form-control" 
            name='email' 
            value={credentials.email} 
            onChange={onChange} 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp" 
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            name='password' 
            value={credentials.password} 
            onChange={onChange} 
            id="exampleInputPassword1" 
          />
        </div>
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to="/createuser" className='m-3 btn btn-danger'>I am a new user</Link>
      </form>
    </div>
  );
};

export default Login;