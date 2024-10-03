const { Resend } = require("resend")
require("dotenv").config()
const resendApiKey = process.env.RESEND_APIKEY


const getEmail = async (req, res) => {
    const { email } = req.body

    try {

        const resend = new Resend(resendApiKey)

        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: `pablodanyfer@gmail.com`,
            subject: "Send a message to this e-mail",
            html: `<p>Send a email at this direction:</p>
            <p>${email}</p> `
        });
        return res.status(200).send("sent")

        if (error) {
            return res.status(400).json({ error });
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}


module.exports = getEmail