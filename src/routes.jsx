import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navbar"; // Import Navbar
import Home from "./home"; // Import Home component
import Profil from "./profil"; // Import Profil component
import Homesweet from "./homesweet";
import Homesaltyspicy from "./homesalty";
import NewRecipe from "./newRecipe";
import RecipeDetails from "./recipeDetails";
import Start from "./startpage";
import AuthPage from "./auth";

const AppRoutes = () => {
  return (
    <Router>
      {/* Add the Navbar */}
      

      {/* Define Routes */}
      <Routes>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/" element={<Profil />} />
        <Route path="/sweet" element={<Homesweet />}/>
        <Route path="/Salty-Spicy" element={<Homesaltyspicy />}/>
        <Route path="/add-recipe" element={<NewRecipe />}/>
        <Route path="/recipes/:id" element={<RecipeDetails />}/>
    
      </Routes>
    </Router>
  );
};

export default AppRoutes;
