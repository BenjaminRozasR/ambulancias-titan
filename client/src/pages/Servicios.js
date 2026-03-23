import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";

const API_URL = `${API_BASE_URL}/api/servicios`;


const LoadingScreen = () => (
  <div style={{
    height: '100vh', display: 'flex', flexDirection: 'column',
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc',
    textAlign: 'center', padding: '20px', fontFamily: 'sans-serif'
  }}>
    <img src="/logo.png" alt="Ambulancias Titan" style={{ width: '120px', marginBottom: '30px' }} />
    <div className="spinner"></div>
    <h2 style={{ color: '#0f172a', fontSize: '24px', margin: '10px 0', fontWeight: '800' }}>
      Cargando servicios...
    </h2>
    <p style={{ color: '#64748b', fontSize: '16px', lineHeight: '1.5' }}>
      Estamos preparando todo para su atención.<br />
      <strong>Por favor, espere unos segundos.</strong>
    </p>
    <style>{`
      .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        width: 45px; height: 45px; border-radius: 50%;
        border-left-color: #2563eb;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
      }
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `}</style>
  </div>
);

function Servicios() {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  // Cargar servicios desde el backend
  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const res = await axios.get(API_URL);
        setServicios(res.data);
      } catch (error) {
        console.error("Error al obtener servicios:", error);
      } finally {
        
        setLoading(false); 
      }
    };

    fetchServicios();
  }, []);

  
  if (loading) {
    return <LoadingScreen />;
  }

  const formatPrecio = (precio) => {
    if (precio == null || precio === "") return "";
    const n = Number(precio);
    if (Number.isNaN(n)) return "";
    return `$${n.toLocaleString("es-CL")}`;
  };

  const getIcon = (nombre = "") => {
    const n = nombre.toLowerCase();
    if (n.includes("alta")) return "🏠";
    if (n.includes("control") || n.includes("médic") || n.includes("medic"))
      return "🚑";
    if (n.includes("urgenc")) return "🚨";
    if (n.includes("evento") || n.includes("hora")) return "⏰";
    if (n.includes("psiqui")) return "🧠";
    return "🚑";
  };

  const esPorHora = (nombre = "") => {
    const n = nombre.toLowerCase();
    return n.includes("evento") || n.includes("hora");
  };

  return (
    <main className="bg-slate-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
          Nuestros servicios
        </h1>
        <p className="text-slate-600 mb-8">
          Ofrecemos traslados seguros y oportunos para distintas necesidades de
          salud. Revisa nuestros servicios y contáctanos para coordinar tu
          traslado.
        </p>

        {servicios.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicios.map((s) => (
              <article
                key={s._id}
                className="bg-white rounded-3xl shadow-lg p-5 flex flex-col justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 grid place-items-center text-2xl">
                    <span>{getIcon(s.nombre)}</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900">
                      {s.nombre}
                    </h2>
                    {s.precio != null && s.precio !== "" && (
                      <p className="text-blue-700 font-bold text-sm">
                        {formatPrecio(s.precio)}
                        {esPorHora(s.nombre) && (
                          <span className="ml-1 text-xs font-normal text-slate-500">
                            / hr
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 text-sm text-slate-600 space-y-1">
                  <p>{s.descripcion || "Servicio de ambulancia."}</p>
                </div>

                <button
                  onClick={() => navigate("/contacto")}
                  className="mt-4 text-sm text-blue-700 font-semibold hover:underline self-start"
                >
                  Solicitar este servicio →
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-slate-500">
            Aún no hay servicios configurados. Puedes crearlos desde el panel
            administrativo.
          </p>
        )}

        {/* Bloque de precios adicionales */}
        <div className="mt-8 md:mt-10 bg-slate-200 border border-slate-300 rounded-2xl px-5 py-4">
          <h2 className="font-semibold text-slate-900 text-base md:text-lg">
            Precios adicionales
          </h2>
          <ul className="mt-2 text-sm md:text-base text-slate-700 list-disc list-inside space-y-1">
            <li>
              <span className="font-semibold">$10.000</span> por cada hora de
              espera.
            </li>
            <li>
              Servicio de oxígeno:{" "}
              <span className="font-semibold">$15.000</span> adicionales si se
              requiere.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}

export default Servicios;