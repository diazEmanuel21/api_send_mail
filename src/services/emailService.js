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
const sendEmail = async (to) => {
  try {
    // Configura las opciones de correo electrónico
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: "diazev20@gmail.com",
      subject: "¡Tu Reserva Ha Sido Confirmada!",
      html: bodyEmail,
    };

    // Envía el correo electrónico
    const info = await transporter.sendMail(mailOptions);

    console.log("Correo enviado con éxito", info.response);
  } catch (error) {
    console.error("SERVICE => Error al enviar el correo electrónico", error);
    throw error; // Propaga el error para que sea manejado por el controlador
  }
};

module.exports = {
  sendEmail,
};
