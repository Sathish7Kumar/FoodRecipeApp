import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserId";
import axios from "axios";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://foodrecipe-95nl.onrender.com/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://foodrecipe-95nl.onrender.com/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("https://foodrecipe-95nl.onrender.com/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <>
    <h1 className="home-heading" >Recipes</h1>
    <div className="home-container">
      {recipes.map((recipe) => (
        <div className="recipe-card" key={recipe._id} >
        <div className="card-header">
        <h2 className="h-recipe">{recipe.name}</h2>
        <button
          onClick={() => saveRecipe(recipe._id)}
          disabled={isRecipeSaved(recipe._id)}
          className="recipe-save"
        >
          {isRecipeSaved(recipe._id) ? "Recipe Saved" : "Save this Recipe"}
        </button>
        </div>
        <img src={recipe.imageUrl} alt={recipe.name} />
        <div className="recipe-details">
          <p>
            <strong className="r-ingredients">Ingredients:</strong>
          </p>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}> * {ingredient}</li>
            ))}
          </ul>
          <p>
            <strong className="r-instruction">Instructions:</strong>
          </p>
          <p className="instruction">{recipe.instructions}</p>
          <p className="r-c-time"> 
            <strong>Cooking Time :</strong> <i className="r--c--time">{recipe.cookingTime}</i>  minutes
          </p>
        </div>
      </div>
      ))}
    </div>
    </>
  );
};
