const { Router } = require('express');
const recomendationRouter = require('./recomendationRouter');
const adminRouter = require('./adminRouter');
const dataRouter = require('./dataRouter');
const router = Router();

router.use("/admin", adminRouter)
router.use("/recomendation", recomendationRouter)
router.use("/data", dataRouter)
module.exports = router;
