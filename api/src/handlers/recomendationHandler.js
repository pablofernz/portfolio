const { Resend } = require("resend")
require("dotenv").config()
const RecomendationSchema = require("../models/Recomendation")
const recomendationAdd = require("../controllers/createRecomendation")
const resendApiKey = process.env.RESEND_APIKEY
const Recomendation = require("../models/Recomendation")


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


    // if (comment.length < 50) {
    //     return res.status(400).send("The message must be at least 50 characters long")
    // }
    const nameAndLastname = name + " " + lastname
    const newRecommendation = await recomendationAdd({ nameAndLastname, occupation, workData, comment, socialMedia, image })


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

    return res.status(200).json(newRecommendation)
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
        await Recomendation.deleteOne({ _id: id })
        return res.status(200).send("Recomendation deleted")

    } catch (error) {
        return res.status(400).json(error.message)
    }
}

module.exports = { createRecomendation, getRecomendations, deleteRecomendation }