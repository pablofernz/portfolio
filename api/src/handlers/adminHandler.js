const jwt = require("jsonwebtoken")
require("dotenv").config()
const { Resend } = require("resend")


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


module.exports = { createJWT }