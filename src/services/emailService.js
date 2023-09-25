const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const ejs = require("ejs"); // Importa EJS

// Ruta a la plantilla EJS
const templatePath = path.join(__dirname, "templates", "template.ejs");

// Especifica la ruta al archivo .env utilizando path.resolve
const envPath = path.resolve(__dirname, "../.env");

dotenv.config({ path: envPath });

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 

  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async ({ 
  email,
  displayName,
  hotel_name,
  inDate,
  outDate }) => {
  try {
    // Renderiza la plantilla EJS con las variables dinámicas
    const emailHTML = await ejs.renderFile(templatePath, {
      displayName,
      hotel_name,
      inDate,
      outDate
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "¡Tu Reserva Ha Sido Confirmada!",
      html: emailHTML,
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      ok: true,
      message: `Correo enviado con éxito, ${info.response}`
    }
  } catch (error) {
    return {
      ok: false,
      message: `Fallo al enviar correo, ${error}`
    }
  }
};

module.exports = {
  sendEmail,
};
