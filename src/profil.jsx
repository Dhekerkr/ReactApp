import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import "./profil.css";
import { Spin, Tooltip, Modal, Input, Button, List, Space } from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import Navbar from "./navbar";

const Profil = () => {
  const userId = localStorage.getItem("userId"); // Retrieve the user ID from localStorage
  const [person, setPerson] = useState(null); // State for person data
  const [recipes, setRecipes] = useState([]); // State for recipes data
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State for the selected recipe for editing
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [editedRecipe, setEditedRecipe] = useState(null); // State for editing recipe data

  useEffect(() => {
    const fetchPersonAndRecipes = async () => {
      setLoading(true);
      try {
        if (!userId) {
          console.error("User ID not found in localStorage.");
          setLoading(false);
          return;
        }

        // Fetch person details
        const personDocRef = doc(db, "people", userId); // Reference to the person's document
        const personSnap = await getDoc(personDocRef);

        if (personSnap.exists()) {
          const personData = { id: personSnap.id, ...personSnap.data() };
          setPerson(personData); // Set person state
        } else {
          console.error("Person not found.");
          setPerson(null);
        }

        // Fetch recipes associated with this person
        const recipesQuery = query(
          collection(db, "recipes"),
          where("idp", "==", userId) // Ensure `idp` matches the user ID
        );
        const recipesSnap = await getDocs(recipesQuery);

        const fetchedRecipes = recipesSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(fetchedRecipes); // Set recipes state
      } catch (error) {
        console.error("Error fetching person or recipes:", error);
      }
      setLoading(false);
    };

    fetchPersonAndRecipes();
  }, [userId]); // Re-run the effect when the user ID changes

  const deleteRecipe = async (recipeId) => {
    try {
      await deleteDoc(doc(db, "recipes", recipeId)); // Delete the recipe from Firestore
      setRecipes(recipes.filter((recipe) => recipe.id !== recipeId)); // Update the state
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const openEditModal = (recipe) => {
    setSelectedRecipe(recipe);
    setEditedRecipe({ ...recipe, ingredients: [...recipe.ingredients] }); // Clone data for editing
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecipe(null);
    setEditedRecipe(null);
  };

  const handleRecipeChange = (field, value) => {
    setEditedRecipe((prev) => ({ ...prev, [field]: value }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...editedRecipe.ingredients];
    newIngredients[index] = value;
    setEditedRecipe((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setEditedRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredient = (index) => {
    const newIngredients = [...editedRecipe.ingredients];
    newIngredients.splice(index, 1);
    setEditedRecipe((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const saveEditedRecipe = async () => {
    if (!editedRecipe || !editedRecipe.id) return;

    try {
      await updateDoc(doc(db, "recipes", editedRecipe.id), {
        title: editedRecipe.title,
        category: editedRecipe.category,
        ingredients: editedRecipe.ingredients,
        instructions: editedRecipe.instructions,
        image: editedRecipe.image,
      });
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === editedRecipe.id ? { ...editedRecipe } : recipe
        )
      );
      setIsModalVisible(false);
      setSelectedRecipe(null);
      setEditedRecipe(null);
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <Spin size="large" />
      </div>
    ); // Show loading spinner
  }

  if (!person) {
    return <p>Person not found.</p>; // Handle case when person is not found
  }

  return (
    <div>
      <Navbar />
      <div className="profil-layout"
      style={{
        backgroundImage: `url(/pictures/backg.jpg)`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        minHeight: "100vh",
        minWidth: "212.5vh",
        paddingTop:"70px"
      }}>
        <div className="profil-header">
          <Tooltip
            title={
              <div>
                <p>Name: {person.firstName} {person.lastName}</p>
                <p>Email: {person.email}</p>
                <p>Phone: {person.phone}</p>
                <p>Address: {person.address}</p>
                <p>Age: {person.age}</p>
                <p>Gender: {person.gender}</p>
              </div>
            }
            placement="right"
          >
            <UserOutlined className="user-icon" />
          </Tooltip>
          <h2>{person.firstName} {person.lastName}</h2>
        </div>

        <div className="recipes-section">
          <h4>My Recipes:</h4>
          {recipes.length > 0 ? (
            <div className="recipe-grid">
              {recipes.map((recipe) => (
                <div className="recipe-card" key={recipe.id}>
                  <h5>{recipe.title}</h5>
                  <p>Category: {recipe.category}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <div className="recipe-actions">
                    <EditOutlined
                      className="recipe-icon edit-icon"
                      onClick={() => openEditModal(recipe)}
                    />
                    <DeleteOutlined
                      className="recipe-icon delete-icon"
                      onClick={() => deleteRecipe(recipe.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No recipes available.</p>
          )}
        </div>
      </div>

      {/* Edit Recipe Modal */}
      <Modal
        title="Edit Recipe"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="save" type="primary" onClick={saveEditedRecipe}>
            Save
          </Button>,
        ]}
      >
        {editedRecipe && (
          <div>
            <Input
              placeholder="Title"
              value={editedRecipe.title}
              onChange={(e) => handleRecipeChange("title", e.target.value)}
              style={{ marginBottom: 20 }}
            />
            <Input
              placeholder="Category"
              value={editedRecipe.category}
              onChange={(e) => handleRecipeChange("category", e.target.value)}
              style={{ marginBottom: 20 }}
            />
            <Input.TextArea
              placeholder="Instructions"
              value={editedRecipe.instructions}
              onChange={(e) => handleRecipeChange("instructions", e.target.value)}
              style={{ marginBottom: 20 }}
            />
            <Input
              placeholder="Image URL"
              value={editedRecipe.image}
              onChange={(e) => handleRecipeChange("image", e.target.value)}
              style={{ marginBottom: 20 }}
            />
            <h4>Ingredients:</h4>
            <List
              dataSource={editedRecipe.ingredients}
              renderItem={(ingredient, index) => (
                <List.Item
                  actions={[
                    <MinusOutlined
                      key="remove"
                      onClick={() => removeIngredient(index)}
                    />,
                  ]}
                >
                  <Input
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                  />
                </List.Item>
              )}
            />
            <Button
              icon={<PlusOutlined />}
              onClick={addIngredient}
              style={{ marginTop: 10 }}
            >
              Add Ingredient
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Profil;


