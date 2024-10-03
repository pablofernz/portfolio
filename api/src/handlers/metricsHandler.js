const Metrics = require("../models/Metrics")
const MetricsScheme = require("../models/Metrics")

const updateViews = async (req, res) => {
    // logic to create the metrics scheme
    // try {
    //     const viewAdded = new MetricsScheme({
    //     });
    //     await viewAdded.save();
    // } catch (error) {
    //     return error.message;
    // }

    try {
        const updatedCounter = await Metrics.findOneAndUpdate(
            {},
            { $inc: { pageViews: 1 } },
            { new: true }
        );
        return res.status(200).json(updatedCounter)

    } catch (error) {
        return res.status(400).json({ error: error })
    }

}

const updateProjectData = async (req, res) => {
    const { project, update } = req.params
    const { isLiked } = req.body
    const { set } = req.query

    if (update !== "views" && update !== "likes") return res.status(400).json({
        Error: `The methods to update are 'likes' and 'views'; the method '${update}' is not available.`
    })

    try {
        const metrics = await Metrics.findOne()
        const existingProject = metrics.projects.find((p) => p.name.toLowerCase() == project.toLowerCase())

        // logic to create project scheme if isn't already created
        // if (!existingProject) {
        //     const projectData = {
        //         name: project,
        //         views: 0,
        //         likes: 0
        //     }

        //     metrics.projects.push(projectData)
        //     await metrics.save()
        // }

        if (update === "views") {
            existingProject.views += 1
        }

        if (update === "likes") {
            if (set === "true") {
                existingProject.likes += 1
            }
            if (set === "false" && existingProject.likes !== 0) {
                existingProject.likes -= 1
            }
        }

        await metrics.save(); // Guarda los cambios
        return res.status(200).send(metrics)

    } catch (error) {
        return res.status(400).send(error)
    }
}

const getProjectLikes = async (req, res) => {
    const { project } = req.params

    const metrics = await Metrics.findOne()
    const existingProject = metrics.projects.find((p) => p.name.toLowerCase() == project.toLowerCase())

    return res.status(200).json(existingProject.likes)
}
module.exports = {
    updateViews,
    updateProjectData,
    getProjectLikes
}