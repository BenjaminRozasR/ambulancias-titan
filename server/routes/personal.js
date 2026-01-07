const express = require("express");
const router = express.Router();
const Personal = require("../models/Personal");

// Obtiene todo el personal
router.get("/", async (req, res) => {
  try {
    const personal = await Personal.find();
    res.json(personal);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el personal" });
  }
});

// Crear nuevo miembro del personal
router.post("/", async (req, res) => {
  try {
    const nuevoPersonal = new Personal(req.body);
    await nuevoPersonal.save();
    res.status(201).json(nuevoPersonal);
  } catch (error) {
    res.status(400).json({ error: "Error al crear el personal" });
  }
});

// Actualizar miembro del personal
router.put("/:id", async (req, res) => {
  try {
    const personal = await Personal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(personal);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar el personal" });
  }
});

// Eliminar miembro del personal
router.delete("/:id", async (req, res) => {
  try {
    await Personal.findByIdAndDelete(req.params.id);
    res.json({ message: "Personal eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: "Error al eliminar el personal" });
  }
});

module.exports = router;
