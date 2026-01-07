// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor de Ambulancias Titan funcionando 🚑");
});

// ✅ Ruta de login para el panel administrativo
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ ok: false, message: "Falta contraseña" });
  }

  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({ ok: true, message: "Acceso permitido" });
  } else {
    return res
      .status(401)
      .json({ ok: false, message: "Contraseña incorrecta" });
  }
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// Rutas
const ambulanciasRoutes = require("./routes/ambulancias");
const personalRoutes = require("./routes/personal");
const clientesRoutes = require("./routes/clientes");
const serviciosRoutes = require("./routes/servicios");
const contactoRoutes = require("./routes/contacto");

app.use("/api/ambulancias", ambulanciasRoutes);
app.use("/api/personal", personalRoutes);
app.use("/api/clientes", clientesRoutes);
app.use("/api/servicios", serviciosRoutes);
app.use("/api/contacto", contactoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
