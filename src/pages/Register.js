import React , { useState } from 'react'
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.post("https://foodrecipe-95nl.onrender.com/auth/register", {
          username,
          password,
        });
        alert("Registration Completed! Now login.");
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
    <div className="auth">
      <div className="auth-container">
        <form onSubmit={handleSubmit}>
          <h2>FOOD RECIPE</h2>
          <h3 className='banner'>WELCOMES YOU !!!</h3>
          <h3 style={{textAlign:"center"}}>User-Registration</h3>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className='auth-btn' type="submit">Register</button>
          <p>Already have an account : <Link className='auth-link' to='/login'>LOGIN</Link> </p>
        </form>
      </div>
      </div>
    );
}

export default Register