import React,{useState} from "react";
import RecipeList from "./recipe";
import Navbar from "./navbar";


function Homesaltyspicy(){
    const [selectedCategory,setSelectedCategory]=useState("Salty/Spicy");
    
    return(
        <div
        style={{
            backgroundImage: `url(/pictures/salty.jpg)`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            minHeight: '100vh',
            minWidth:'218.5vh',
          }}>
            <Navbar />
            <h1>Salty/Spicy recipes :</h1>
            <RecipeList selectedCategory={selectedCategory}/>
        </div>
    )
}
export default Homesaltyspicy;
