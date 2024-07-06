const mongoose = require("mongoose")

const socialMediaSchema = mongoose.Schema({
    name: { type: String },
    username: { type: String }
});

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
        type: Object
    },
    socialMedia: [socialMediaSchema],
    message: {
        type: String,
        minlength: 50,
        required: true
    },
    image: {
        type: String,
        default: "https://ui.shadcn.com/avatars/02.png"
    },
    pinned: {
        type: Boolean,
        default: false
    },
    date: {
        type: String
    }
}, {
    versionKey: false // Establecer versionKey en false para eliminar la propiedad "__v"
})

module.exports = mongoose.model("Recomendation", RecomendationSchema)