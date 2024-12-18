const { Router } = require('express');
const { Recipe, Diet, Op } = require('../db');

require('dotenv').config();
const axios = require("axios")
const {API_KEY} = process.env;



const router = Router();




/*async function getApiInfo() {
    const UrlRecipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        .then(inf => {
            return inf.data.results
        })
        
    let attributesRecipe = UrlRecipes.map(e => {
        return {
            id:e.id,
            name:e.title,
            lowFodmap: e.lowFodmap,
            vegetarian:e.vegetarian,
            vegan:e.vegan,
            glutenFree:e.glutenFree,
            dairyFree:e.dairyFree,
            healthScore: e.healthScore,
            summary: e.summary,
            diets:e.diets,
            steps: (e.analyzedInstructions[0] && e.analyzedInstructions[0].steps?e.analyzedInstructions[0].steps.map(s => s.step).join(" \n"):''),
            image:e.image
        }

    })
    return attributesRecipe

    //return console.log(attributesPoke)
}*/



const getApiInfo = async () =>{
    const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    //console.log(apiUrl)
    const apiInfo = await apiUrl.data.results.map(e =>{
        return{
                id:e.id,
                name:e.title,
                lowFodmap: e.lowFodmap,
                vegetarian:e.vegetarian,
                vegan:e.vegan,
                glutenFree:e.glutenFree,
                dairyFree:e.dairyFree,
                healthScore: e.healthScore,
                summary: e.summary,
                diets:e.diets,
                steps: (e.analyzedInstructions[0] && e.analyzedInstructions[0].steps?e.analyzedInstructions[0].steps.map(s => s.step).join(" \n"):''),
                image:e.image
        };
    });
    return apiInfo;
};

let getDbInfo = async () => {
    try {
        let data = await Recipe.findAll({
            include:{
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })

        // for (let i = 0; i<data.length;i++){
        //     console.log(data[i].dataValues)
        // recipe.dataValues}

        let response = await data?.map(recipe => {
            return {id: recipe.dataValues.id,
                name: recipe.dataValues.name,
                summary: recipe.dataValues.summary,
                healthScore: recipe.dataValues.healthScore,
                image: recipe.dataValues.image,
                steps: recipe.dataValues.steps,
                diets: recipe.dataValues.diets?.map(diet => diet.name),
                createdInDb: recipe.dataValues.createdInDb}
        });

        

        return response
    } catch (error) {
        console.log(error)
    }
}



let getAllInfo = async () => {
    try {
        let dataApi = await getApiInfo()
        let dataDB = await getDbInfo()

        let total = dataApi.concat(dataDB)
        return total
    } catch (error) {
        console.log(error)
    }
}



getApiInfoByName = async(name) => {
     try {
        let apiData = await getApiInfo()
        let resultados = apiData.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        return resultados

     } catch (error) {
         console.log(error)
     }
   /* let apiData = getApiInfo()
    .then(data => data.filter(e => e.name.toLowerCase().includes(n.toLowerCase())))
    .catch(err => console.log(err))
    
    return apiData*/

}

getDbInfoByName = async(name) => {
    try{
        let dataDb = await getDbInfo()
        return dataDb.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
    }catch(err){
        console.log(err)
    }
}

getAllInfoByName = async(n) => {
    try {
        let dataApi = await getApiInfoByName(n)
        let dataDB = await getDbInfoByName(n)

        let total = dataApi.concat(dataDB)
        return total

    } catch (err) {
        console.log(err)
    }
}

let getApiIdInfo = async (id) => {
    try {
        let e = (await axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)).data
        

        let data = {
                id:e.id,
                name:e.title,
                lowFodmap: e.lowFodmap,
                vegetarian:e.vegetarian,
                vegan:e.vegan,
                glutenFree:e.glutenFree,
                dairyFree:e.dairyFree,
                healthScore: e.healthScore,
                summary: e.summary,
                diets:e.diets,
                dishTypes:e.dishTypes,
                steps: (e.analyzedInstructions[0] && e.analyzedInstructions[0].steps?e.analyzedInstructions[0].steps.map(s => s.step).join(" \n"):''),
                image:e.image
            }
        
        

        return data
    } catch (err) {
        
        res.status(404).json({ err: `No existe una receta para el id: ${id}` });
    }
}



router.get('/', async(req, res, next) => {
    const { name } = req.query
    try {
        let info
        if(name){
            info = await getAllInfoByName(name)
            if(info.length === 0){
                info = []
            }
        }else{
            info = await getAllInfo();
        }
        
        
        return res.json(info)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async(req, res) => {
    const { id } = req.params;

    try {
        let recipe;
        if(id.length > 12){
            recipe = await Recipe.findByPk(id, {
                include:{
                    model: Diet,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }
            })

            // let response = await recipe?.map(recipe => {
            //     return {id: recipe.dataValues.id,
            //         name: recipe.dataValues.name,
            //         summary: recipe.dataValues.summary,
            //         healthScore: recipe.dataValues.healthScore,
            //         image: recipe.dataValues.image,
            //         steps: recipe.dataValues.steps,
            //         diets: recipe.dataValues.diets?.map(diet => diet.name)}
                
            // });

            if(recipe){
                const response = {
                    id: recipe.dataValues.id,
                    name: recipe.dataValues.name,
                    summary: recipe.dataValues.summary,
                    healthScore: recipe.dataValues.healthScore,
                    image: recipe.dataValues.image,
                    steps: recipe.dataValues.steps,
                    diets: recipe.dataValues.diets?.map(diet => diet.name),
                    createdInDb: recipe.dataValues.createdInDb
                }
                res.json(response)
            }else{
                res.json({error:'No se encontro la receta'})
            }
        }else{
            recipe = await getApiIdInfo(id)
            if(recipe){
                return res.json(recipe)
            }else{
                res.json({error:'No se encontro la receta'})
            }
        }
    } catch (err) {
        res.status(404).json({ err: "No existe la receta"  });
    }
})




module.exports = router