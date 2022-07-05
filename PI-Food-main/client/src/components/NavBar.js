import React from 'react';
import Chefcito from './imagenes/kisspng-chef-cartoon-clip-art-chef-5ab9426af1a5a0.5282250815220906029898.png';
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
                        <img src={Chefcito} alt='chefcito'></img>
                    </Link>
                    <Link to='/create'><button className='create-recipe'>Crear Receta</button></Link>
                    <Link to='/my-recipes'><button className='create-recipe'>Mis recetas</button></Link>
                    <Link to='/favourites'><button className='create-recipe'>Favoritos</button></Link>
                    
                </div>
                    
                <div className='right'>
                    <Link to='/home'><button className='casa' onClick={handleRecets}><img src={casa} alt='home'></img></button></Link>
                </div>
        </div>
    )
}