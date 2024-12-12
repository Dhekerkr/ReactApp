import React,{useState} from "react";
import RecipeList from "./recipe";
import Navbar from "./navbar";

function Homesweet(){
    const [selectedCategory,setSelectedCategory]=useState("sweet");
    
    return(
        <div
        style={{
            backgroundImage: `url(/pictures/sweet.jpg)`,
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
            minHeight: "150vh",
            minWidth: "218vh",
          }}>
            <Navbar />
            <h1>Sweet recipes :</h1>
            <RecipeList selectedCategory={selectedCategory}/>
        </div>
    )
}
export default Homesweet;
