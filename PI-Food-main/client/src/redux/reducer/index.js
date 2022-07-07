import {GET_ALL_RECIPES, GET_ALL_TYPES, GET_RECIPE_BY_ID,DELETE_RECIPE, UPDATE_RECIPE,
        FILTER_BY_DIETS, ORDER_BY_NAME,
        POST_RECIPE, GET_RECIPE_BY_NAME,
        ADD_FAVORITE, DELETE_FAVORITE, ORDER_BY_SCORE, } 
from '../actions/index'



const initialState = {
    recipes:[],
    all_recipes:[],
    recipe:{},
    types:[],
    error:true,
    favourite_recipes:[],
    backUp:[],
    errorRender: [],
    
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){

       
        case GET_ALL_RECIPES:
            
            return {
                ...state,
                all_recipes: action.payload,
                recipes: action.payload,
                backUp: action.payload,
                errorRender: action.payload,
                error:false
                
                
                
              };
        case GET_ALL_TYPES:

            return { ...state, types: action.payload };
        case GET_RECIPE_BY_ID:

            if(action.payload.length !== 0){
                return{
                    ...state,
                    recipe:action.payload,
                    error: true
                }
            }else{
                return{
                    ...state,
                    recipe:action.payload,
                    error: false
                }
            }
           // return { ...state, recipe: action.payload };
            
        case GET_RECIPE_BY_NAME:

            if(action.payload.length === 0){
                return{
                    ...state,
                    backUp:action.payload,
                    error: true
                }
            }else{
                return{
                    ...state,
                    backUp:action.payload,
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

            const allRecipes = state.all_recipes;
            const typesFiltered =
              action.payload === "allTypes"
              ? allRecipes
              : allRecipes.filter((r) => r.diets.includes(action.payload));
            return {
              ...state,
              backUp: typesFiltered,
            }
           /* let all_recipes = state.all_recipes;
            const diet_type = action.payload
            let total  = {data : all_recipes.filter(e => e.diets.includes(diet_type))}

            return{
                ...state,
                recipes: total
            }*/
        case ORDER_BY_NAME:

            let ordername =
            action.payload === "aToZ"
              ? state.backUp.sort(function (a, b) {
                  if (a.name > b.name) return 1;
                  // if (b.name > a.name) return -1;
                  else {
                    return- 1
                  }
                  // return 0;
                })
              : state.backUp.sort(function (a, b) {
                  if (a.name > b.name) return -1;
                  else {
                    return 1
                  }
                  // if (b.name > a.name) return 1;
                  // return 0;
                });
          return {
            ...state,
            backUp: ordername,
          };
            /*const [ord, type] =action.payload
            let r, rf;

            if(ord && type){
                let all_recipes = state.all_recipes;
                let filter_recets = state.recipes
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
            } */
            case ORDER_BY_SCORE:
                let OrderByScore =
                action.payload === "minToMax"
                  ? state.backUp.sort(function (a, b) {
                      if (a.healthScore > b.healthScore) return 1;
                      if (b.healthScore > a.healthScore) return -1;
                      return 0;
                    })
                  : state.backUp.sort(function (a, b) {
                      if (a.healthScore > b.healthScore) return -1;
                      if (b.healthScore > a.healthScore) return 1;
                      return 0;
                    });
              return {
                ...state,
                backUp: OrderByScore,
              };
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