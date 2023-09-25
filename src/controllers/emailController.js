const emailService = require('../services/emailService');

const sendEmailController = async (req, res) => {
  try {
    // Aquí recibirás los parámetros enviados en la solicitud
    // const { to, subject, message } = req.body;

    // Llama al servicio de envío de correo electrónico para enviar el correo
    // await emailService.sendEmail(to, subject, message);
    console.log('*********************DATA', req);
    await emailService.sendEmail(req);
    // Envía una respuesta de éxito
    res.json({ mensaje: "Correo enviado con éxito" });
  } catch (error) {
    // Captura cualquier error y envía una respuesta de error al cliente
    console.error("Error en la función sendEmailController:", error);
    res.status(500).json({ mensaje: "Error al enviar el correo", error: error.message });
  }
};

module.exports = {
  sendEmailController,
};
