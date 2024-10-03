const { Router } = require('express');
const recomendationRouter = require('./recomendationRouter');
const adminRouter = require('./adminRouter');
const dataRouter = require('./dataRouter');
const metricsRouter = require('./metricsRouter');
const router = Router();

router.use("/admin", adminRouter)
router.use("/recomendation", recomendationRouter)
router.use("/data", dataRouter)
router.use("/metrics", metricsRouter)
module.exports = router;
