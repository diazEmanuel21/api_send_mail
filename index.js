const express = require("express");
const cors = require('cors');
const app = express();

require("dotenv").config();

// Habilita CORS para todas las rutas
app.use(cors());

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
