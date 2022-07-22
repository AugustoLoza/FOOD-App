import React from 'react';
import Cheff from "./imagenes/Cheff.png";
import casa from './imagenes/home.png';
import {Link} from 'react-router-dom';
import './StylesSheets/NavBar.css'
import { useDispatch } from 'react-redux';
import { getAllRecipes } from '../redux/actions';


export function NavBar(){

    const dispatch = useDispatch()

    function handleRecets(){
        dispatch(getAllRecipes())
    }

    return(
        <div className='navbar'>
                <div className='left'>
                    <Link className='link-landing' to='/'>
                        <img src={Cheff} alt='chefcito'></img>
                    </Link>
                    <Link to='/create'><button className='create-recipe'>Crear Receta</button></Link>
                    <Link to='/my-recipes'><button className='create-recipe'>Mis recetas</button></Link>
                    <Link to="/my-Diets"><button className='create-recipe'>Mis Dietas</button></Link>
                    
                    
                </div>
                    
                <div className='right'>
                    <Link to='/home'><button className='casa' onClick={handleRecets}><img src={casa} alt='home'></img></button></Link>
                </div>
        </div>
    )
}