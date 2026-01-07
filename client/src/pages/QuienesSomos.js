// src/pages/QuienesSomos.js
import React from "react";

export default function QuienesSomos() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-gradient-to-r from-blue-900 to-cyan-400 text-white min-h-screen">
      {/* hero superior */}
      <section>
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-10">
          {/* texto */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              ¿QUIÉNES SOMOS?
            </h1>
            <p className="mt-6 text-lg md:text-xl leading-relaxed opacity-95">
              Somos una nueva empresa de ambulancias de baja complejidad con un
              equipo altamente capacitado para garantizar atención profesional y
              oportuna en cada traslado.
            </p>

            <div className="mt-6 flex items-center gap-4">
              {/* misión */}
              <button
                onClick={() => scrollTo("mision")}
                className="px-6 py-2 rounded-full bg-slate-200 text-slate-900
                           text-sm md:text-base font-semibold shadow-lg
                           transition transform
                           hover:bg-slate-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                Misión
              </button>

              {/* visión */}
              <button
                onClick={() => scrollTo("vision")}
                className="px-6 py-2 rounded-full bg-slate-200 text-slate-900
                           text-sm md:text-base font-semibold shadow-lg
                           transition transform
                           hover:bg-slate-300 hover:shadow-xl hover:-translate-y-0.5"
              >
                Visión
              </button>
            </div>
          </div>

          {/* Galería */}
          <div className="grid grid-cols-2 grid-rows-2 gap-3">
            <img
              src="/qs-1.jpg"
              alt="Ambulancia Titan"
              className="col-span-2 h-48 md:h-56 w-full object-cover rounded-lg shadow-lg"
            />
            <img
              src="/qs-2.jpg"
              alt="Equipo de trabajo"
              className="h-36 md:h-40 w-full object-cover rounded-lg shadow-lg"
            />
            <img
              src="/qs-3.jpg"
              alt="Servicio de traslado"
              className="h-36 md:h-40 w-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      
      <div className="max-w-6xl mx-auto px-4 pb-6">
        <div className="h-[2px] w-full bg-white/70 rounded-full" />
      </div>

      {/* sección misión */}
      <section id="mision" className="pt-4 pb-10 md:pt-6 md:pb-14">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white text-slate-800 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
              Misión
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              Entregar un servicio de traslado médico de baja complejidad
              seguro, cercano y accesible, poniendo siempre en el centro la
              dignidad y tranquilidad de nuestros pacientes y sus familias.
              Trabajamos con equipos capacitados, vehículos equipados y una
              coordinación clara para acompañarte desde tu hogar hasta el centro
              de salud y de regreso.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src="/mision.jpg"
              alt="Misión Ambulancias Titan"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            />
          </div>
        </div>
      </section>

      {/* sección visión */}
      <section id="vision" className="pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="order-1 md:order-1 flex justify-center">
            <img
              src="/vision.jpg"
              alt="Visión Ambulancias Titan"
              className="rounded-2xl shadow-lg w-full max-w-md object-cover"
            />
          </div>

          <div className="order-2 md:order-2 bg-white text-slate-800 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
              Visión
            </h2>
            <p className="text-sm md:text-base leading-relaxed">
              Ser la empresa de ambulancias de baja complejidad de referencia en
              la Región Metropolitana, reconocida por nuestra calidad humana,
              profesionalismo y tiempos de respuesta. Queremos construir
              relaciones de confianza a largo plazo con pacientes, familias e
              instituciones de salud, innovando continuamente para ofrecer un
              servicio cada vez más seguro, eficiente y humano.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
