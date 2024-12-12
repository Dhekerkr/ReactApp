import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profil from "./profil"; // Import Profil component
import Navbar from "./navbar"; // Import Navbar component
import { people } from "./person"; // Import person data
import { recipes } from "./data"; // Import recipes data
import RecipeDetails from "./recipeDetails";

const App = () => {
  console.log(recipes);
  
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Ensure you're passing the correct person and recipes */}
        <Route
          path="/profile/" element={<Profil  />}
        />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
