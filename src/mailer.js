const nodemailer = require("nodemailer");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");
const { error } = require("console");
const { response } = require("express");
const contenidoCorreo = fs.readFileSync("msgEmail.html", "utf8");

// Especifica la ruta al archivo .env utilizando path.resolve
const envPath = path.resolve("../.env");

// Carga las variables de entorno desde el archivo .env
dotenv.config({ path: envPath });

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

//Opciones de correo electronico

const mailOptions = {
  from: process.env.SMTP_EMAIL,
  to: "bastianmcity@gmail.com",
  subject: "¡Tu Reserva Ha Sido Confirmada!",
  html: contenidoCorreo,
};

// ENviar correo electronico
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error al enviar el correo electronico", error);
  } else {
    console.log("Correo enviado con exito", info.response);
  }
});
