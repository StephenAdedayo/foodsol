const nodemailer = require("nodemailer")
const { SMTP_SERVER, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD } = require("../config/keys")

const sendEmail = async ({emailTo, subject, html}) => {

    const transporter = nodemailer.createTransport({
        host : "smtp.gmail.com",
        port : 465,
        secure : true,
        auth : {
            user : "alustephenadedayo@gmail.com",
            pass : "jfzonjxlwopinknj"
        },
        family: 4
    })

    const message = {
        to : emailTo,
        subject,
        html 
       
    }

    await transporter.sendMail(message)

} 


module.exports = sendEmail