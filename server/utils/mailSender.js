const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from: 'StudyNotion || CodeHelp - by Babbar',
            to: email,
            subject: title,
            html: body,
        });

        console.log("Email Sent Successfully");
        return info;

    } 
    catch(error) {
        console.log("MAIL SENDER ERROR");
        console.error(error);

        throw error;
    }
}

module.exports = mailSender;