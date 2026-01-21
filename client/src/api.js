// src/api.js
import axios from "axios";

// 1️⃣ Primero lee la variable de entorno (PROD y DEV)
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://ambulancias-titan-api.onrender.com"; // Fallback seguro

console.log("🌐 Usando API_URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
});

export default api;
