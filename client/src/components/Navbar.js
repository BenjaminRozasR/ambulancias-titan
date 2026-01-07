// src/components/Navbar.js
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    ["Home", "/"],
    ["Servicios", "/servicios"],
    ["Quienes somos", "/quienes-somos"],
    ["Contacto", "/contacto"],
  ];

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-700 via-indigo-400 to-sky-200 text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        {/* Logo de la empresa */}
        <NavLink
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3 rounded-full px-2 py-1
                     cursor-pointer transition
                     hover:bg-indigo-900/40 hover:shadow-md"
        >
          <img
            src="/logo.png"
            alt="Titan Ambulancias"
            className="w-10 h-10 object-contain drop-shadow"
          />
          <div className="leading-4 font-extrabold text-white">
            <div className="text-sm opacity-90">TITAN</div>
            <div className="text-xs opacity-90 -mt-1">AMBULANCIAS</div>
          </div>
        </NavLink>

        {/* Botón hamburguesa (solo móvil) */}
        <button
          className="ml-auto md:hidden p-2 rounded-lg bg-slate-900/20 text-white hover:bg-slate-900/30 transition"
          onClick={() => setOpen((o) => !o)}
          aria-label="Abrir menú"
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>

        {/* Menú escritorio */}
        <nav className="ml-auto hidden md:flex items-center gap-6 font-medium">
          {navItems.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                "pb-0.5 transition " +
                (isActive
                  ? "border-b-2 border-slate-800"
                  : "hover:opacity-80")
              }
            >
              {label}
            </NavLink>
          ))}

          <NavLink
            to="/admin"
            className="bg-slate-800 text-white px-4 py-1 rounded-lg hover:bg-slate-700 transition-all"
          >
            Acceso Personal
          </NavLink>
        </nav>
      </div>

      {/* Menú móvil desplegable */}
      {open && (
        <nav className="md:hidden bg-indigo-800 text-white">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-2">
            {navItems.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                onClick={closeMenu}
                className={({ isActive }) =>
                  "py-2 border-b border-white/10 transition " +
                  (isActive ? "font-semibold" : "opacity-90 hover:opacity-100")
                }
              >
                {label}
              </NavLink>
            ))}

            <NavLink
              to="/admin"
              onClick={closeMenu}
              className="mt-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-center hover:bg-slate-700 transition-all"
            >
              Acceso Personal
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
