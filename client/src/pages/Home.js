// src/pages/Home.js
import { FaAmbulance, FaMoneyBillWave } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    {
      icon: FaAmbulance,
      label: "Servicio de Emergencia",
      text: "Traslados oportunos y seguros, las 24 horas.",
      to: "/servicios",
    },
    {
      icon: FaMoneyBillWave,
      label: "Precios accesibles",
      text: "Planes pensados para familias e instituciones.",
      to: "/servicios",
    },
    {
      icon: FiPhoneCall,
      label: "Contacto",
      text: "Comunicación rápida.",
      to: "/contacto#contacto",
      showPhone: true,
    },
  ];

  return (
    // fondo
    <main className="bg-gradient-to-r from-blue-900 to-cyan-400 min-h-screen">
      {/* hero principal */}
      <section className="text-white">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          {/* eslogan principal */}
          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              TU SALUD
            </h1>
            <h2 className="text-4xl md:text-6xl font-extrabold opacity-90 -mt-2">
              ES NUESTRA PRIORIDAD
            </h2>
            <p className="mt-6 text-lg md:text-xl opacity-95 max-w-md">
              Estamos listos para ayudarte. Traslados médicos seguros,
              oportunos y confiables en toda la Región Metropolitana.
            </p>
          </div>

          {/* imagen de la ambulancia */}
          <div className="flex md:justify-end">
            <div className="w-72 h-72 md:w-[420px] md:h-[420px] rounded-full overflow-hidden shadow-2xl ring-4 ring-white/60">
              <img
                src="/hero-ambulancia.jpg"
                alt="Ambulancia"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* tarjetas bajas */}
        <div className="max-w-5xl mx-auto -mb-10 md:-mb-14 px-4">
          <div className="bg-white rounded-xl shadow-xl grid md:grid-cols-3 gap-6 p-5 text-slate-900">
            {features.map(({ icon: Icon, label, text, to, showPhone }) => (
              <Link
                key={label}
                to={to}
                className="group flex items-start gap-4 p-3 rounded-2xl cursor-pointer
                           transform transition
                           hover:-translate-y-1 hover:bg-slate-200 hover:shadow-2xl"
              >
                <div
                  className="w-14 h-14 rounded-full bg-slate-900 text-white grid place-items-center
                             text-2xl flex-shrink-0 transition-colors
                             group-hover:bg-black"
                >
                  <Icon />
                </div>
                <div>
                  <div className="font-bold text-sm md:text-base">
                    {label}
                  </div>
                  <p className="text-xs md:text-sm text-slate-600 mt-1">
                    {text}
                  </p>
                  {showPhone && (
                    <p className="text-xs md:text-sm font-semibold text-red-600 mt-1">
                      +569 91022938
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      
      <div className="h-16" />
    </main>
  );
}
