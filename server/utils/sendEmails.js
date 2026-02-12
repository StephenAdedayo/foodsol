const nodemailer = require("nodemailer")
const { SMTP_SERVER, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD } = require("../config/keys")

const sendEmail = async ({emailTo, subject, html}) => {

    const transporter = nodemailer.createTransport({
        host : "smtp.gmail.com",
        port : SMTP_PORT,
        secure : false,
        auth : {
            user : "alustephenadedayo@gmail.com",
            pass : "jfzonjxlwopinknj"
        }
    })

    const message = {
        to : emailTo,
        subject,
        html 
       
    }

    await transporter.sendMail(message)

} 


module.exports = sendEmail