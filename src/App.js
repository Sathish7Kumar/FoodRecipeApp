import React, { useState } from "react";
import {  Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { CreateRecipe } from "./pages/CreateRecipe";
import { SavedRecipes } from "./pages/SavedRecipes";
import { Navbar } from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
const App = () => {
  return (
    <div className="App">
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </div>
  )
}

export default App


