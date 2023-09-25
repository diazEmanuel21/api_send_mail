const express = require("express");
require("dotenv").config();

// Crear el servidor express
const app = express();

// Middleware para analizar el cuerpo JSON de las solicitudes
app.use(express.json());

// Directorio Público
app.use(express.static("public"));

// Importa las rutas de envío de correos electrónicos
const emailRoutes = require("./src/routes/emailRoutes");
app.use("/api/email", emailRoutes);

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor arriba en el puerto ${process.env.PORT}`);
});
