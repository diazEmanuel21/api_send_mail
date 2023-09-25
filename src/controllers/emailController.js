const emailService = require('../services/emailService');

const sendEmailController = async (req, res) => {
  try {
    // const { to, subject, message } = req.body;
    const result = await emailService.sendEmail(req.body);
    res.json({ mensaje: result.message });
  } catch (error) {
    // Captura cualquier error y envía una respuesta de error al cliente
    res.status(500).json({ mensaje: "Error al enviar el correo", error: error.message, data: req });
  }
};

module.exports = {
  sendEmailController,
};
