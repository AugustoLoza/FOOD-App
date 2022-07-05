/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector,  } from 'react-redux';
import { useParams } from "react-router-dom";
import { updateRecipe, getRecipeById, getAllTypes } from "../redux/actions/index";
import { useNavigate } from 'react-router-dom';

export function UpdateRecipe(){
    const dispatch = useDispatch()
    const history = useNavigate()

    let { id } = useParams()

    const allDiets = useSelector((state) => state.types)
    const recipe = useSelector(state => state.recipe)

    function validate(input){
        let errors = {}

        if(((input.healthScore < 1) || (input.healthScore >100)) || isNaN(input.healthScore)){
            errors.healthScore = 'Ingresaste un HealthScore invalido.'
        }

        return errors
    }
    
    useEffect ( () => {
        dispatch(getRecipeById(id))
    },[])

    useEffect( () => {
        dispatch(getAllTypes())
    }, [])

    const [input, setInput] = useState({
        name: '',
        summary: '',
        healthScore: recipe.healthScore,
        image: '',
        steps: '',
        diets: recipe.diets
    })

    const [errors, setErrors] = useState({});

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })

        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }))
    }

    function handleDelete(d){
        setInput({
            ...input,
            diets: input.diets.filter(e => e !== d)
        })
    }

    function handleDiet(e){
        if(!input.diets.includes(e.target.value)){
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        
        if(Object.keys(errors).length === 0){
            if(input.healthScore){parseInt(input.healthScore)}
            dispatch(updateRecipe(id, input))
            history(`/my-recipes`)
        }
        

        
    }

    function cancel(e){
        e.preventDefault()
        history(`/${id}`)
    }

    return (
        <div className="cont-form">
            <div className="create_recipe">
                        <form className="form" onSubmit={handleSubmit}>
                            <h1>Actualiza tu propia receta!</h1>
                            
                            <div >
                                <label>Name of recipe: </label>
                                <input 
                                    type='text' 
                                    name='name' 
                                    placeholder= {recipe.name}
                                    value={input.name}
                                    onChange={handleChange}
                                >
                                </input>

                            </div>
                            
                            <div>
                                <label>Summary: </label>
                                <textarea 
                                    type='text' 
                                    name='summary'
                                    placeholder= {recipe.summary}
                                    value={input.summary}
                                    onChange={handleChange}
                                > 
                                </textarea>
                            </div>

                            <div>
                                <label>HealthScore:</label>
                                <input 
                                    type='text' 
                                    name='healthScore'
                                    placeholder= {recipe.healthScore}
                                    value={input.healthScore}
                                    onChange={handleChange}
                                    className={errors.healthScore && 'danger'}
                                    >
                                </input>
                                {errors.healthScore && <p className="danger">{errors.healthScore}</p>}
                            </div>

                            <div>
                                <label>Image: </label>
                                <input 
                                type='text' 
                                name='image'
                                placeholder= {recipe.image}
                                value={input.image}
                                onChange={handleChange}
                                >
                                </input>
                            </div>

                            <div>
                                <label>Steps: </label>
                                <textarea 
                                    type='text' 
                                    name='steps'
                                    placeholder= {recipe.steps}
                                    value={input.steps}
                                    onChange={handleChange}
                                >

                                </textarea>
                                
                            </div>
                            
                            <div className="class-select">
                                <label>Tipos de dieta</label>
                                <select onChange={handleDiet} defaultValue='Eligir tipos de dietas' >
                                    <option disabled>Eligir tipos de dietas</option>
                                    {
                                        allDiets.data && allDiets.data?.map(e => {
                                            return (
                                                <option key={e.name} value={e.name} name={e.name}>{e.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                                <button className="button-submit" onClick={cancel}>Cancelar</button>
                                <button className="button-submit" type="submit">Enviar Receta</button>
                            
                        </form>

                        <div className="my-diets">
                            <h3>Mis dietas</h3>
                            <div className="dietitas">
                                {input.diets.map(d => {
                                    return (
                                    <div key={d} className="tipo_dieta">
                                        <button className="cerrar" onClick={() => handleDelete(d)}>X</button>
                                        <p>{d}</p> 
                                    </div>
                                    )
                                }
                            )}
                            </div>
                        </div>
                    </div>
        </div>
    )
}

export default UpdateRecipe;