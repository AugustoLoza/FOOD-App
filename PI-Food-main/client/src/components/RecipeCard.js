import React from "react";
import { Link } from "react-router-dom";
import './StylesSheets/RecipeCard.css'

export default function RecipeCard({id, name, image, type}){
    function capitalize(str){
        const lower = str.toLowerCase()
        return str.charAt(0).toUpperCase()+lower.slice(1)
    }
    return (
        
            <div className="card">
                <div className="container">
                    <Link to={`/${id}`}>
                    <h3 className="recipe_name">{name}</h3>
                    
                    <img className="foto_comida" src={image} alt='foto_receta'></img>
                    </Link>

                    <p>Types of diets:</p>
                    <ul className="list_of_diets">
                        
                        {type.map(e => (<li className="diets">- {capitalize(e)}</li>))}
                    </ul>
                </div>
            </div>
        
    )
}