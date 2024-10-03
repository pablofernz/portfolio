const { Router } = require('express');
const { updateViews, updateProjectData, getProjectLikes } = require('../handlers/metricsHandler');
const metricsRouter = Router();



metricsRouter.post("/views", updateViews)
metricsRouter.post("/projects/:project/:update", updateProjectData )
metricsRouter.get("/projects/:project/getlikes", getProjectLikes)
module.exports = metricsRouter;
