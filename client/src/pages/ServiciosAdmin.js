import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default function ServiciosAdmin() {
  const [servicios, setServicios] = useState([]);
  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
  });

  const API_URL = `${API_BASE_URL}/api/servicios`;

  // Cargar servicios al iniciar
  useEffect(() => {
    obtenerServicios();
  }, []);

  const obtenerServicios = async () => {
    try {
      const res = await axios.get(API_URL);
      setServicios(res.data);
    } catch (error) {
      console.error("Error al obtener servicios", error);
    }
  };

  const crearServicio = async () => {
    try {
      await axios.post(API_URL, nuevoServicio);
      setNuevoServicio({ nombre: "", descripcion: "", precio: "" });
      obtenerServicios();
    } catch (error) {
      console.error("Error al crear servicio", error);
    }
  };

  const eliminarServicio = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este servicio?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      obtenerServicios();
    } catch (error) {
      console.error("Error al eliminar servicio", error);
    }
  };

  const editarServicio = async (id, campo, valor) => {
    try {
      await axios.put(`${API_URL}/${id}`, { [campo]: valor });
      obtenerServicios();
    } catch (error) {
      console.error("Error al editar servicio", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Gestión de Servicios 🚑</h1>

        {/* Formulario para crear servicio */}
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-3">Agregar nuevo servicio</h2>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="text"
              placeholder="Nombre"
              value={nuevoServicio.nombre}
              onChange={(e) =>
                setNuevoServicio({ ...nuevoServicio, nombre: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Descripción"
              value={nuevoServicio.descripcion}
              onChange={(e) =>
                setNuevoServicio({
                  ...nuevoServicio,
                  descripcion: e.target.value,
                })
              }
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              placeholder="Precio"
              value={nuevoServicio.precio}
              onChange={(e) =>
                setNuevoServicio({ ...nuevoServicio, precio: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
            <button
              onClick={crearServicio}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Agregar
            </button>
          </div>
        </div>

        {/* Tabla de servicios */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">Lista de servicios</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-200">
                <th className="border p-2">Nombre</th>
                <th className="border p-2">Descripción</th>
                <th className="border p-2">Precio</th>
                <th className="border p-2">Disponible</th>
                <th className="border p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((s) => (
                <tr key={s._id}>
                  <td className="border p-2">{s.nombre}</td>
                  <td className="border p-2">{s.descripcion}</td>
                  <td className="border p-2">
                    <input
                      type="number"
                      defaultValue={s.precio}
                      className="w-24 border rounded p-1"
                      onBlur={(e) =>
                        editarServicio(s._id, "precio", e.target.value)
                      }
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={s.disponible}
                      onChange={(e) =>
                        editarServicio(s._id, "disponible", e.target.checked)
                      }
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => eliminarServicio(s._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {servicios.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-4 text-slate-500">
                    No hay servicios registrados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
