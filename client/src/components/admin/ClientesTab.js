import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

// Endpoint del backend para el CRUD de clientes
const API_URL = `${API_BASE_URL}/api/clientes`;

const ClientesTab = () => {
  
  const [clientes, setClientes] = useState([]);

  // formulario para crear un nuevo cliente
  const [nuevo, setNuevo] = useState({
    nombre: "",
    telefono: "",
    email: "",
    direccionOrigen: "",
    direccionDestino: "",
    servicio: "",
    valor: "",
    notas: "",
  });

  
  const [editando, setEditando] = useState(null);

  // se cargan los clientes desde el backend
  useEffect(() => {
    fetchClientes();
  }, []);

  // lista de clientes
  const fetchClientes = async () => {
    try {
      const res = await axios.get(API_URL);
      setClientes(res.data);
    } catch (error) {
      console.error("Error al obtener clientes:", error);
    }
  };

  // Crea un nuevo cliente en el backend 
  const handleAgregar = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, nuevo);
      setNuevo({
        nombre: "",
        telefono: "",
        email: "",
        direccionOrigen: "",
        direccionDestino: "",
        servicio: "",
        valor: "",
        notas: "",
      });
      fetchClientes();
    } catch (error) {
      console.error("Error al crear cliente:", error);
    }
  };

  
  const actualizarCampoFila = (id, campo, valor) => {
    setClientes((prev) =>
      prev.map((c) => (c._id === id ? { ...c, [campo]: valor } : c))
    );
  };

  // Guarda los cambios 
  const handleGuardar = async (c) => {
    try {
      await axios.put(`${API_URL}/${c._id}`, c);
      setEditando(null);
      fetchClientes();
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
    }
  };

  
  const handleCancelar = () => {
    setEditando(null);
    fetchClientes();
  };

  // Elimina un cliente por su id 
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este cliente?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchClientes();
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Gestión de Clientes</h2>

      {/* Formulario para registrar un nuevo cliente */}
      <form
        onSubmit={handleAgregar}
        className="mb-6 space-y-3 bg-white p-4 rounded-xl shadow"
      >
        <div className="grid md:grid-cols-2 gap-3">
          <input
            type="text"
            name="nombre"
            value={nuevo.nombre}
            onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
            placeholder="Nombre completo"
            className="border p-2 w-full rounded"
            required
          />
          <input
            type="text"
            name="telefono"
            value={nuevo.telefono}
            onChange={(e) => setNuevo({ ...nuevo, telefono: e.target.value })}
            placeholder="Teléfono"
            className="border p-2 w-full rounded"
          />
          <input
            type="email"
            name="email"
            value={nuevo.email}
            onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })}
            placeholder="Correo electrónico"
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            name="servicio"
            value={nuevo.servicio}
            onChange={(e) => setNuevo({ ...nuevo, servicio: e.target.value })}
            placeholder="Tipo de servicio"
            className="border p-2 w-full rounded"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <input
            type="text"
            name="direccionOrigen"
            value={nuevo.direccionOrigen}
            onChange={(e) =>
              setNuevo({ ...nuevo, direccionOrigen: e.target.value })
            }
            placeholder="Dirección de origen"
            className="border p-2 w-full rounded"
          />
          <input
            type="text"
            name="direccionDestino"
            value={nuevo.direccionDestino}
            onChange={(e) =>
              setNuevo({ ...nuevo, direccionDestino: e.target.value })
            }
            placeholder="Dirección de destino"
            className="border p-2 w-full rounded"
          />
          <input
            type="number"
            name="valor"
            value={nuevo.valor}
            onChange={(e) => setNuevo({ ...nuevo, valor: e.target.value })}
            placeholder="Valor del servicio"
            className="border p-2 w-full rounded"
          />
        </div>

        <textarea
          name="notas"
          value={nuevo.notas}
          onChange={(e) => setNuevo({ ...nuevo, notas: e.target.value })}
          placeholder="Notas adicionales"
          className="border p-2 w-full rounded"
          rows={3}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:shadow-md transition-all"
        >
          Agregar cliente
        </button>
      </form>

      {/* Tabla de clientes con edición en línea */}
      <table className="w-full border-collapse border border-gray-300 bg-white rounded-xl shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Teléfono</th>
            <th className="border p-2">Servicio</th>
            <th className="border p-2">Origen</th>
            <th className="border p-2">Destino</th>
            <th className="border p-2">Valor</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c._id}>
              <td className="border p-2">
                {editando === c._id ? (
                  <input
                    value={c.nombre}
                    onChange={(e) =>
                      actualizarCampoFila(c._id, "nombre", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  c.nombre
                )}
              </td>
              <td className="border p-2">
                {editando === c._id ? (
                  <input
                    value={c.telefono || ""}
                    onChange={(e) =>
                      actualizarCampoFila(c._id, "telefono", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  c.telefono
                )}
              </td>
              <td className="border p-2">
                {editando === c._id ? (
                  <input
                    value={c.servicio || ""}
                    onChange={(e) =>
                      actualizarCampoFila(c._id, "servicio", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  c.servicio
                )}
              </td>
              <td className="border p-2">
                {editando === c._id ? (
                  <input
                    value={c.direccionOrigen || ""}
                    onChange={(e) =>
                      actualizarCampoFila(
                        c._id,
                        "direccionOrigen",
                        e.target.value
                      )
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  c.direccionOrigen
                )}
              </td>
              <td className="border p-2">
                {editando === c._id ? (
                  <input
                    value={c.direccionDestino || ""}
                    onChange={(e) =>
                      actualizarCampoFila(
                        c._id,
                        "direccionDestino",
                        e.target.value
                      )
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  c.direccionDestino
                )}
              </td>
              <td className="border p-2">
                {editando === c._id ? (
                  <input
                    type="number"
                    value={c.valor || ""}
                    onChange={(e) =>
                      actualizarCampoFila(c._id, "valor", e.target.value)
                    }
                    className="border rounded p-1 w-full"
                  />
                ) : (
                  c.valor
                )}
              </td>
              <td className="border p-2">
                <div className="flex justify-center gap-2">
                  {editando === c._id ? (
                    <>
                      <button
                        onClick={() => handleGuardar(c)}
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
                        onClick={() => setEditando(c._id)}
                        className="flex items-center gap-1 bg-amber-500 text-white text-xs md:text-sm px-3 py-1 rounded-full shadow-sm hover:bg-amber-600 hover:scale-105 transition-transform"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDelete(c._id)}
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

export default ClientesTab;
