const mongoose = require("mongoose");

const AmbulanciaSchema = new mongoose.Schema({
  patente: { type: String, required: true },
  tipo: { type: String, required: true }, 
  disponible: { type: Boolean, default: true },
  conductor: { type: String }, 
  zona: { type: String },
});

module.exports = mongoose.model("Ambulancia", AmbulanciaSchema);
