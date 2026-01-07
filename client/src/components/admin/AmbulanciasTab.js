import React, { useState, useEffect } from "react";
import axios from "axios";

// Endpoint del backend para el CRUD de ambulancias
const API_URL = "http://localhost:5000/api/ambulancias";

const AmbulanciasTab = () => {
  // lista de ambulancias 
  const [ambulancias, setAmbulancias] = useState([]);

  // estado del formulario para crear una nueva ambulancia 
  const [nuevo, setNuevo] = useState({
    patente: "",
    tipo: "",
    disponible: true,
    conductor: "",
    zona: "",
  });

  
  const [editando, setEditando] = useState(null);

  // cargar ambulancias desde el backend
  useEffect(() => {
    fetchAmbulancias();
  }, []);

  // obtiene todas las ambulancias
  const fetchAmbulancias = async () => {
    try {
      const res = await axios.get(API_URL);
      setAmbulancias(res.data);
    } catch (error) {
      console.error("Error al obtener ambulancias", error);
    }
  };

  // crea una nueva ambulancia 
  const handleAgregar = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, nuevo);
      setNuevo({
        patente: "",
        tipo: "",
        disponible: true,
        conductor: "",
        zona: "",
      });
      fetchAmbulancias();
    } catch (error) {
      console.error("Error al guardar ambulancia", error);
    }
  };

  // actualizo algo de la ambulancia
  const actualizarCampoFila = (id, campo, valor) => {
    setAmbulancias((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, [campo]: valor } : item
      )
    );
  };

  // guardo los cambios de arriba
  const handleGuardar = async (amb) => {
    try {
      await axios.put(`${API_URL}/${amb._id}`, amb);
      setEditando(null);
      fetchAmbulancias();
    } catch (error) {
      console.error("Error al actualizar ambulancia", error);
    }
  };

  
  const handleCancelar = () => {
    setEditando(null);
    fetchAmbulancias();
  };

  
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta ambulancia?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchAmbulancias();
    } catch (error) {
      console.error("Error al eliminar ambulancia", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestión de Ambulancias</h2>

      {/* Formulario para registrar una nueva ambulancia */}
      <form
        onSubmit={handleAgregar}
        className="mb-6 space-y-3 bg-white p-4 rounded-xl shadow"
      >
        <div className="grid md:grid-cols-2 gap-3">
          <input
            type="text"
            name="patente"
            value={nuevo.patente}
            onChange={(e) => setNuevo({ ...nuevo, patente: e.target.value })}
            placeholder="Patente"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="text"
            name="tipo"
            value={nuevo.tipo}
            onChange={(e) => setNuevo({ ...nuevo, tipo: e.target.value })}
            placeholder="Tipo (Ej: Avanzada, Básica)"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="text"
            name="conductor"
            value={nuevo.conductor}
            onChange={(e) => setNuevo({ ...nuevo, conductor: e.target.value })}
            placeholder="Nombre del conductor"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="text"
            name="zona"
            value={nuevo.zona}
            onChange={(e) => setNuevo({ ...nuevo, zona: e.target.value })}
            placeholder="Zona (Ej: Santiago Centro)"
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={nuevo.disponible}
            onChange={(e) =>
              setNuevo({ ...nuevo, disponible: e.target.checked })
            }
          />
          Disponible
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:shadow-md transition-all"
        >
          Agregar ambulancia
        </button>
      </form>

      {/* Tabla de ambulancias con edición en línea */}
      <table className="w-full border-collapse border border-gray-300 bg-white rounded-xl shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Patente</th>
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Conductor</th>
            <th className="border p-2">Zona</th>
            <th className="border p-2">Disponible</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ambulancias.map((a) => (
            <tr key={a._id}>
              <td className="border p-2">
                {editando === a._id ? (
                  <input
                    value={a.patente}
                    onChange={(e) =>
                      actualizarCampoFila(a._id, "patente", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  a.patente
                )}
              </td>
              <td className="border p-2">
                {editando === a._id ? (
                  <input
                    value={a.tipo}
                    onChange={(e) =>
                      actualizarCampoFila(a._id, "tipo", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  a.tipo
                )}
              </td>
              <td className="border p-2">
                {editando === a._id ? (
                  <input
                    value={a.conductor}
                    onChange={(e) =>
                      actualizarCampoFila(a._id, "conductor", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  a.conductor
                )}
              </td>
              <td className="border p-2">
                {editando === a._id ? (
                  <input
                    value={a.zona}
                    onChange={(e) =>
                      actualizarCampoFila(a._id, "zona", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  a.zona
                )}
              </td>
              <td className="border p-2 text-center">
                {editando === a._id ? (
                  <input
                    type="checkbox"
                    checked={a.disponible}
                    onChange={(e) =>
                      actualizarCampoFila(
                        a._id,
                        "disponible",
                        e.target.checked
                      )
                    }
                  />
                ) : a.disponible ? (
                  "Sí"
                ) : (
                  "No"
                )}
              </td>
              <td className="border p-2">
                <div className="flex justify-center gap-2">
                  {editando === a._id ? (
                    <>
                      <button
                        onClick={() => handleGuardar(a)}
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
                        onClick={() => setEditando(a._id)}
                        className="flex items-center gap-1 bg-amber-500 text-white text-xs md:text-sm px-3 py-1 rounded-full shadow-sm hover:bg-amber-600 hover:scale-105 transition-transform"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDelete(a._id)}
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
        </tbody>
      </table>
    </div>
  );
};

export default AmbulanciasTab;
