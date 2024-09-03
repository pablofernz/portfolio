const { Router } = require('express');
const getEmail = require('../handlers/dataHandler');
const dataRouter = Router();



dataRouter.post("/send/email", getEmail)

module.exports = dataRouter;