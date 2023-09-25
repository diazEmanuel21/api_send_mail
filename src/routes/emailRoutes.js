const express = require('express');
const router = express.Router();
const { sendEmailController } = require('../controllers/emailController');

// Define la ruta para enviar un correo electrónico y utiliza sendEmail como callback
router.post('/send-email', sendEmailController);
router.get('/', (req, res) => {
    res.send('This is my API mailer, welcome!');
});

module.exports = router;
