import dotenv from 'dotenv';
dotenv.config(); // Load the .env file immediately

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Reads from .env
        pass: process.env.EMAIL_PASS  // Reads from .env
    }
});

async function sendMail(to, sub, msg) {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER, // Good practice to match sender
            to: to,
            subject: sub,
            html: msg
        });
        console.log("✅ Email sent successfully:", info.response);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
}

sendMail("armanjipanjla@gmail.com", "Haan bhai", "Kiase ho");