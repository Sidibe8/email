const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

// Création de l'application Express
const app = express();

// Middleware CORS
var whitelist = ['http://localhost:5500', 'http://localhost:8080']; //white list consumers
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'device-remember-token', 'Access-Control-Allow-Origin', 'Origin', 'Accept']
};

app.use(cors(corsOptions));
  

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
