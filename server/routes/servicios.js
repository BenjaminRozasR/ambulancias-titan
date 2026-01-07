const express = require("express");
const router = express.Router();
const Servicio = require("../models/Servicio");

// Obtener todos los servicios
router.get("/", async (req, res) => {
  try {
    const servicios = await Servicio.find();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los servicios" });
  }
});

// Crear un nuevo servicio
router.post("/", async (req, res) => {
  try {
    const nuevoServicio = new Servicio(req.body);
    await nuevoServicio.save();
    res.status(201).json(nuevoServicio);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el servicio" });
  }
});

// Actualizar un servicio
router.put("/:id", async (req, res) => {
  try {
    const servicio = await Servicio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(servicio);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el servicio" });
  }
});

// Eliminar un servicio
router.delete("/:id", async (req, res) => {
  try {
    await Servicio.findByIdAndDelete(req.params.id);
    res.json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el servicio" });
  }
});

module.exports = router;
