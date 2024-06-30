const mongoose = require("mongoose")

const RecomendationSchema = mongoose.Schema({
    nameAndLastname: {
        type: String,
        required: true
    },
    email: {
        type: String, required: true
    },
    occupation: {
        type: String,
        required: true
    },
    placeOfWork: {
        type: String
    },
    linkedin: {
        type: String
    },
    message: {
        type: String,
        minlength: 50,
        required: true
    },
    date: {
        type: String
    }
}, {
    versionKey: false // Establecer versionKey en false para eliminar la propiedad "__v"
})

module.exports = mongoose.model("Recomendation", RecomendationSchema)