const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const bodyEmail = fs.readFileSync(path.join(__dirname, "public", "msgEmail.html"), "utf8");



// Especifica la ruta al archivo .env utilizando path.resolve
const envPath = path.resolve(__dirname, "../.env");

// Carga las variables de entorno desde el archivo .env
dotenv.config({ path: envPath });

// Configura el transportador de NodeMailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587, // Puerto para STARTTLS
  secure: false, // Establece en false para usar STARTTLS

  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Función para enviar un correo electrónico
const sendEmail = async ({ email }) => {
  try {
    // Configura las opciones de correo electrónico
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "¡Tu Reserva Ha Sido Confirmada!",
      html: bodyEmail,
    };

    // Envía el correo electrónico
    const info = await transporter.sendMail(mailOptions);

    return {
      ok: true,
      message: `Correo enviado con éxito, ${info.response}`
    }
  } catch (error) {
    return {
      ok: true,
      message: `Fallo al enviar correo, ${error}`
    }
  }
};

module.exports = {
  sendEmail,
};
