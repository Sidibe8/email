const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

// Création de l'application Express
const app = express();

// Middleware CORS
app.use(cors());
  

// Middleware pour parser le JSON des requêtes
app.use(express.json());

// Configuration du transporteur d'emails
const transporter = nodemailer.createTransport({
  service: 'gmail', // Par exemple, 'gmail'
  auth: {
    user: 'syoro4663@gmail.com', // Remplacez par votre email
    pass: 'vprm ieer llsz ssoo', // Remplacez par votre mot de passe ou token d'application
  },
});




// Route pour envoyer un email
app.post('/send-email', async (req, res) => {
  const { name, email, subject, text } = req.body;

  // Configuration de l'email
  const mailOptions = {
    from: `"${name}" <${email}>`, // L'adresse de l'expéditeur avec le nom
    to: ' ', // Adresse du destinataire
    subject, // Sujet de l'email
    text, // Contenu de l'email
  };

  // Envoi de l'email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email envoyé avec succès!');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).send('Erreur lors de l\'envoi de l\'email.');
  }
});

// Démarrer le serveur
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
