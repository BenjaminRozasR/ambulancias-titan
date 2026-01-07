const mongoose = require("mongoose");

const servicioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  disponible: { type: Boolean, default: true },
});

module.exports = mongoose.model("Servicio", servicioSchema);
