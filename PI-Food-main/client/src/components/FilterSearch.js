import React from 'react';
import { useDispatch } from 'react-redux';
import { filterByDiets, filterAlphaScore } from '../redux/actions/index'
import './StylesSheets/FilterSearch.css'

export function FilterSearch({allDiets, setCurrentPage, setOrder, typeOrder, setTypeOrder, order}){

    const dispatch = useDispatch()

    function handleFilterDiets(e){
        dispatch(filterByDiets(e.target.value))
        setCurrentPage(1)
    }

    function handleSort(e){
        setOrder(e.target.value)
        dispatch(filterAlphaScore([e.target.value, typeOrder]))
        setCurrentPage(1)
    }

    function handleTypeSort(e){
        setTypeOrder(e.target.value)
        dispatch(filterAlphaScore([order, e.target.value]))
        setCurrentPage(1)
    }

    return (
        <div className='filter_contenedor'>
                <select className='filter_types' defaultValue='Filtrar por orden' onChange={e => handleSort(e)}>
                    <option disabled>Filtrar por orden</option>
                    <option value='asc'>Orden ascendente</option>
                    <option value='desc'>Orden descendente</option>
                </select>

                <select className='filter_types' onChange={e => handleFilterDiets(e)}  defaultValue='Filtrar por tipo de dieta'>
                    <option disabled>Filtrar por tipo de dieta</option>
                    {allDiets.data?.map(e => (
                        <option value={e.name}>{e.name}</option>
                    ))}
                </select>

                <select className='filter_types' onChange={e => handleTypeSort(e)} defaultValue='Tipo de orden'>
                    <option disabled>Tipo de orden</option>
                    <option value='alph'>Ordenar alfabeticamente</option>
                    <option value='score'>Ordenar por HealthScore</option>
                    <option value='variety'>Ordenar por variedad de dietas</option>
                </select>
                
            </div>
    )
}