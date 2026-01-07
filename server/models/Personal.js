const mongoose = require("mongoose");

const personalSchema = new mongoose.Schema({
  nombreCompleto: {
    type: String,
    required: true,
  },
  rut: {
    type: String,
    required: true,
  },
  funcion: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Personal", personalSchema);
