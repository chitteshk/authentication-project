import nodemailer from 'nodemailer';

// Create a Nodemailer transporter object
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Your SMTP host
    port: 587, // Your SMTP port
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_SECRET, // Your email address
        pass: process.env.PASSWORD_SECRET // Your password
    },
});

// Function to send email
export const sendEmailVerificationMail = async (email, verificationString) => { 
    try {
        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Auth Service" <khachroochittesh@gmail.com>',
            to: email,
            subject: "Please verify your email",
            html: `
                <p>Thanks for signing up!</p>
                <p>To verify your email, click <a href="http://localhost:3000/verify-email/${verificationString}">here</a>.</p>
            `,
        });

        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error occurred while sending email:", error);
        throw error; // Throw the error for handling in the calling function
    }
};

export const sendPasswordResetMail = async (email, resetPasswordString) => { 
    try {
        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Auth Team" <khachroochittesh@gmail.com>',
            to: email,
            subject: "Reset Password",
            html: `
                <p>We will help you reset your password!</p>
                <p>To reset your password, click <a href="http://localhost:3000/reset-password/${resetPasswordString}">here</a>.</p>
            `,
        });

        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error occurred while sending email:", error);
        throw error; // Throw the error for handling in the calling function
    }
};
