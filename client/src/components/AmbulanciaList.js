import React, { useEffect, useState } from "react";
import {
  getAmbulancias,
  createAmbulancia,
  deleteAmbulancia,
} from "../services/ambulanciaservice";

const AmbulanciaList = () => {
  const [ambulancias, setAmbulancias] = useState([]);
  const [nuevaAmbulancia, setNuevaAmbulancia] = useState({
    patente: "",
    modelo: "",
    disponible: true,
  });

  // Cargar ambulancias al inicio
  useEffect(() => {
    cargarAmbulancias();
  }, []);

  const cargarAmbulancias = async () => {
    try {
      const data = await getAmbulancias();
      setAmbulancias(data);
    } catch (error) {
      console.error("Error al cargar ambulancias", error);
    }
  };

  const handleChange = (e) => {
    setNuevaAmbulancia({
      ...nuevaAmbulancia,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevaAmbulancia.patente || !nuevaAmbulancia.modelo) {
      alert("Completa todos los campos");
      return;
    }
    try {
      await createAmbulancia(nuevaAmbulancia);
      setNuevaAmbulancia({ patente: "", modelo: "", disponible: true });
      cargarAmbulancias();
    } catch (error) {
      console.error("Error al crear ambulancia", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar esta ambulancia?")) {
      try {
        await deleteAmbulancia(id);
        cargarAmbulancias();
      } catch (error) {
        console.error("Error al eliminar ambulancia", error);
      }
    }
  };

  return (
    <div>
      <h2>🚑 Lista de Ambulancias</h2>
      <ul>
        {ambulancias.map((amb) => (
          <li key={amb._id}>
            {amb.patente} - {amb.modelo} -{" "}
            {amb.disponible ? "Disponible ✅" : "No disponible ❌"}
            <button onClick={() => handleDelete(amb._id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h3>➕ Agregar nueva ambulancia</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="patente"
          placeholder="Patente"
          value={nuevaAmbulancia.patente}
          onChange={handleChange}
        />
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={nuevaAmbulancia.modelo}
          onChange={handleChange}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default AmbulanciaList;
