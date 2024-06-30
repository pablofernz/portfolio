const { Router } = require('express');
const { createRecomendation, getRecomendations, deleteRecomendation } = require('../handlers/recomendationHandler');
const recomendationRouter = Router();


recomendationRouter.post("/add", createRecomendation)

recomendationRouter.get("/get", getRecomendations)

recomendationRouter.delete("/delete/:id", deleteRecomendation)
module.exports = recomendationRouter;
