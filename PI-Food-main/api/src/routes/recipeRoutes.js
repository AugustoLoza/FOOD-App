const { Router } = require('express');
const { Recipe, Diet, Op } = require('../db');

require('dotenv').config();
const axios = require("axios")
const {API_KEY} = process.env;

const router = Router();

router.post('/', async (req,res) => {
    let { name, summary, healthScore,image,steps, createdInDb, diets} = req.body;

    if(!name || !summary) return res.status(400).json({error:"Falta enviar datos obligatorios"})
    
    if(!image){image = 'https://st.depositphotos.com/1987177/3470/v/600/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg'}

    try {
        let recipe = await Recipe.create({
            name,
            summary,
            healthScore,
            image,
            steps,
            createdInDb
        })

        let dietDb = await Diet.findAll({
            where:{name:diets}
        })
        
        if(recipe){
            recipe.addDiet(dietDb)
            
        }

        return res.status(200).send('Receta creada')
    } catch (err) {
        return res.status(400).json({error:err})
    }
})

router.delete('/clear/:id', async(req, res) => {
    try {
        const { id } = req.params
        const receta = await Recipe.findByPk(id)
        if(!receta){
            res.status(404).send('No existe la receta')
        }
        await receta.destroy()
        res.send(`La receta ${id} ha sido eliminada`)
    } catch (error) {
        console.log(error)
    }
})

router.put('/update/:id', async(req, res) => {
    let { name, summary, healthScore, image, steps, diets} = req.body;
    const { id } = req.params
    let condition = {}

    try {
        const receta = await Recipe.findByPk(id,{
            include:{
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })

        if(!receta){
            res.status(404).send('No existe la receta')
        }

        if(name){
            condition.name = name
        }

        if(summary){
            condition.summary =summary
        }

        if(healthScore){
            if(healthScore<=100 || healthScore>0){
                condition.healthScore =healthScore
            }
            
        }

        if(image){
            condition.image = image
        }

        if(steps){
            condition.steps = steps
        }

        if(diets){
            const response = receta.dataValues.diets?.map(diet => diet.name)
            const eliminados = []
            for(let i = 0; i<response.length;i++){
                if(!diets.includes(response[i])){
                    eliminados.push(response[i])
                }
            }
            let dietDelete = await Diet.findAll({
                where:{name:eliminados}
            })
            
            const pending_promises_array = dietDelete.map(e => receta.removeDiet(e))
            await Promise.all(pending_promises_array)

            let dietDb = await Diet.findAll({
                where:{name:diets}
            })

            receta.addDiet(dietDb)

        }

        await receta.update(condition)

        res.send(receta)
    } catch (error) {
        console.log(error)
    }


})

module.exports = router