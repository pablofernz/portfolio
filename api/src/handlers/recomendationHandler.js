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
    const { nameAndLastname, email, occupation, placeOfWork, message, socialMedia, image } = req.body


    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return res.status(400).send("Invalid email")
    }

    if (message.length < 50) {
        return res.status(400).send("The message must be at least 50 characters long")
    }

    // const newRecommendation = await recomendationAdd({ nameAndLastname, email, occupation, placeOfWork, message, socialMedia, image })

    return res.status(200).json(Object.values(placeOfWork).length)

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