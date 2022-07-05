import React from 'react';
import { Link } from 'react-router-dom';
import './StylesSheets/Landing.css'
import Chefcito from './imagenes/Landing.jpg'

export function Landing(){
    return (
        <div className='landing'>
            <img className='logo' src={Chefcito} alt='chefcito'></img>
            <h1 className='titulo_pagina'>Augusto Loza</h1>
            <Link to='/home'>
                <button className='ingresar'>Entrar</button>
            </Link>
        </div>
    )
}

export default Landing;