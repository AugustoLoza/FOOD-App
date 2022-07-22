const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouters = require('./recipesRoutes.js')
const recipeRouters = require('./recipeRoutes.js')
const typesRouters = require('./typesRoutes.js')




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipesRouters);
router.use('/recipe', recipeRouters);
router.use('/types', typesRouters);


module.exports = router;
