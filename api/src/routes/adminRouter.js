const { Router } = require('express');
const { createJWT, pinRecommendation } = require('../handlers/adminHandler');
const adminRouter = Router();

adminRouter.get("/token/create", createJWT)
adminRouter.put("/pinrecommendation/:id", pinRecommendation)

module.exports = adminRouter;
