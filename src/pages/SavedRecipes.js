import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserId";
import axios from "axios";

export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://foodrecipe-95nl.onrender.com/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <>
      <h1 className="save-heading">Saved Recipes</h1>
      <div className="centered-container">
        <div className="container">
          <div className="save-container">
            {savedRecipes.map((recipe) => (
              <div className="save-card" key={recipe._id}>
                <h2 className="save-heading">{recipe.name}</h2>
                <p className="save-desc">{recipe.description}</p>
                <img
                  className="save-img"
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  height="200px"
                  width="200px"
                />
                <p className="save-cook-time">
                  Cooking Time: {recipe.cookingTime} minutes
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
