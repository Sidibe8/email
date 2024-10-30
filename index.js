const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

// Middleware for JSON data parsing
app.use(bodyParser.json());

// CORS Configuration for specific origin and preflight response
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Replace with the allowed origin
    methods: ['POST', 'OPTIONS'],    // Allow specific methods
    allowedHeaders: ['Content-Type']  // Allow necessary headers
}));

// Function to send email
async function sendEmail(name, email, message, subject) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'syoro4663@gmail.com', // Remplacez par votre email
          pass: 'vprm ieer llsz ssoo', 
        }
    });

    let mailOptions = {
        from: email,
        to: 'farotaibrahima@gmail.com',
        subject: subject,
        text: message,
        replyTo: email
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return 'Email sent successfully';
    } catch (error) {
        console.error('Error sending email:', error);
        return 'Error sending email';
    }
}

// Route to receive form data and send email
app.post('/send-email', async (req, res) => {
    const { name, email, message, subject } = req.body;
    const responseMessage = await sendEmail(name, email, message, subject);
    res.send(responseMessage);
});

// Start the server
app.listen(8000, () => {
    console.log('Server running on port 8000');
});
