import React,{useEffect,useState} from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import "./recipe.css"
import { Col, Row, Spin } from "antd";
import { useNavigate } from "react-router-dom";



function Recipe({ id, title, image, shortView }) {
    const navigate = useNavigate();
  
    // Navigate to the detailed recipe page when clicked
    const handleClick = () => {
      navigate(`/recipes/${id}`);
    };
  
    return (
      <div className="recipe-container" onClick={handleClick}>
        <img className="recipe-image" src={image} alt={title} />
        <h3 className="recipe-title">{title}</h3>
      </div>
    );
  }

  function RecipeList({ selectedCategory }) {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchRecipes = async () => {
        setLoading(true);
        try {
          const recipesRef = collection(db, "recipes");
          const q = query(recipesRef, where("category", "==", selectedCategory));
          const querySnapshot = await getDocs(q);
          const fetchedRecipes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRecipes(fetchedRecipes);
        } catch (error) {
          console.error("Error fetching recipes:", error);
        }
        setLoading(false);
      };
  
      fetchRecipes();
    }, [selectedCategory]);
  
    if (loading) return <div className="spinner-container"><Spin size="large"/> <p>Loading recipes...</p></div>
  
    return (
        <div className="recipe-list-container">
          
          {recipes.map((recipe) => (
            <Recipe
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                image={recipe.image}    
            />
          ))}
        </div>
      );
  }
  
  export default RecipeList;    