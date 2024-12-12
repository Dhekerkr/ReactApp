import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import "./newRecipe.css";
import { Spin } from "antd";
import Navbar from "./navbar";

const NewRecipe = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Automatically get userId from local storage
  const userId = localStorage.getItem("userId");

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validate form inputs
    if (!title || !userId || !category || !instructions || !image) {
      setMessage("All fields are required.");
      return;
    }

    if (ingredients.length === 0 || ingredients.some((ing) => ing.trim() === "")) {
      setMessage("Please add at least one valid ingredient.");
      return;
    }

    try {
      setLoading(true);
      // Add recipe to Firestore
      const docRef = await addDoc(collection(db, "recipes"), {
        title,
        idp: userId, // Use userId from local storage
        category,
        ingredients,
        instructions,
        image,
      });
      setLoading(false);
      setMessage("Recipe added successfully!");
      console.log("Recipe added with ID:", docRef.id);

      // Clear form
      setTitle("");
      setCategory("");
      setIngredients([""]);
      setInstructions("");
      setImage("");
    } catch (error) {
      console.error("Error adding recipe:", error);
      setMessage("Failed to add recipe. Please try again.");
    }
  };

  return (
    <div
      className="all"
      style={{
        backgroundImage: `url(/pictures/new.jpg)`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        minHeight: "100vh", // Ensures the container is at least as tall as the viewport
        minWidth: "218vh", // Ensures it does not exceed the viewport width
        overflow: "hidden", // Prevents scrollbars from appearing unnecessarily
      }}
    >
      <Navbar />
      <div className="new-recipe-container" >
        <h2>Add New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="Salty/Spicy">Salty/Spicy</option>
              <option value="Sweet">Sweet</option>
            </select>
          </div>
          <div>
            <label>Ingredients:</label>
            {ingredients.map((ingredient, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addIngredientField}>
              Add ingredient
            </button>
          </div>
          <div>
            <label>Instructions:</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            {loading ? <Spin size="large" className="custom-spin" /> : "Add Recipe"}
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
  
  };

export default NewRecipe;
