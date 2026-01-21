// src/pages/Contacto.js
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { FiPhone, FiGlobe, FiMail, FiMapPin } from "react-icons/fi";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/contacto`, form);
      alert("Mensaje enviado correctamente. Te contactaremos pronto.");
      setForm({ nombre: "", email: "", telefono: "", mensaje: "" });
    } catch (error) {
      console.error("Error al enviar mensaje de contacto:", error);
      alert("Hubo un problema al enviar el mensaje. Inténtalo nuevamente.");
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById("contacto-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main
      id="contacto"
      className="bg-gradient-to-r from-blue-900 to-cyan-400 text-white min-h-screen"
    >
      {/* BLOQUE SUPERIOR */}
      <section className="max-w-6xl mx-auto px-4 pt-10 pb-8 md:pt-14 md:pb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center tracking-tight">
          CONTACTANOS
        </h1>

        {/* Botones: teléfono (rojo) + WhatsApp (verde) */}
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          {/* Llamar por teléfono */}
          <a
            href="tel:+56991022938"
            className="inline-flex items-center gap-3 bg-red-600 hover:bg-red-800 text-white font-bold text-xl md:text-2xl px-6 md:px-10 py-3 md:py-4 rounded-[2rem] shadow-2xl transition-colors"
          >
            <FiPhone className="text-2xl md:text-3xl" />
            +569 91022938
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/56991022938?text=Hola%20quiero%20cotizar%20un%20traslado."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold text-xl md:text-2xl px-6 md:px-10 py-3 md:py-4 rounded-[2rem] shadow-2xl transition-colors"
          >
            <FaWhatsapp className="text-2xl md:text-3xl" />
            WhatsApp
          </a>
        </div>

        {/* Redes + mapa + formulario */}
        <div className="mt-10 grid md:grid-cols-2 gap-8 items-start">
          <div className="bg-white/10 rounded-2xl p-4 md:p-5 shadow-lg">
            <h2 className="text-lg font-semibold mb-2">Ubicación</h2>
            <p className="text-sm md:text-base opacity-90">
              AV Recoleta 1259, Recoleta, Región Metropolitana.
            </p>
            <div className="mt-3 rounded-xl overflow-hidden bg-white h-52 md:h-64">
              <iframe
                title="Ubicación Ambulancias Titan"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.253006949634!2d-70.64602392354965!3d-33.41664759578316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5e996d975c1%3A0x76a316582ee90242!2sAv.%20Recoleta%201259%2C%208420167%20Recoleta%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses!2scl!4v1763596283506!5m2!1ses!2scl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Redes sociales */}
          <div className="bg-white/10 rounded-2xl p-5 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Redes Sociales
            </h2>
            <ul className="space-y-3 text-sm md:text-base">
              <li className="flex items-center gap-3">
                <FiMail className="text-xl" />
                <span>ambulanciastitan@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaInstagram className="text-xl" />
                <span>@ambulancias_titan</span>
              </li>
              <li className="flex items-center gap-3">
                <FaFacebookF className="text-xl" />
                <span>Ambulancias Titan</span>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-xl" />
                <span>+569 91022938</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMapPin className="text-xl" />
                <span>AV Recoleta 1259, Recoleta</span>
              </li>
            </ul>

            <div className="mt-6">
              <button
                onClick={scrollToForm}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg"
              >
                Formulario de Contacto
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULARIO */}
      <section
        id="contacto-form"
        className="max-w-6xl mx-auto px-4 pb-12 md:pb-16"
      >
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <aside className="rounded-3xl bg-blue-700 text-white p-8 md:p-10 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold">
              CONTACTANOS
            </h2>
            <p className="mt-2 text-sm md:text-base opacity-90">
              Queremos ayudarte
            </p>
            <div className="w-16 h-1 bg-white/70 mt-3 mb-6 rounded" />

            <ul className="space-y-5 text-sm md:text-base">
              <li className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-white/15 grid place-items-center text-2xl">
                  <FiPhone />
                </span>
                <div>
                  <div className="font-extrabold -mb-1">Teléfono</div>
                  <div>+569 91022938</div>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-white/15 grid place-items-center text-2xl">
                  <FiGlobe />
                </span>
                <div>
                  <div className="font-extrabold -mb-1">Página Web</div>
                  <div>www.ambulanciastitan.cl</div>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-white/15 grid place-items-center text-2xl">
                  <FiMail />
                </span>
                <div>
                  <div className="font-extrabold -mb-1">
                    Correo Electrónico
                  </div>
                  <div>ambulanciastitan@gmail.com</div>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-white/15 grid place-items-center text-2xl">
                  <FiMapPin />
                </span>
                <div>
                  <div className="font-extrabold -mb-1">Dirección</div>
                  <div>AV Recoleta 1259, Recoleta</div>
                </div>
              </li>
            </ul>
          </aside>

          {/* Formulario */}
          <section className="relative rounded-3xl bg-white text-slate-900 p-8 md:p-10 shadow-xl">
            <img
              src="/logo.png"
              alt="logo"
              className="absolute right-3 top-1 w-14 md:w-16 pointer-events-none"
            />

            <form onSubmit={handleSubmit} className="grid gap-3 md:gap-4">
              <label className="text-sm font-medium">
                Nombre Completo :
                <input
                  className="mt-1 w-full border rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.nombre}
                  onChange={(e) => {
                    const soloLetras = e.target.value.replace(
                      /[^a-zA-ZÁÉÍÓÚáéíóúÑñÜü\s]/g,
                      ""
                    );
                    setForm({ ...form, nombre: soloLetras });
                  }}
                  required
                />
              </label>

              <label className="text-sm font-medium">
                Correo Electrónico :
                <input
                  type="email"
                  className="mt-1 w-full border rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                />
              </label>

              <label className="text-sm font-medium">
                Número Telefónico :
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="mt-1 w-full border rounded-xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.telefono}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      telefono: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  required
                />
              </label>

              <label className="text-sm font-medium">
                Mensaje :
                <textarea
                  rows="6"
                  className="mt-1 w-full border rounded-xl px-3 py-2 bg-slate-50 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.mensaje}
                  onChange={(e) =>
                    setForm({ ...form, mensaje: e.target.value })
                  }
                />
              </label>

              <button
                className="mt-3 bg-blue-700 hover:bg-blue-800 text-white font-extrabold rounded-full px-6 py-3 shadow-lg"
                type="submit"
              >
                Enviar
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}
