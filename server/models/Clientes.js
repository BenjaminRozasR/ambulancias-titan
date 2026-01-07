const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String },
  email: { type: String },
  direccionOrigen: { type: String },
  direccionDestino: { type: String },
  servicio: { type: String },
  valor: { type: Number },
  notas: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Cliente', clienteSchema);
  