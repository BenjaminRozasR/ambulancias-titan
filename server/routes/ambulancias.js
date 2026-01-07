const express = require("express");
const router = express.Router();
const Ambulancia = require("../models/Ambulancia");

// Obtener todas las ambulancias
router.get("/", async (req, res) => {
  try {
    const ambulancias = await Ambulancia.find();
    res.json(ambulancias);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las ambulancias" });
  }
});

// Crear una nueva ambulancia
router.post("/", async (req, res) => {
  try {
    const nuevaAmbulancia = new Ambulancia(req.body);
    await nuevaAmbulancia.save();
    res.status(201).json(nuevaAmbulancia);
  } catch (error) {
    res.status(400).json({ error: "Error al crear la ambulancia" });
  }
});

// Actualizar una ambulancia
router.put("/:id", async (req, res) => {
  try {
    const ambulancia = await Ambulancia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(ambulancia);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar la ambulancia" });
  }
});

// Eliminar una ambulancia
router.delete("/:id", async (req, res) => {
  try {
    await Ambulancia.findByIdAndDelete(req.params.id);
    res.json({ message: "Ambulancia eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar la ambulancia" });
  }
});

module.exports = router;
