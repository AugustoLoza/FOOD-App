import React, {useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { filterByDiets, OrderByName, orderByScore} from '../redux/actions/index'
import './StylesSheets/FilterSearch.css'

export function FilterSearch({allDiets, setCurrentPage, setOrder, typeOrder, setTypeOrder, order}){

    const dispatch = useDispatch()

    const [, setTypes] = useState("allPokemon");
    const AllDiets = useSelector((state) => state.types);

    /*function handleFilterDiets(e){
        dispatch(filterByDiets(e.target.value))
        setCurrentPage(1)
    }*/
    function handleFilterByTypes(e) {
        e.preventDefault();
        dispatch(filterByDiets(e.target.value));
        setTypes(e.target.value);
        setCurrentPage(1)
      }

    /*function handleSortName(e){
        setOrder(e.target.value)
        dispatch(OrderByName([e.target.value, typeOrder]))
        setCurrentPage(1)
    }*/
    function  handleSortName(e) {
        e.preventDefault();
        dispatch(OrderByName(e.target.value));
        setOrder(`Order by ${e.target.value}`);
        setCurrentPage(1)
      }

   /* function handleScoreSort(e){
        setTypeOrder(e.target.value)
        dispatch(orderByScore([order, e.target.value]))
        setCurrentPage(1)
    }*/
    function handleScoreSort(e) {
        e.preventDefault();
        dispatch(orderByScore(e.target.value));
        setOrder(`Order by ${e.target.value}`);
        setCurrentPage(1)
      }

    return (
        <div className='filter_contenedor'>
                  <select
            className='filter_types'
            defaultValue="name"
            onChange={(e) => handleSortName(e)}
          >
            <option class="options" value="name" disabled>
              Name
            </option>
            <option class="options" value="aToZ">
              A - Z
            </option>
            <option class="options" value="zToA">
              Z - A
            </option>
          </select>

          <select
            class='filter_types'
            defaultValue="score"
            onChange={(e) => handleScoreSort(e)}
          >
            <option class="options" value="score" disabled>
              HealthScore
            </option>
            <option class="options" value="minToMax">
              Min to Max
            </option>
            <option class="options" value="maxToMin">
              Max to Min
            </option>
          </select>
          <select
            className='filter_types'
            defaultValue="Types"
            onChange={(e) => handleFilterByTypes(e)}
            id="type-select"
          >
            <option class="options" value="Types" disabled>
              Types
            </option>
            <option class="options" value="allTypes">
              All Types
            </option>
            {AllDiets &&
              AllDiets
                .sort(function (a, b) {
                  if (a.name < b.name) return -1;
                  if (a.name > b.name) return 1;
                  return 0;
                })
                .map((t) => (
                  <option class="options" value={t.name} key={t.name}>
                    {t.name}
                  </option>
                ))}
          </select>

            
              

                
                
            </div>
    )
}