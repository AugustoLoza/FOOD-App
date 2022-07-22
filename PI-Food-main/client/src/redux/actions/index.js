import axios from "axios"

export const ORDER_BY_SCORE = 'ORDER_BY_SCORE';

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID';
export const POST_RECIPE = 'POST_RECIPE';
export const GET_RECIPE_BY_NAME = 'GET_RECIPE_BY_NAME'
export const DELETE_RECIPE = 'DELETE_RECIPE'
export const UPDATE_RECIPE = 'UPDATE_RECIPE'




const URL = "http://localhost:3001"





export function getAllRecipes() {
    return async function (dispatch) {
      try {
        let jsonRecipes = await axios.get(`${URL}/recipes`);
        return dispatch({
          type: GET_ALL_RECIPES,
          payload: jsonRecipes.data,
          //Recordar que el payload es la info que se usa para modificar los estados, y el type hace que se identifique a la action.
        });
      } catch (error) {
        console.log(error.message);
        return alert(
          "Oh no! Hubo un error al cargar la informacion. Intenta en unos minutos"
        );
      }
    };
  }

  /*export const getAllRecipes = () => (dispatch) => {
    return fetch(`${URL}/recipes`)
        .then((res) => res.json())
        .then((json) => {
            dispatch({ type: GET_ALL_RECIPES, payload: json});
        })
        .catch((error) => {
            return error;
          });
  };*/
  
  export const getAllTypes = () => (dispatch)=> {
     
      return  fetch(`${URL}/types`)
       .then((res) => res.json())
       .then((jsonTypes) => {
          dispatch({
           type: GET_ALL_TYPES,
           payload: jsonTypes,
         });
       })
       .catch((error) => {
        return error;
      });
   
  };

  /*export function  getAllTypes() {
    return async function (dispatch) {
      try {
        let jsonTypes = await axios.get(`${URL}/types`);
        console.log(jsonTypes);
        return dispatch({
          type: GET_ALL_TYPES,
          payload: jsonTypes,
        });
      } catch (error) {
        console.log(error);
        return alert(
          "Algo salio mal al cargar los Types. Intenta de nuevo más tarde"
        );
      }
    };
  }*/
  

export function getRecipeById(id) {
    return async function (dispatch) {
      try {
        let jsonRecipeID = await axios.get(
          `${URL}/recipes/${id}`
        );
        
        return dispatch({
          type: GET_RECIPE_BY_ID,
          payload: jsonRecipeID.data,
        });
      } catch (error) {
        return alert(`No encontramos la receta con el ID ${id}.`);
      }
    };
  }



/*export const getRecipeById= (id) => {
    return async function (dispatch) {
       return await fetch(`${URL}/recipes/${id}`)
        .then((res) => res.json())
        .then((json) => {
          return dispatch({
           type: GET_RECIPE_BY_ID,
            payload: json,
           });
        }).catch((error) => console.error("Error:", error))
        
        
         
    };
   };*/



export const postRecipe = (payload) => {
  return async function (dispatch) {
    return await fetch(`${URL}/recipe`, {
      method: "POST",
     body: JSON.stringify(payload),
     headers: {
        "Content-Type": "application/json",
     },
    })
     .then((res) => res.json())
     .catch((error) => console.error("Error:", error))
     .then((RecipeCreated) => {
      return dispatch({
        type: POST_RECIPE,
        payload: RecipeCreated,
       });
     });
};
};

/*export function postRecipe(payload) {
    return async function (dispatch) {
      try {
        const RecipeCreated = await axios.post(`${URL}/recipe`, payload);
        return dispatch({
            type: POST_RECIPE,
            payload:RecipeCreated.data
        });
      } catch (error) {
        console.log(error.message);
        return alert(
          "La Receta ha sido creada con exito"
        );
        
      }
    };
  }*/

/*export function searchByName(name){
    return function(dispatch){
        return axios.get(`${URL}/recipes?name=${name}`)
        .then(data => {
            dispatch({
                type:GET_RECIPE_BY_NAME,
                payload:data
            })
        })
        .catch(err => {
            alert(err)
        })
    }
}*/
export const searchByName = (name) => {
  return async (dispatch) => {
    try {
     
      const json = await axios.get( `${URL}/recipes?name=${name}`);

      return dispatch({
        type: GET_RECIPE_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
      return alert(
        "La Receta no se encuentra"
      );
    }
  };
};


export function deleteRecipe(id){
    return function(dispatch){
        return axios.delete(`${URL}/recipe/clear/${id}`)
        .then(data => {
            dispatch({
                type:DELETE_RECIPE,
                payload:data
            })
        })
    }
}



export function updateRecipe(id, payload){
    return function(dispatch){
        return axios.put(`${URL}/recipe/update/${id}`, payload)
        .then(data => {
            dispatch({
                type:UPDATE_RECIPE,
                payload:data
            })
        })
    }
}


export function filterByDiets(payload){
    return {
        type: FILTER_BY_DIETS,
        payload
    }
}


export const orderByScore = (payload) => ({
  type: ORDER_BY_SCORE,
  payload,
});

export function OrderByName(payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

