const nodemailer = require('nodemailer')

async function sendEmail(to,cc,subject,html) {
    const transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    })
    transport.verify(function(error, success){
        if (error) {
            console.log(error)
        }else{
            console.log("Nodemailer server is ready")
        }
    })
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: to,
        cc: cc,
        subject: `${subject}`,
        html: `${html}`,
    }
    transport.sendMail(mailOptions, (error,info) => {
        if (error) {
            console.log(error)
        }
        console.log("Message sent: %s", info.messageId)
        return res.json("Message sent successfully")
    })
}

module.exports = {sendEmail}