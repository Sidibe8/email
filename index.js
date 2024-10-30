const express = require('express');
const cors = require('cors'); // Importer cors
const nodemailer = require('nodemailer'); // Importer nodemailer
const bodyParser = require('body-parser');
const app = express();

// Middleware pour analyser les données JSON
app.use(bodyParser.json());

// Configuration de CORS
app.use(cors()); // Autoriser toutes les origines par défaut

// Fonction d'envoi d'email
async function sendEmail(name, email, message, subject) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sowsalimata243@gmail.com', // Remplacez par votre email
            pass: 'ankv dlwp oqhs anrj' // Remplacez par votre mot de passe d'application
        }
    });

    let mailOptions = {
        from: email,
        to: 'farotaibrahima@gmail.com',
        subject:subject,
        text: message,
        replyTo: email // Adresse email à laquelle les réponses doivent être envoyées
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé : ' + info.response);
        return 'Email envoyé avec succès';
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email :', error);
        return 'Erreur lors de l\'envoi de l\'email';
    }
}

// Route pour recevoir les données du formulaire et envoyer un email
app.post('/send-email', async (req, res) => {
    const { name, email, message, subject } = req.body; // Récupérer les données de la requête
    console.log('email', email);
    const responseMessage = await sendEmail(name, email, message, subject);
    res.send(responseMessage); // Retourner un message de succès ou d'erreur
});

// Démarrer le serveur
app.listen(8000, () => {
    console.log('Serveur démarré sur le port 3000');
});