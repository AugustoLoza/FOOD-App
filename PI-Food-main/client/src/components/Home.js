import React from 'react';
import { getAllRecipes,  getAllTypes,searchByName, } from '../redux/actions/index';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import RecipeCard from './RecipeCard';
import Paginado from './Paginado';
import { FilterSearch } from './FilterSearch';

import './StylesSheets/Home.css';
import { NavBar } from './NavBar';
import Gorrito from './imagenes/Gorrito.jpg'
import  Loader  from "./imagenes/rodrigosloader.gif"




export function Home(){

    const dispatch = useDispatch()
    const allRecipes = useSelector(state => state.backUp)

    const allDiets = useSelector(state => state.types)

    const [name, setName] = useState("");
    const [order, setOrder] = useState('')
    const [typeOrder, setTypeOrder] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)

    

    const indexLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexLastRecipe - recipesPerPage
    //const currentRecipes = allRecipes.data?.slice(indexOfFirstRecipe,indexLastRecipe)
    const currentRecipes = useSelector((state) =>
    state.backUp ? state.backUp.slice(indexOfFirstRecipe,indexLastRecipe) : false
  );
  const handleInput = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchByName(name));
    setCurrentPage(1);
  };




    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect ( () => {
        dispatch(getAllRecipes())
    },[dispatch])

    useEffect( () => {
        dispatch(getAllTypes())
    }, [dispatch])

    const err = useSelector((state) => state.error)
    let errorRender = useSelector((state) => state.errorRender);
    

    if (errorRender.length === 0) {
        return (
          <div className='Loader'>
            <img src={Loader}></img>
          </div>
        );
      } else{

    return(
        <div className='home'>

            
            <NavBar></NavBar>
            
            
            <div className='filtros'>
                <FilterSearch 
                    allDiets={allDiets} 
                    setCurrentPage={setCurrentPage} 
                    setOrder={setOrder}
                    typeOrder = {typeOrder}
                    setTypeOrder = {setTypeOrder}
                    order = {order}
                />
              <div>
            <form onSubmit={handleSubmit}>
              <input
                className="input"
                type="text"
                placeholder="  Write a name here..."
                onChange={handleInput}
              />
              <button type="submit" className="boton">
                Search
              </button>
            </form>
          </div>
                
            </div>
    
            {
                !err   ? 
                <>
                    {
                        (!currentRecipes) ?
                        <><div className='allrecetas-error'><img src={Loader}></img></div> </> :
                        <>
                            <div className='recetas'>
                                {currentRecipes?.map(e => 
                                <RecipeCard 
                                    key={e.id} 
                                    id={e.id}   
                                    name={e.name} 
                                    image={e.image} 
                                    type={e.diets}
                                />)}
                            </div>
                            <div className='pages'>
                                <Paginado 
                                recipesPerPage={recipesPerPage} 
                                allRecipes={allRecipes.length} 
                                pagination={pagination}
                                currentPage={currentPage}
                                />
                            </div>
                        </>
                    }
                </> :
                <>
                    <div className='allrecetas-error'>
                    <div className='allrecetas-error'><img src={Loader}></img></div>
                    </div>
                </>
            }
        </div>
    )}
}

export default Home;