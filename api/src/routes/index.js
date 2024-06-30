const { Router } = require('express');
const recomendationRouter = require('./recomendationRouter');
const adminRouter = require('./adminRouter');
const router = Router();

router.use("/admin", adminRouter)
router.use("/recomendation", recomendationRouter)
module.exports = router;
