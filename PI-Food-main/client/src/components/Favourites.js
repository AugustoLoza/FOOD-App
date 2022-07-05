import React from "react";
import { useSelector } from "react-redux";
import { NavBar } from './NavBar';
import  Gorrito  from './imagenes/Gorrito.jpg'
//import  Loader  from "./imagenes/rodrigosloader.gif";
import  RecipeCard  from './RecipeCard'
import './StylesSheets/Favourites.css'

export default function Favourites(){
    const recipes_favourites = useSelector(state => state.favourite_recipes)
    
    return (
        <div className="list_favorites">
            <NavBar />
            {
                (recipes_favourites.length !== 0) ? 
                <>
                    
                        
                            <div className='recetas'>
                                {recipes_favourites?.map(e => 
                                <RecipeCard 
                                    key={e.id} 
                                    id={e.id}   
                                    name={e.name} 
                                    image={e.image} 
                                    type={e.diets}
                                />)}
                            </div>
                            
                        
                    
                </> :
                <>
                    <div className='fav-error'>
                        <div>
                            <img className="foto_error" src={Gorrito} alt='gorrito'></img>
                            <h1>No tienes recetas favoritas...</h1>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}


