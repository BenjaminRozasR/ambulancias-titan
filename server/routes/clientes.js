const express = require('express');
const router = express.Router();
const Cliente = require('../models/Clientes');

router.get('/', async (req,res)=> res.json(await Cliente.find()));

router.get('/:id', async (req,res)=>{
  const c = await Cliente.findById(req.params.id);
  if(!c) return res.status(404).json({error:'No encontrado'});
  res.json(c);
});

router.post('/', async (req,res)=>{
  try {
    const nuevo = new Cliente(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch(err){ res.status(400).json({error:err.message}); }
});

router.put('/:id', async (req,res)=>{
  try {
    const updated = await Cliente.findByIdAndUpdate(req.params.id, req.body, {new:true});
    if(!updated) return res.status(404).json({error:'No encontrado'});
    res.json(updated);
  } catch(err){ res.status(400).json({error:err.message}); }
});

router.delete('/:id', async (req,res)=>{
  const del = await Cliente.findByIdAndDelete(req.params.id);
  if(!del) return res.status(404).json({error:'No encontrado'});
  res.json({message:'Cliente eliminado'});
});

module.exports = router;
