const { Resend } = require("resend")
// // require("dotenv").config()
const RecomendationSchema = require("../models/Recomendation")
const recomendationAdd = require("../controllers/createRecomendation")
const resendApiKey = process.env.RESEND_APIKEY
const Recomendation = require("../models/Recomendation")

const cloudinary = require('cloudinary').v2;
require("dotenv").config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const resendCode = {
//     const resend = new Resend(resendApiKey)

//     const { data, error } = await resend.emails.send({
//         from: 'pablofernz@resend.com',
//         to: `${email}`,
//         subject: `${nameAndLastname} answered`,
//         html: `<p>${message}</p>`
//     });

//     if (error) {
//         return res.status(400).json({ error });
//     } else {
//         return res.status(200).json({ data });
//     }

// }

const createRecomendation = async (req, res) => {
    const { name, lastname, occupation, workData, comment, socialMedia, image } = req.body

    let imageUrl = image.length < 1368 ? image : undefined

    if (image !== "" && image.length > 1368) {
        const result = await cloudinary.uploader.upload(image, {
            folder: 'Portfolio user photos',
            resource_type: 'image'
        });
        imageUrl = result.secure_url;
    }
    if (comment.length < 50) {
        return res.status(400).send("The message must be at least 50 characters long")
    }
    const nameAndLastname = name + " " + lastname
    const newRecommendation = await recomendationAdd({ nameAndLastname, occupation, workData, comment, socialMedia, image: imageUrl })


    // -----------SEND EMAIL------------------------

    //     const resend = new Resend(resendApiKey)

    //     const { data, error } = await resend.emails.send({
    //         from: 'onboarding@resend.dev',
    //         to: `pablodanyfer@gmail.com`,
    //         subject: `${nameAndLastname} leave a recommendation!`,
    //         html: `<p>You have one more recommendation</p>
    //         <p>${message}</p>
    // <p>Check out in the recommendation section in <a href="https://pablofernz.vercel.app">pablofernz.vercel.app</a></p>`    });

    //     if (error) {
    //         return res.status(400).json({ error });
    //     }

    return res.status(201).json(newRecommendation)
}


const getRecomendations = async (req, res) => {
    try {
        const recomendations = await Recomendation.find();
        return res.status(200).json(recomendations)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

const deleteRecomendation = async (req, res) => {

    const { id } = req.params
    try {

        const existingUser = await Recomendation.findOne({ _id: id })

        if (!existingUser) return res.status(404).send("User not found")

        const getPublicIdFromUrl = (url) => {
            const parts = url.split("/");
            const fileName = parts[parts.length - 1]; // obtener el nombre del archivo con extensión
            const publicId = fileName.split(".")[0]; // remover la extensión para obtener el public_id
            return publicId;
        };
        const publicAux = getPublicIdFromUrl(existingUser.image)
        const publicID = "Portfolio user photos/" + publicAux

        cloudinary.uploader.destroy(publicID, (error, result) => {
            if (error) {
                console.error('Error al borrar la imagen:', error);
            }
        });

        await Recomendation.deleteOne({ _id: id })
        return res.status(200).send("Deleted")
    } catch (error) {
        return res.status(400).json(error.message)
    }
}



module.exports = { createRecomendation, getRecomendations, deleteRecomendation }