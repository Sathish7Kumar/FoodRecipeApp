import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useCookies } from "react-cookie";
import ReorderIcon from '@mui/icons-material/Reorder';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
export const Navbar = () => {
  const [expandNavbar, setExpandNavbar] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setExpandNavbar(false);
  }, [location]);

  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar" id={expandNavbar ? "open" : "close"}>
      <div className="toggleButton">
        <button className="t-button"
          onClick={() => {
            setExpandNavbar((prev) => !prev);
          }}
        >
          {expandNavbar ? <CloseIcon /> : <ReorderIcon />}
        </button>
      </div>
      <div className="links">
        <Link className="link-heading" to="/">Home</Link>
        <Link className="link-heading" to="/create-recipe">CreateRecipe</Link>
        <Link className="link-heading" to="/saved-recipes">Saved Recipes</Link>
        {!cookies.access_token ? (
        <Link to="/login">Login</Link>
      ) : (
        <div>
        <button className="logout-btn" onClick={logout}><LogoutIcon style={{color:"black"}}/></button>
        </div>
      )}
      </div>
    </div>
  );
}
