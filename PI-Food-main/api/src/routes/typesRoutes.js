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

            return {
                id:e.id,
                name:e.title,
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
        return data
    } catch (error) {
        console.log(error)
        return([])
    }
}

let getDbInfo = async () => {
    try {
        let data = await Recipe.findAll({
            include:[{
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }]
        })

        let response = await data?.map(recipe => {
            return {id: recipe.dataValues.id,
                name: recipe.dataValues.name,
                summary: recipe.dataValues.summary,
                healthScore: recipe.dataValues.healthScore,
                image: recipe.dataValues.image,
                steps: recipe.dataValues.steps,
                diets: recipe.dataValues.diets?.map(diet => diet.name)}
            
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
        //console.log(dataDB)
        let total = dataApi.concat(dataDB)
        //console.log(total)
        return total
    } catch (error) {
        console.log(error)
    }
}

router.get('/', async (req, res, next) => {
    let resultado = []
    try {
        let total_diets = await Diet.findAll()
        if(total_diets?.length > 0){
            
            return res.json(total_diets)
        }

        let datos = await getAllInfo()
        let total = datos.map(e => e.diets)
        
        for(let i =0; i< total.length; i++){
            for(let j=0; j<total.length; j++){
                if(total[i][j] && !resultado.includes(total[i][j])){
                resultado.push(total[i][j])
            }}
        }
        
        const pending_promises_array = resultado.map(el => Diet.findOrCreate({
            where:{name:el}
        }))
        
        await Promise.all(pending_promises_array)

        const allTypes = await Diet.findAll()
        
        
        res.json(allTypes)
    } catch (error) {
        next(error)
    }
})

module.exports = router
