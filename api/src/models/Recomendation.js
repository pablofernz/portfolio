const mongoose = require("mongoose")

const socialMediaSchema = mongoose.Schema({
    name: { type: String },
    username: { type: String }
});
const workDataSchema = mongoose.Schema({
    placeOfWork: {
        type: String, default: "", trim: true
    },
    siteLink: {
        type: String, default: "", trim: true
    }
});

const RecomendationSchema = mongoose.Schema({
    nameAndLastname: {
        type: String,
        required: true,
        trim: true
    },
    occupation: {
        type: String,
        default: ""
    },
    workData: workDataSchema,
    socialMedia: [socialMediaSchema],
    comment: {
        type: String,
        minlength: 50,
        required: true,
        trim: true
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