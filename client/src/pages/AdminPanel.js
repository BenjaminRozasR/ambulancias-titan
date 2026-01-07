// src/pages/AdminPanel.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ServiciosTab from "../components/admin/ServiciosTab";
import PersonalTab from "../components/admin/PersonalTab";
import AmbulanciasTab from "../components/admin/AmbulanciasTab";
import ClientesTab from "../components/admin/ClientesTab";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("servicios");

  useEffect(() => {
    const access = localStorage.getItem("adminAccess");
    if (!access) navigate("/acceso");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAccess");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Panel Administrativo 🚑</h1>

        {/* Botones de navegación */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <button
            onClick={() => setActiveTab("servicios")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm ${
              activeTab === "servicios"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Servicios
          </button>

          <button
            onClick={() => setActiveTab("personal")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm ${
              activeTab === "personal"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Personal
          </button>

          <button
            onClick={() => setActiveTab("ambulancias")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm ${
              activeTab === "ambulancias"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Ambulancias
          </button>

          <button
            onClick={() => setActiveTab("clientes")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm ${
              activeTab === "clientes"
                ? "bg-blue-600 text-white"
                : "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Clientes
          </button>

          {/* Botón cerrar sesión */}
          <button
            onClick={handleLogout}
            className="ml-auto px-5 py-2 rounded-full bg-red-600 text-white font-medium shadow hover:bg-red-700 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Contenido  */}
        <div className="bg-white p-4 rounded-xl shadow">
          {activeTab === "servicios" && <ServiciosTab />}
          {activeTab === "personal" && <PersonalTab />}
          {activeTab === "ambulancias" && <AmbulanciasTab />}
          {activeTab === "clientes" && <ClientesTab />}
        </div>
      </div>
    </div>
  );
}
