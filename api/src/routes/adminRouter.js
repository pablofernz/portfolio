const { Router } = require('express');
const { createJWT } = require('../handlers/adminHandler');
const adminRouter = Router();



adminRouter.get("/token/create", createJWT)
module.exports = adminRouter;
