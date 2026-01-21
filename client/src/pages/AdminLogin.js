// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        password,
      });

      if (res.data.ok) {
        
        localStorage.setItem("adminAccess", "true");
        navigate("/admin");
      } else {
        setError("Contraseña incorrecta");
      }
    } catch (err) {
      console.error("Error al hacer login admin:", err);
      if (err.response?.status === 401) {
        setError("Contraseña incorrecta");
      } else {
        setError("Error al conectar con el servidor");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-cyan-400 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Acceso Personal</h2>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-white/20 border border-white/30 focus:outline-none"
        />
        {error && <p className="text-red-300 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
