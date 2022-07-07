import React from 'react';
import { getAllRecipes,  getAllTypes} from '../redux/actions/index';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RecipeCard from './RecipeCard';
import Paginado from './Paginado';
import { FilterSearch } from './FilterSearch';
import { SearchBar } from './SearchBar';
import './StylesSheets/Home.css';
import { NavBar } from './NavBar';
import Gorrito from './imagenes/Gorrito.jpg'
import  Loader  from "./imagenes/rodrigosloader.gif"




export function Home(){

    const dispatch = useDispatch()
    const allRecipes = useSelector(state => state.recipes)

    const allDiets = useSelector(state => state.types)

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
    let errorRender = useSelector((state) => state.errorRender)

    if (err === 0) {
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

                <SearchBar />
            </div>
    
            {
                !err ? 
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
                        <div>
                            <img className="foto_error" src={Gorrito} alt='gorrito'></img>
                            <h1>No se encontraron recetas</h1>
                        </div>
                    </div>
                </>
            }
        </div>
    )}
}

export default Home;

/*select className='filter_types' onChange={e => handleFilterDiets(e)}  defaultValue='Filtrar por tipo de dieta'>
<option disabled>Filtrar por tipo de dieta</option>
{allDiets?.map(e => (
    <option value={e.name}>{e.name}</option>
))}
</select>


                <select className='filter_types' defaultValue='Filtrar por orden' onChange={e => handleSort(e)}>
                    <option disabled>Filtrar por orden</option>
                    <option value='asc'>Orden ascendente</option>
                    <option value='desc'>Orden descendente</option>
                </select>
                
                    <select className='filter_types' onChange={e => handleFilterDiets(e)}  defaultValue='all'>
<option >Filtrar por tipo de dieta</option>
{allDiets?.map(e => (
    <option value={e.name}>{e.name}</option>
))}
</select>*/