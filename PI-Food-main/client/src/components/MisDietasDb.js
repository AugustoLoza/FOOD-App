import React from 'react';
import { getAllTypes, } from '../redux/actions/index';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./StylesSheets/MisDietasDb.css"


export default function Misdietas(){


    const dispatch = useDispatch()
   
    const allDiets = useSelector(state => state.types)

    useEffect( () => {
        dispatch(getAllTypes())
    }, [dispatch])

    return (
    
        <div className='filter_contenedor'>
        
        <ul>
  
  {allDiets &&
    allDiets
      
      .map((t) => (
        <li class="options" value={t.name} key={t.name}>
          <a className='text'>{t.name}</a>
        </li>
      ))}
</ul>

  
    

      
      
  </div>
    )

}