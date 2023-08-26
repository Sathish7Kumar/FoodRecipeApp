import React , { useState } from 'react'
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [_, setCookies] = useCookies(["access_token"]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await axios.post("https://foodrecipe-95nl.onrender.com/auth/login", {
        username,
        password,
      });

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.userID);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth">
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>FOOD RECIPE</h2>
        <h3 style={{textAlign:"center"}}>User-Login</h3>
        <h3 className='banner'>WELCOMES YOU !!!</h3>
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
        <button className='auth-btn' type="submit">Login</button>
        <p>Don't have an account : <Link className='auth-link' to='/register'>REGISTER</Link> </p>
      </form>
    </div>
    </div>
  );
}

export default Login

