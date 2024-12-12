import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";
import "./recipeDetails.css";
import Navbar from "./navbar";
import ReactStars from "react-stars";

function RecipeDetails() {
  const { id } = useParams(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, "recipes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRecipe({ id: docSnap.id, ...docSnap.data() });

          // If recipe exists, set the rating state to the current average rating
          if (docSnap.data().averageRating) {
            setRating(docSnap.data().averageRating);
          }
        } else {
          console.error("No such recipe!");
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    try {
      const recipeRef = doc(db, "recipes", id);
      await updateDoc(recipeRef, {
        comments: arrayUnion(newComment),
      });

      // Update local state with the new comment
      setRecipe((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), newComment],
      }));

      setNewComment("");
      setShowPopup(false);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleRatingSubmit = async () => {
    if (rating === 0) {
      setMessage("Please select a rating.");
      return;
    }

    try {
      const recipeRef = doc(db, "recipes", id);
      const currentRecipe = recipe; // Store the current recipe to get the data

      const updatedRatingCount = currentRecipe.ratingCount ? currentRecipe.ratingCount + 1 : 1;
      const updatedAverageRating =
        (currentRecipe.averageRating * (currentRecipe.ratingCount || 0) + rating) / updatedRatingCount;

      await updateDoc(recipeRef, {
        averageRating: updatedAverageRating,
        ratingCount: updatedRatingCount,
      });

      // Update local state with the new average rating
      setRecipe((prev) => ({
        ...prev,
        averageRating: updatedAverageRating,
        ratingCount: updatedRatingCount,
      }));

      setMessage("Thank you for your rating!");
    } catch (error) {
      console.error("Error submitting rating:", error);
      setMessage("Failed to submit your rating. Please try again.");
    }
  };

  if (loading) return <p>Loading recipe details...</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div classname="all"
    style={{
      backgroundImage: `url(/pictures/detail.jpg)`,
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
      backgroundPosition: "center",
      height: "257vh",
      width: "218vh",
    }}>
    <div className="recipe-details-container">
      <Navbar />
      <h1>{recipe.title}</h1>

      {/* Rating Stars under Title */}
      <div className="rating-stars">
        <ReactStars
          count={5}
          value={rating}
          onChange={handleRatingChange}
          size={24}
          activeColor="#ffd700"
        />
        <button onClick={handleRatingSubmit}>Submit Rating</button>
        {message && <p>{message}</p>}
      </div>

      <img src={recipe.image} alt={recipe.title} className="recipe-details-image" />
      <h3>Category: {recipe.category}</h3>
      <h4>Ingredients:</h4>
<ul className="recipe-ingredients">
  {recipe.ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ))}
</ul>

<h4>Instructions:</h4>
<p>{recipe.instructions}</p>

<h4>Comments:</h4>
<ul className="recipe-comments">
  {recipe.comments && recipe.comments.map((comment, index) => (
    <li key={index}>{comment}</li>
  ))}
</ul>
      <button className="add-comment-button" onClick={() => setShowPopup(true)}>
        Add Comment
      </button>

      {/* Add Comment Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Add a Comment</h3>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
            ></textarea>
            <div className="popup-actions">
              <button onClick={handleAddComment}>Submit</button>
              <button onClick={() => setShowPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default RecipeDetails;
