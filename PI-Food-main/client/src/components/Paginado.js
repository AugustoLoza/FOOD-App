import React from "react";
import './StylesSheets/Paginado.css'

export default function Paginado({recipesPerPage, allRecipes, pagination, currentPage}){
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(allRecipes/recipesPerPage);i++){
        pageNumbers.push(i)
    }

    return (
        <div >

            <ul className="paginado">
                {
                    (currentPage >1) ?
                    <><li><a className="directionButton" onClick={() => pagination(currentPage - 1)}> Previous</a></li></>
                    :<></>
                }
                {pageNumbers && 
                pageNumbers.map(n => 
                <li className="page" key={n}>
                    <a className="numberA" onClick={() => pagination(n)}>{n}</a>
                </li>)}
                {
                    (currentPage < pageNumbers.length) ?
                    <><li><a className="directionButton" onClick={() => pagination(currentPage + 1)}>Next </a></li></>:
                    <></>
                }
            </ul>
        </div>
    )
}