import axios from "axios";

const API_URL = "http://localhost:5000/api/ambulancias";

// Obtener todas las ambulancias
export const getAmbulancias = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// Crear una ambulancia
export const createAmbulancia = async (ambulancia) => {
  const res = await axios.post(API_URL, ambulancia);
  return res.data;
};

// Editar ambulancia
export const updateAmbulancia = async (id, ambulancia) => {
  const res = await axios.put(`${API_URL}/${id}`, ambulancia);
  return res.data;
};

// Eliminar ambulancia
export const deleteAmbulancia = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
