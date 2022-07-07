import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { searchByName } from "../redux/actions";
import './StylesSheets/SearchBar.css'

export function SearchBar(setCurrentPage){
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()

    function handleOnChange(e){
        e.preventDefault();
        setSearch(e.target.value);
        
    }

    function handleSubmit(e){
        e.preventDefault();
       
            dispatch(searchByName(search));
            setCurrentPage(1);
        
        
        
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input className="input" type="text" onChange={handleOnChange} value={search} />
                <input className="boton" type="submit" value="Buscar" />
            </form>
        </div>
    )
}