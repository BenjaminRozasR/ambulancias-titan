// src/components/admin/ServiciosTab.jsx
import { useState, useEffect } from "react";

// Endpoint del backend para el CRUD de servicios
const API_URL = "http://localhost:5000/api/servicios";

export default function ServiciosTab() {
  // Lista de servicios ob
  const [servicios, setServicios] = useState([]);

  // Estado del formulario 
  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
  });

  
  const [editando, setEditando] = useState(null);

  // lista de servicios
  const fetchServicios = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setServicios(data);
    } catch (error) {
      console.error("Error al cargar servicios:", error);
    }
  };

  // se cargan los servicios 
  useEffect(() => {
    fetchServicios();
  }, []);

  
  const handleAgregar = async () => {
    if (!nuevoServicio.nombre || !nuevoServicio.precio) {
      return alert("Completa al menos nombre y precio");
    }

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoServicio),
      });
      setNuevoServicio({ nombre: "", descripcion: "", precio: "" });
      fetchServicios();
    } catch (error) {
      console.error("Error al agregar servicio:", error);
    }
  };

 
  const handleGuardar = async (servicio) => {
    try {
      await fetch(`${API_URL}/${servicio._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(servicio),
      });
      setEditando(null);
      fetchServicios();
    } catch (error) {
      console.error("Error al editar servicio:", error);
    }
  };

  
  const handleCancelar = () => {
    setEditando(null);
    fetchServicios();
  };

  // Elimina un servicio 
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este servicio?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchServicios();
    } catch (error) {
      console.error("Error al eliminar servicio:", error);
    }
  };

  // Actualiza el campo
  const actualizarCampoFila = (id, campo, valor) => {
    setServicios((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, [campo]: valor } : item
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Gestión de Servicios</h2>

      {/* Formulario para registrar un nuevo servicio */}
      <div className="mb-6 bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Nombre del servicio"
          className="border p-2 rounded flex-1"
          value={nuevoServicio.nombre}
          onChange={(e) =>
            setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Descripción (opcional)"
          className="border p-2 rounded flex-1"
          value={nuevoServicio.descripcion}
          onChange={(e) =>
            setNuevoServicio({
              ...nuevoServicio,
              descripcion: e.target.value,
            })
          }
        />
        <input
          type="number"
          placeholder="Precio"
          className="border p-2 rounded w-full md:w-40"
          value={nuevoServicio.precio}
          onChange={(e) =>
            setNuevoServicio({ ...nuevoServicio, precio: e.target.value })
          }
        />
        <button
          onClick={handleAgregar}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 hover:shadow-md transition-all"
        >
          Agregar
        </button>
      </div>

      {/* Tabla de servicios con edición en línea */}
      <table className="w-full border-collapse bg-white rounded-xl shadow overflow-hidden">
        <thead>
          <tr className="bg-slate-200">
            <th className="border p-2 w-1/4">Nombre</th>
            <th className="border p-2 w-2/4">Descripción</th>
            <th className="border p-2 w-1/6">Precio</th>
            <th className="border p-2 w-1/6">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {servicios.map((s) => (
            <tr key={s._id}>
              {/* Nombre */}
              <td className="border p-2 align-top">
                {editando === s._id ? (
                  <input
                    type="text"
                    value={s.nombre}
                    onChange={(e) =>
                      actualizarCampoFila(s._id, "nombre", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  s.nombre
                )}
              </td>

              {/* Descripción */}
              <td className="border p-2 align-top">
                {editando === s._id ? (
                  <textarea
                    rows={2}
                    value={s.descripcion || ""}
                    onChange={(e) =>
                      actualizarCampoFila(
                        s._id,
                        "descripcion",
                        e.target.value
                      )
                    }
                    className="border rounded p-1 w-full resize-y"
                  />
                ) : (
                  s.descripcion
                )}
              </td>

              {/* Precio */}
              <td className="border p-2 align-top text-center">
                {editando === s._id ? (
                  <input
                    type="number"
                    value={s.precio}
                    onChange={(e) =>
                      actualizarCampoFila(s._id, "precio", e.target.value)
                    }
                    className="border rounded p-1 w-24 text-right"
                  />
                ) : (
                  (s.precio != null &&
                    `$${Number(s.precio).toLocaleString("es-CL")}`) ||
                  "-"
                )}
              </td>

              {/* Acciones */}
              <td className="border p-2 align-top">
                <div className="flex justify-center gap-2">
                  {editando === s._id ? (
                    <>
                      <button
                        onClick={() => handleGuardar(s)}
                        className="flex items-center gap-1 bg-blue-600 text-white text-xs md:text-sm px-3 py-1 rounded-full shadow-sm hover:bg-blue-700 hover:scale-105 transition-transform"
                      >
                        💾 Guardar
                      </button>
                      <button
                        onClick={handleCancelar}
                        className="flex items-center gap-1 bg-gray-400 text-white text-xs md:text-sm px-3 py-1 rounded-full shadow-sm hover:bg-gray-500 hover:scale-105 transition-transform"
                      >
                        ✖️ Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditando(s._id)}
                        className="flex items-center gap-1 bg-amber-500 text-white text-xs md:text-sm px-3 py-1 rounded-full shadow-sm hover:bg-amber-600 hover:scale-105 transition-transform"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(s._id)}
                        className="flex items-center gap-1 bg-rose-600 text-white text-xs md:text-sm px-3 py-1 rounded-full shadow-sm hover:bg-rose-700 hover:scale-105 transition-transform"
                      >
                        🗑️ Eliminar
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}

          {servicios.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4 text-slate-500">
                No hay servicios registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

