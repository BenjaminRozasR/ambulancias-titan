import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

// Endpoint del backend para el CRUD de personal
const API_URL = `${API_BASE_URL}/api/personal`;

const PersonalTab = () => {
  // Lista de personas
  const [personal, setPersonal] = useState([]);

  
  const [nuevo, setNuevo] = useState({
    nombreCompleto: "",
    rut: "",
    funcion: "",
  });

  
  const [editando, setEditando] = useState(null);

  // se cargan el personal desde el backend
  useEffect(() => {
    fetchPersonal();
  }, []);

  // lista de personal
  const fetchPersonal = async () => {
    try {
      const res = await axios.get(API_URL);
      setPersonal(res.data);
    } catch (error) {
      console.error("Error al obtener el personal", error);
    }
  };

  // crea un nuevo miembro del personal en el backend
  const handleAgregar = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, nuevo);
      setNuevo({ nombreCompleto: "", rut: "", funcion: "" });
      fetchPersonal();
    } catch (error) {
      console.error("Error al crear personal", error);
    }
  };

  
  const actualizarCampoFila = (id, campo, valor) => {
    setPersonal((prev) =>
      prev.map((p) => (p._id === id ? { ...p, [campo]: valor } : p))
    );
  };

  
  const handleGuardar = async (persona) => {
    try {
      await axios.put(`${API_URL}/${persona._id}`, persona);
      setEditando(null);
      fetchPersonal();
    } catch (error) {
      console.error("Error al actualizar personal", error);
    }
  };

  
  const handleCancelar = () => {
    setEditando(null);
    fetchPersonal();
  };

  
  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "¿Seguro que deseas eliminar este miembro del personal?"
      )
    )
      return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPersonal();
    } catch (error) {
      console.error("Error al eliminar personal", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestión de Personal</h2>

      {/* Formulario para registrar nuevo personal */}
      <form
        onSubmit={handleAgregar}
        className="mb-6 space-y-3 bg-white p-4 rounded-xl shadow"
      >
        <input
          type="text"
          name="nombreCompleto"
          value={nuevo.nombreCompleto}
          onChange={(e) =>
            setNuevo({ ...nuevo, nombreCompleto: e.target.value })
          }
          placeholder="Nombre completo"
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="rut"
          value={nuevo.rut}
          onChange={(e) => setNuevo({ ...nuevo, rut: e.target.value })}
          placeholder="RUT (Ej: 12.345.678-9)"
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="funcion"
          value={nuevo.funcion}
          onChange={(e) => setNuevo({ ...nuevo, funcion: e.target.value })}
          placeholder="Función (Ej: Paramédico, Conductor, Enfermero)"
          className="border p-2 w-full rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:shadow-md transition-all"
        >
          Agregar personal
        </button>
      </form>

      {/* Tabla de personal con edición en línea */}
      <table className="w-full border-collapse border border-gray-300 bg-white rounded-xl shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nombre Completo</th>
            <th className="border p-2">RUT</th>
            <th className="border p-2">Función</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {personal.map((p) => (
            <tr key={p._id}>
              <td className="border p-2">
                {editando === p._id ? (
                  <input
                    value={p.nombreCompleto}
                    onChange={(e) =>
                      actualizarCampoFila(
                        p._id,
                        "nombreCompleto",
                        e.target.value
                      )
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  p.nombreCompleto
                )}
              </td>
              <td className="border p-2">
                {editando === p._id ? (
                  <input
                    value={p.rut}
                    onChange={(e) =>
                      actualizarCampoFila(p._id, "rut", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  p.rut
                )}
              </td>
              <td className="border p-2">
                {editando === p._id ? (
                  <input
                    value={p.funcion}
                    onChange={(e) =>
                      actualizarCampoFila(p._id, "funcion", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  p.funcion
                )}
              </td>
              <td className="border p-2">
                <div className="flex justify-center gap-2">
                  {editando === p._id ? (
                    <>
                      <button
                        onClick={() => handleGuardar(p)}
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
                        onClick={() => setEditando(p._id)}
                        className="flex items-center gap-1 bg-amber-500 text-white text-xs md:text-sm px-3 py-1 rounded-full shadow-sm hover:bg-amber-600 hover:scale-105 transition-transform"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
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

export default PersonalTab;
