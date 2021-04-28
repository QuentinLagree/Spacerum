const nodemailer = require("nodemailer")

let transporter = nodemailer.createTransport(
    {
        service: "gmail",
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.PASSWORD_MAIL
        }
    }
)

module.exports = transporter