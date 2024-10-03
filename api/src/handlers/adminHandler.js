const jwt = require("jsonwebtoken")
require("dotenv").config()
const { Resend } = require("resend")
const Recomendation = require("../models/Recomendation")
const secret = process.env.SECRET
const resendApiKey = process.env.RESEND_APIKEY


const createJWT = async (req, res) => {

    const token = jwt.sign(
        {
            exp: Date.now() + 60 * 1000 * 60 * 24 * 30
        }, secret
    )

    if (token) {
        const resend = new Resend(resendApiKey)

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: `pablodanyfer@gmail.com`,
            subject: `Admin session token`,
            html: `<p>Hello, this is the token you will need to be in administrator mode:</p>
        <p>Token: ${token}</p>
        <br/>
        <p>Copy this code and create new attribute in the cookies section with the name of "adminToken": token</p>`
        });

        if (error) {
            return res.status(400).json({ error });
        }
    } else {
        return res.status(400).send("No token");

    }

    return res.status(200).send("Token send")
}

const pinRecommendation = async (req, res) => {
    const { id } = req.params

    try {
        if (!id) return res.status(400).send("No id")

        const chosedRecommendation = await Recomendation.findById(id)
        if (!chosedRecommendation) return res.status(404).send("Not found")

        await Recomendation.findByIdAndUpdate(id, { pinned: !chosedRecommendation.pinned })
        return res.status(200).send(!chosedRecommendation.pinned)
    } catch (error) {
        return res.status(400).send(error.message)
    }

}

// {
//     "_id": {
//       "$oid": "6685f5db5024ea06cd6c6068"
//     },
//     "nameAndLastname": "Miguel Ángel Duran",
//     "email": "midudev@gmail.com",
//     "occupation": "Full Stack Developer",
//     "placeOfWork": {
//       "Freelancer": ""
//     },
//     "socialMedia": [
//       {
//         "name": "X",
//         "username": "midudev",
//         "_id": {
//           "$oid": "6685f5db5024ea06cd6c6069"
//         }
//       }
//     ],
//     "message": "Me gustó el trabajo con la página de la compañia que me creaste ya que es intrega y facil para el cliente",
//     "image": "https://ui.shadcn.com/avatars/02.png",
//     "pinned": true,
//     "date": "03-07-2024 22:07"
//   }

module.exports = {
    createJWT, pinRecommendation
}