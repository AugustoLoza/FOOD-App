import {GET_ALL_RECIPES, GET_ALL_TYPES, GET_RECIPE_BY_ID,DELETE_RECIPE, UPDATE_RECIPE,
        FILTER_BY_DIETS, ORDER_BY_NAME,
        POST_RECIPE, GET_RECIPE_BY_NAME,
         ORDER_BY_SCORE, } 
from '../actions/index'



const initialState = {
    recipes:[],
    all_recipes:[],
    recipe:{},
    types:[],
    error:true,
    
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
       
        default:
            return state
    }
}

export default rootReducer;