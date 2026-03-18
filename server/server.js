// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// --- OPTIMIZACIÓN DE CONEXIÓN (Caché para Vercel) ---
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return; // Si ya hay conexión, salimos de inmediato
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false, // Mejora el rendimiento en serverless
    });
    isConnected = db.connections[0].readyState;
    console.log("✅ Conexión establecida/reutilizada con MongoDB");
  } catch (err) {
    console.error("❌ Error al conectar a MongoDB:", err);
  }
};

// Middleware: Conecta a la DB en cada petición (es casi instantáneo si ya está conectado)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});
// --------------------------------------------------

app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor de Ambulancias Titan funcionando 🚑");
});

// Health check endpoint (Usaremos este para el despertador)
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    mongodb: mongoose.connection.readyState === 1 ? "conectado" : "desconectado",
  });
});

// Ruta de login para el panel administrativo
app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    return res.json({ ok: true, message: "Acceso permitido" });
  } else {
    return res.status(401).json({ ok: false, message: "Contraseña incorrecta" });
  }
});

// Importación de Rutas
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