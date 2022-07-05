import {GET_ALL_RECIPES, GET_ALL_TYPES, GET_RECIPE_BY_ID,DELETE_RECIPE, UPDATE_RECIPE,
        FILTER_BY_DIETS, FILTER_ALPHA_SCORE,
        POST_RECIPE, GET_RECIPE_BY_NAME,
        ADD_FAVORITE, DELETE_FAVORITE} 
from '../actions/index'

function sortAsc(x, y){
    if (x.name < y.name) {return -1;}
    if (x.name > y.name) {return 1;}
    return 0;
}

function sortDesc(x,y){
    if (x.name > y.name) {return -1;}
    if (x.name < y.name) {return 1;}
    return 0;
}

const initialState = {
    recipes:[],
    all_recipes:[],
    recipe:{},
    types:[],
    error:false,
    favourite_recipes:[]
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_RECIPES:
            
            if(action.payload.data.length === 0){
                return{
                    ...state,
                    recipes: action.payload,
                    all_recipes:action.payload,
                    error:true
                }
            }

            return{
                ...state,
                recipes: action.payload,
                all_recipes:action.payload,
                error:false
            }
        case GET_ALL_TYPES:

            return{
                ...state,
                types:action.payload
            }
        case GET_RECIPE_BY_ID:
            console.log(action.payload.data)
            if(action.payload.data.error){
                return {
                    ...state,
                    recipe:action.payload.data,
                    error:true
                }
            }else{
                return {
                    ...state,
                    recipe:action.payload.data,
                    error:false
                }
            }
            
        case GET_RECIPE_BY_NAME:
            if(action.payload.data.length === 0){
                return{
                    ...state,
                    recipes:action.payload,
                    error: true
                }
            }else{
                return{
                    ...state,
                    recipes:action.payload,
                    error: false
                }
            }
            
        case POST_RECIPE:
            
           
            return { ...state, all_recipes: state.all_recipes.concat(action.payload) };
        case DELETE_RECIPE:
            return {
                ...state
            }
        case UPDATE_RECIPE:
                return {
                    ...state
                }
        case FILTER_BY_DIETS:
            let all_recipes = state.all_recipes.data;
            const diet_type = action.payload
            let total  = {data : all_recipes.filter(e => e.diets.includes(diet_type))}

            return{
                ...state,
                recipes: total
            }
        case FILTER_ALPHA_SCORE:
            const [ord, type] =action.payload
            let r, rf;

            if(ord && type){
                let all_recipes = state.all_recipes.data;
                let filter_recets = state.recipes.data
                if(type === 'alph'){
                    if(ord === 'asc'){
                        r = all_recipes.sort(sortAsc)
                        rf = filter_recets.sort(sortAsc)
                    }else{
                        r = all_recipes.sort(sortDesc)
                        rf = filter_recets.sort(sortDesc)
                    }
                }else if(type==='variety'){
                    if(ord === 'asc'){
                        r = all_recipes.sort((a,b) => a.diets.length - b.diets.length)
                        rf = filter_recets.sort((a,b) => a.diets.length - b.diets.length)
                    }else{
                        r = all_recipes.sort((a,b) => b.diets.length - a.diets.length)
                        rf = filter_recets.sort((a,b) => b.diets.length - a.diets.length)
                    }
                }else{
                    if(ord === 'asc'){
                        r = all_recipes.sort((a,b) => a.healthScore - b.healthScore)
                        rf = filter_recets.sort((a,b) => a.healthScore - b.healthScore)
                    }else{
                        r = all_recipes.sort((a,b) => b.healthScore - a.healthScore)
                        rf = filter_recets.sort((a,b) => b.healthScore - a.healthScore)
                    }
                }
            }else{
                return {...state} 
            }
            let t = {data:r}
            let tf = {data:rf}
            return {
                ...state,
                all_recipes: t,
                recipes: tf
            } 
        case ADD_FAVORITE:
            return {
                ...state,
                favourite_recipes: state.favourite_recipes.concat(action.payload)
            }
        case DELETE_FAVORITE:
            return {
                ...state,
                favourite_recipes: state.favourite_recipes.filter(r => r.id.toString() !== action.payload)
            }
        default:
            return state
    }
}

export default rootReducer;