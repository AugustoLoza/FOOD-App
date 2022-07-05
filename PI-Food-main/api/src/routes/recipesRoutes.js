const { Router } = require('express');
const { Recipe, Diet, Op } = require('../db');

require('dotenv').config();
const axios = require("axios")
const {API_KEY} = process.env;



const router = Router();

let getApiInfo = async () => {
    try {
        let apiData = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const { results } = apiData.data
        let data = results.map(e => {
            let dietas = e.diets
            if(e.vegetarian && !dietas.includes('vegetarian'))dietas.push('vegetarian');
            if(e.vegan && !dietas.includes('vegan'))dietas.push('vegan');
            if(e.lowFodmap && !dietas.includes('low fodmap'))dietas.push('low fodmap');
            if(e.glutenFree && !dietas.includes('gluten free'))dietas.push('gluten free');
            if(e.dairyFree && !dietas.includes('dairy free'))dietas.push('dairy free');

           // https://api.spoonacular.com/recipes/complexSearch?apiKey=d45b56640aaf4706bb358271fb9cde02&addRecipeInformation=true&number=100

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
                diets:dietas,
                steps: (e.analyzedInstructions[0] && e.analyzedInstructions[0].steps?e.analyzedInstructions[0].steps.map(s => s.step).join(" \n"):''),
                image:e.image
            }
        })
        return data
    } catch (error) {
        console.log(error)
        return([])
    }
}

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

getApiInfoByName = (n) => {
    // try {
    //     let apiData = await getApiInfo()
    //     let resultados = apiData.filter(e => e.name.toLowerCase().includes(n.toLowerCase()))
    //     return resultados

    // } catch (error) {
    //     console.log(error)
    // }
    let apiData = getApiInfo()
    .then(data => data.filter(e => e.name.toLowerCase().includes(n.toLowerCase())))
    .catch(err => console.log(err))
    
    return apiData

}

getDbInfoByName = async(n) => {
    try{
        let dataDb = await getDbInfo()
        return dataDb.filter(e => e.name.toLowerCase().includes(n.toLowerCase()))
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
        
        return {error:'No me pude conectar con el servidor :('}
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
        res.json({error:'No existe la receta'})
    }
})




module.exports = router