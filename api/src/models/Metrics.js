const mongoose = require("mongoose")

const projectsSchema = mongoose.Schema({
    name: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
});

const MetricsSchema = mongoose.Schema({
    pageViews: {
        type: Number,
        default: 0
    },
    projects: [projectsSchema]

}, {
    versionKey: false // Establecer versionKey en false para eliminar la propiedad "__v"
})

module.exports = mongoose.model("Metrics", MetricsSchema)