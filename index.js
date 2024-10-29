const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');

// Configuration de CORS
app.use(cors({
  origin: "http://localhost:5500",
  methods: "GET,POST,OPTIONS",
  credentials: true,
}));

// Middleware pour parser le JSON des requêtes
app.use(express.json());

// Configuration du transporteur d'emails
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'syoro4663@gmail.com', // utilisez une variable d'environnement
    pass: 'vprm ieer llsz ssoo' // utilisez une variable d'environnement
  },
});

// Pré-vol pour la route /send-email
app.options('/send-email', cors());

// Route pour envoyer un email
app.post('/send-email', async (req, res) => {
  const { name, email, subject, text } = req.body;

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'farotaibraima@example.com', // Adresse du destinataire
    subject, 
    text, 
  };

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
